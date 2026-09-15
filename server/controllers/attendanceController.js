const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * @desc    Mark daily night attendance for students (Bulk or Single)
 * @route   POST /api/attendance
 * @access  Private (Warden & Admin)
 */
const markAttendance = async (req, res) => {
  try {
    const { records, date } = req.body;
    // records: Array of { studentId, status: 'present'|'absent'|'leave', remarks }

    if (!records || !Array.isArray(records) || records.length === 0) {
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

    return sendSuccess(res, `Attendance marked successfully for ${savedRecords.length} student(s)`, {
      count: savedRecords.length,
      date: attendanceDate,
      records: savedRecords
    }, 201);
  } catch (error) {
    return sendError(res, error.message || 'Error marking attendance', 500, error);
  }
};

/**
 * @desc    Get attendance history and stats for a specific student
 * @route   GET /api/attendance/student/:studentId
 * @access  Private (Student Self, Warden, Admin)
 */
const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;

    const records = await Attendance.find({ student: studentId })
      .sort({ date: -1 })
      .limit(60);

    const totalDays = records.length;
    const presentDays = records.filter(r => r.status === 'present').length;
    const absentDays = records.filter(r => r.status === 'absent').length;
    const leaveDays = records.filter(r => r.status === 'leave').length;
    const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 100;

    return sendSuccess(res, 'Student attendance records retrieved', {
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

/**
 * @desc    Get hostel-wide attendance statistics for current date
 * @route   GET /api/attendance/stats
 * @access  Private (Warden & Admin)
 */
const getHostelAttendanceStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayRecords = await Attendance.find({ date: today }).populate({
      path: 'student',
      populate: { path: 'user' }
    });

    const totalMarked = todayRecords.length;
    const present = todayRecords.filter(r => r.status === 'present').length;
    const absent = todayRecords.filter(r => r.status === 'absent').length;
    const onLeave = todayRecords.filter(r => r.status === 'leave').length;

    return sendSuccess(res, 'Attendance summary retrieved', {
      date: today,
      totalMarked,
      present,
      absent,
      onLeave,
      todayRecords
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
