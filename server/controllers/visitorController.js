const mongoose = require('mongoose');
const Visitor = require('../models/Visitor');
const Student = require('../models/Student');
const { sendSuccess, sendError } = require('../utils/response');
const { mockVisitors } = require('../utils/mockData');

const logVisitorEntry = async (req, res) => {
  try {
    const { studentRoll, visitorName, relation, phone } = req.body;

    if (mongoose.connection.readyState !== 1) {
      const newVis = {
        _id: `vis-${Date.now()}`,
        visitorName: visitorName || 'Parent Visitor',
        relation: relation || 'Guardian',
        phone: phone || '+91 9876543211',
        student: { name: 'Ayush', rollNumber: studentRoll || '25ASETCSE019', room: '204' },
        entryTime: new Date().toISOString(),
        exitTime: null,
        status: 'inside',
        hoursInside: '0.1',
        isOverstay: false
      };
      mockVisitors.unshift(newVis);
      return sendSuccess(res, 'Visitor entry logged successfully (Mock Mode)', newVis, 201);
    }

    const student = await Student.findOne({ rollNumber: studentRoll.toUpperCase() });
    if (!student) return sendError(res, `No registered student found with roll number ${studentRoll}`, 404);

    const visitor = await Visitor.create({
      student: student._id,
      visitorName,
      relation,
      phone,
      entryTime: new Date(),
      status: 'inside',
      loggedBy: req.user.id
    });

    return sendSuccess(res, 'Visitor entry logged successfully', visitor, 201);
  } catch (error) {
    return sendError(res, error.message || 'Error logging visitor entry', 500, error);
  }
};

const markVisitorExit = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const found = mockVisitors.find(v => v._id === req.params.id) || mockVisitors[0];
      found.status = 'exited';
      found.exitTime = new Date().toISOString();
      return sendSuccess(res, 'Visitor exit stamped successfully (Mock Mode)', found);
    }

    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) return sendError(res, 'Visitor record not found', 404);

    visitor.exitTime = new Date();
    visitor.status = 'exited';
    await visitor.save();

    return sendSuccess(res, 'Visitor exit stamped successfully', visitor);
  } catch (error) {
    return sendError(res, error.message || 'Error stamping visitor exit', 500, error);
  }
};

const getActiveVisitors = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const active = mockVisitors.filter(v => v.status === 'inside');
      return sendSuccess(res, 'Active visitors retrieved (Mock Mode)', active);
    }

    const visitors = await Visitor.find({ status: 'inside' })
      .populate({ path: 'student', populate: { path: 'user' } })
      .sort({ entryTime: -1 });

    return sendSuccess(res, 'Active visitors retrieved', visitors);
  } catch (error) {
    return sendError(res, error.message || 'Error fetching active visitors', 500, error);
  }
};

const getAllVisitors = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return sendSuccess(res, 'Visitor log history retrieved (Mock Mode)', mockVisitors);
    }

    const visitors = await Visitor.find()
      .populate({ path: 'student', populate: { path: 'user' } })
      .sort({ entryTime: -1 });

    return sendSuccess(res, 'Visitor log history retrieved', visitors);
  } catch (error) {
    return sendError(res, error.message || 'Error fetching visitor log', 500, error);
  }
};

module.exports = {
  logVisitorEntry,
  markVisitorExit,
  getActiveVisitors,
  getAllVisitors
};
