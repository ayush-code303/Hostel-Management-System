const Room = require('../models/Room');
const Allocation = require('../models/Allocation');
const Student = require('../models/Student');
const Hostel = require('../models/Hostel');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * @desc    Get all rooms with filter by hostel and status
 * @route   GET /api/rooms
 * @access  Public / Private
 */
const getAllRooms = async (req, res) => {
  try {
    const { hostel, floor, status, search } = req.query;
    let query = {};

    if (hostel && hostel !== 'All') {
      query.hostel = hostel;
    }
    if (floor && floor !== 'All') {
      query.floor = Number(floor);
    }
    if (status && status !== 'All') {
      query.status = status;
    }

    let rooms = await Room.find(query).populate('hostel', 'name code gender');

    if (search) {
      rooms = rooms.filter(r => r.roomNumber.toLowerCase().includes(search.toLowerCase()));
    }

    return sendSuccess(res, 'Rooms retrieved successfully', rooms);
  } catch (error) {
    return sendError(res, error.message || 'Error fetching rooms', 500, error);
  }
};

/**
 * @desc    Create a new room in a hostel block
 * @route   POST /api/rooms
 * @access  Private (Admin & Warden)
 */
const createRoom = async (req, res) => {
  try {
    const { hostel, roomNumber, floor, capacity, feeAmount, amenities } = req.body;

    const existingRoom = await Room.findOne({ hostel, roomNumber });
    if (existingRoom) {
      return sendError(res, `Room ${roomNumber} already exists in this hostel block`, 400);
    }

    const room = await Room.create({
      hostel,
      roomNumber,
      floor: floor || 1,
      capacity: capacity || 2,
      feeAmount: feeAmount || 45000,
      amenities: amenities || ['Bed', 'Study Table', 'Cupboard', 'Wi-Fi']
    });

    return sendSuccess(res, 'Room created successfully', room, 201);
  } catch (error) {
    return sendError(res, error.message || 'Error creating room', 500, error);
  }
};

/**
 * @desc    Allocate a room bed to a student
 * @route   POST /api/rooms/allocate
 * @access  Private (Admin & Warden)
 */
const allocateRoom = async (req, res) => {
  try {
    const { studentId, roomId, remarks } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return sendError(res, 'Student record not found', 404);
    }

    // Check if student already has an active allocation
    if (student.roomAllocation) {
      return sendError(res, 'Student already has an active room allocation. Please deallocate first.', 400);
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return sendError(res, 'Room not found', 404);
    }

    // Capacity verification
    if (room.occupied >= room.capacity) {
      return sendError(res, 'Cannot allocate: Room has reached maximum capacity', 400);
    }

    // Create allocation record
    const allocation = await Allocation.create({
      student: student._id,
      hostel: room.hostel,
      room: room._id,
      startDate: new Date(),
      status: 'active',
      remarks: remarks || 'Allocated via Hostel Management Portal'
    });

    // Update room occupancy
    room.occupied += 1;
    if (room.occupied >= room.capacity) {
      room.status = 'occupied';
    } else {
      room.status = 'available';
    }
    await room.save();

    // Link allocation to student
    student.roomAllocation = allocation._id;
    await student.save();

    return sendSuccess(res, 'Room allocated successfully', {
      allocation,
      roomNumber: room.roomNumber,
      occupied: room.occupied,
      capacity: room.capacity
    });
  } catch (error) {
    return sendError(res, error.message || 'Error allocating room', 500, error);
  }
};

/**
 * @desc    Deallocate student from room
 * @route   POST /api/rooms/deallocate
 * @access  Private (Admin & Warden)
 */
const deallocateRoom = async (req, res) => {
  try {
    const { studentId, remarks } = req.body;

    const student = await Student.findById(studentId);
    if (!student || !student.roomAllocation) {
      return sendError(res, 'No active allocation found for this student', 400);
    }

    const allocation = await Allocation.findById(student.roomAllocation);
    if (allocation) {
      allocation.status = 'terminated';
      allocation.endDate = new Date();
      allocation.remarks = remarks || 'Deallocated by Warden';
      await allocation.save();

      // Decrement room occupied count
      const room = await Room.findById(allocation.room);
      if (room && room.occupied > 0) {
        room.occupied -= 1;
        room.status = 'available';
        await room.save();
      }
    }

    student.roomAllocation = null;
    await student.save();

    return sendSuccess(res, 'Student deallocated from room successfully');
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
