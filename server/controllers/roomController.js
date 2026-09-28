const mongoose = require('mongoose');
const Room = require('../models/Room');
const Allocation = require('../models/Allocation');
const Student = require('../models/Student');
const { sendSuccess, sendError } = require('../utils/response');
const { mockRooms, mockStudents } = require('../utils/mockData');

const getAllRooms = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      let rooms = [...mockRooms];
      const { hostel, status, search } = req.query;

      if (hostel && hostel !== 'All') {
        rooms = rooms.filter(r => r.hostel.name.includes(hostel) || r.hostel._id === hostel);
      }
      if (status && status !== 'All') {
        rooms = rooms.filter(r => r.status === status);
      }
      if (search) {
        rooms = rooms.filter(r => r.roomNumber.toLowerCase().includes(search.toLowerCase()));
      }

      return sendSuccess(res, 'Rooms retrieved successfully (Mock Mode)', rooms);
    }

    const { hostel, floor, status, search } = req.query;
    let query = {};
    if (hostel && hostel !== 'All') query.hostel = hostel;
    if (floor && floor !== 'All') query.floor = Number(floor);
    if (status && status !== 'All') query.status = status;

    let rooms = await Room.find(query).populate('hostel', 'name code gender');
    if (search) {
      rooms = rooms.filter(r => r.roomNumber.toLowerCase().includes(search.toLowerCase()));
    }

    return sendSuccess(res, 'Rooms retrieved successfully', rooms);
  } catch (error) {
    return sendError(res, error.message || 'Error fetching rooms', 500, error);
  }
};

const createRoom = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const newRoom = { _id: `rm-${Date.now()}`, ...req.body, occupied: 0, status: 'available' };
      mockRooms.push(newRoom);
      return sendSuccess(res, 'Room created (Mock Mode)', newRoom, 201);
    }

    const room = await Room.create(req.body);
    return sendSuccess(res, 'Room created successfully', room, 201);
  } catch (error) {
    return sendError(res, error.message || 'Error creating room', 500, error);
  }
};

const allocateRoom = async (req, res) => {
  try {
    const { studentId, roomId, remarks } = req.body;

    if (mongoose.connection.readyState !== 1) {
      const student = mockStudents.find(s => s._id === studentId) || mockStudents[0];
      const room = mockRooms.find(r => r._id === roomId) || mockRooms[0];

      if (room.occupied >= room.capacity) {
        return sendError(res, 'Cannot allocate: Room has reached maximum capacity', 400);
      }

      room.occupied += 1;
      if (room.occupied >= room.capacity) room.status = 'occupied';
      student.room = room.roomNumber;

      return sendSuccess(res, 'Room allocated successfully (Mock Mode)', {
        studentName: student.user.name,
        roomNumber: room.roomNumber,
        occupied: room.occupied,
        capacity: room.capacity
      });
    }

    const student = await Student.findById(studentId);
    if (!student) return sendError(res, 'Student record not found', 404);
    if (student.roomAllocation) return sendError(res, 'Student already has an active room allocation', 400);

    const room = await Room.findById(roomId);
    if (!room) return sendError(res, 'Room not found', 404);
    if (room.occupied >= room.capacity) return sendError(res, 'Room at maximum capacity', 400);

    const allocation = await Allocation.create({
      student: student._id,
      hostel: room.hostel,
      room: room._id,
      startDate: new Date(),
      status: 'active',
      remarks: remarks || 'Allocated'
    });

    room.occupied += 1;
    room.status = room.occupied >= room.capacity ? 'occupied' : 'available';
    await room.save();

    student.roomAllocation = allocation._id;
    await student.save();

    return sendSuccess(res, 'Room allocated successfully', { allocation });
  } catch (error) {
    return sendError(res, error.message || 'Error allocating room', 500, error);
  }
};

const deallocateRoom = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return sendSuccess(res, 'Student deallocated from room successfully (Mock Mode)');
    }

    const student = await Student.findById(req.body.studentId);
    if (!student || !student.roomAllocation) {
      return sendError(res, 'No active allocation found for this student', 400);
    }

    const allocation = await Allocation.findById(student.roomAllocation);
    if (allocation) {
      allocation.status = 'terminated';
      await allocation.save();

      const room = await Room.findById(allocation.room);
      if (room && room.occupied > 0) {
        room.occupied -= 1;
        room.status = 'available';
        await room.save();
      }
    }

    student.roomAllocation = null;
    await student.save();

    return sendSuccess(res, 'Student deallocated successfully');
  } catch (error) {
    return sendError(res, error.message || 'Error deallocating room', 500, error);
  }
};

module.exports = {
  getAllRooms,
  createRoom,
  allocateRoom,
  deallocateRoom
};
