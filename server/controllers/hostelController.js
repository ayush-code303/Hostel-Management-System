const Hostel = require('../models/Hostel');
const Room = require('../models/Room');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * @desc    Get all hostel blocks with occupancy statistics
 * @route   GET /api/hostels
 * @access  Public / Private
 */
const getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find().populate('warden', 'name email');

    // Aggregate room occupancy per hostel
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

/**
 * @desc    Create new hostel block
 * @route   POST /api/hostels
 * @access  Private (Admin only)
 */
const createHostel = async (req, res) => {
  try {
    const { name, code, totalFloors, totalRooms, capacity, gender, warden } = req.body;

    const hostel = await Hostel.create({
      name,
      code: code ? code.toUpperCase() : undefined,
      totalFloors: totalFloors || 4,
      totalRooms: totalRooms || 50,
      capacity: capacity || 150,
      gender: gender || 'co-ed',
      warden: warden || undefined
    });

    return sendSuccess(res, 'Hostel block created successfully', hostel, 201);
  } catch (error) {
    return sendError(res, error.message || 'Error creating hostel block', 500, error);
  }
};

/**
 * @desc    Update hostel block
 * @route   PUT /api/hostels/:id
 * @access  Private (Admin only)
 */
const updateHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!hostel) {
      return sendError(res, 'Hostel block not found', 404);
    }

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
