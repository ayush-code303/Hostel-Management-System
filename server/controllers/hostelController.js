const mongoose = require('mongoose');
const Hostel = require('../models/Hostel');
const Room = require('../models/Room');
const { sendSuccess, sendError } = require('../utils/response');
const { mockHostels } = require('../utils/mockData');

/**
 * @desc    Get all hostel blocks with occupancy statistics
 * @route   GET /api/hostels
 * @access  Public / Private
 */
const getAllHostels = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return sendSuccess(res, 'Hostels retrieved successfully (Mock Mode)', mockHostels);
    }

    const hostels = await Hostel.find().populate('warden', 'name email');

    const hostelData = await Promise.all(
      hostels.map(async (hostel) => {
        const rooms = await Room.find({ hostel: hostel._id });
        const totalCapacity = rooms.reduce((acc, r) => acc + r.capacity, 0);
        const totalOccupied = rooms.reduce((acc, r) => acc + r.occupied, 0);
        const occupancyRate = totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0;

        return {
          ...hostel.toObject(),
          totalRooms: rooms.length,
          totalCapacity,
          totalOccupied,
          occupancyRate
        };
      })
    );

    return sendSuccess(res, 'Hostels retrieved successfully', hostelData);
  } catch (error) {
    return sendError(res, error.message || 'Error fetching hostels', 500, error);
  }
};

/**
 * @desc    Get single hostel with room details
 * @route   GET /api/hostels/:id
 * @access  Public / Private
 */
const getHostelById = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const found = mockHostels.find(h => h._id === req.params.id) || mockHostels[0];
      return sendSuccess(res, 'Hostel details retrieved (Mock Mode)', found);
    }

    const hostel = await Hostel.findById(req.params.id).populate('warden', 'name email');
    if (!hostel) {
      return sendError(res, 'Hostel block not found', 404);
    }

    const rooms = await Room.find({ hostel: hostel._id });

    return sendSuccess(res, 'Hostel details retrieved', {
      ...hostel.toObject(),
      rooms
    });
  } catch (error) {
    return sendError(res, error.message || 'Error fetching hostel details', 500, error);
  }
};

const createHostel = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const newHostel = { _id: `hst-${Date.now()}`, ...req.body };
      mockHostels.push(newHostel);
      return sendSuccess(res, 'Hostel block created (Mock Mode)', newHostel, 201);
    }

    const hostel = await Hostel.create(req.body);
    return sendSuccess(res, 'Hostel block created successfully', hostel, 201);
  } catch (error) {
    return sendError(res, error.message || 'Error creating hostel block', 500, error);
  }
};

const updateHostel = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const found = mockHostels.find(h => h._id === req.params.id) || mockHostels[0];
      Object.assign(found, req.body);
      return sendSuccess(res, 'Hostel block updated (Mock Mode)', found);
    }

    const hostel = await Hostel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return sendSuccess(res, 'Hostel block updated successfully', hostel);
  } catch (error) {
    return sendError(res, error.message || 'Error updating hostel block', 500, error);
  }
};

module.exports = {
  getAllHostels,
  getHostelById,
  createHostel,
  updateHostel
};
