const mongoose = require('mongoose');
const Attendance = require('../models/Attendance');
const { sendSuccess, sendError } = require('../utils/response');

const markAttendance = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return sendSuccess(res, 'Attendance marked successfully (Mock Mode)', {
        count: req.body.records ? req.body.records.length : 1,
        date: new Date()
      }, 201);
    }

    const { records, date } = req.body;
    if (!records || !Array.isArray(records)) {
      return sendError(res, 'Please provide an array of attendance records', 400);
    }

    const attendanceDate = date ? new Date(date) : new Date();
    attendanceDate.setHours(0, 0, 0, 0);

    const savedRecords = [];
    for (const record of records) {
      const updated = await Attendance.findOneAndUpdate(
        { student: record.studentId, date: attendanceDate },
        {
          student: record.studentId,
          date: attendanceDate,
          status: record.status || 'present',
          markedBy: req.user.id,
          remarks: record.remarks || ''
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      savedRecords.push(updated);
    }

    return sendSuccess(res, `Attendance marked for ${savedRecords.length} student(s)`, {
      count: savedRecords.length,
      records: savedRecords
    }, 201);
  } catch (error) {
    return sendError(res, error.message || 'Error marking attendance', 500, error);
  }
};

const getStudentAttendance = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const mockHistory = [];
      for (let i = 1; i <= 14; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        mockHistory.push({
          _id: `att-${i}`,
          date: d.toISOString(),
          status: i === 6 ? 'leave' : 'present',
          remarks: i === 6 ? 'Approved weekend pass' : 'Present at 10:00 PM roll call'
        });
      }
      return sendSuccess(res, 'Student attendance records retrieved (Mock Mode)', {
        totalDays: 14,
        presentDays: 13,
        absentDays: 0,
        leaveDays: 1,
        attendancePercentage: 94.2,
        history: mockHistory
      });
    }

    const records = await Attendance.find({ student: req.params.studentId }).sort({ date: -1 }).limit(60);
    const totalDays = records.length;
    const presentDays = records.filter(r => r.status === 'present').length;
    const absentDays = records.filter(r => r.status === 'absent').length;
    const leaveDays = records.filter(r => r.status === 'leave').length;
    const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 100;

    return sendSuccess(res, 'Student attendance retrieved', {
      totalDays,
      presentDays,
      absentDays,
      leaveDays,
      attendancePercentage,
      history: records
    });
  } catch (error) {
    return sendError(res, error.message || 'Error fetching student attendance', 500, error);
  }
};

const getHostelAttendanceStats = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return sendSuccess(res, 'Attendance summary retrieved (Mock Mode)', {
        date: new Date(),
        totalMarked: 165,
        present: 156,
        absent: 3,
        onLeave: 6
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayRecords = await Attendance.find({ date: today });

    return sendSuccess(res, 'Attendance summary retrieved', {
      date: today,
      totalMarked: todayRecords.length,
      present: todayRecords.filter(r => r.status === 'present').length,
      absent: todayRecords.filter(r => r.status === 'absent').length,
      onLeave: todayRecords.filter(r => r.status === 'leave').length
    });
  } catch (error) {
    return sendError(res, error.message || 'Error fetching attendance stats', 500, error);
  }
};

module.exports = {
  markAttendance,
  getStudentAttendance,
  getHostelAttendanceStats
};
