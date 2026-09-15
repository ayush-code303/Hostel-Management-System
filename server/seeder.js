const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load Models
const User = require('./models/User');
const Student = require('./models/Student');
const Hostel = require('./models/Hostel');
const Room = require('./models/Room');
const Allocation = require('./models/Allocation');
const Fee = require('./models/Fee');
const Payment = require('./models/Payment');
const Complaint = require('./models/Complaint');
const Notice = require('./models/Notice');
const Attendance = require('./models/Attendance');
const Leave = require('./models/Leave');
const Visitor = require('./models/Visitor');

dotenv.config();

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/hostel_management_db';
    console.log(`Connecting to database: ${mongoUri}...`);
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected successfully.');

    // Clear existing collections
    console.log('Cleaning existing records...');
    await Promise.all([
      User.deleteMany({}),
      Student.deleteMany({}),
      Hostel.deleteMany({}),
      Room.deleteMany({}),
      Allocation.deleteMany({}),
      Fee.deleteMany({}),
      Payment.deleteMany({}),
      Complaint.deleteMany({}),
      Notice.deleteMany({}),
      Attendance.deleteMany({}),
      Leave.deleteMany({}),
      Visitor.deleteMany({})
    ]);
    console.log('Collections cleared.');

    // 1. Create System Users
    console.log('Seeding Users...');
    const adminUser = await User.create({
      name: 'Dr. R. K. Sharma',
      email: 'admin@sharda.ac.in',
      password: 'admin123',
      role: 'admin'
    });

    const wardenUser = await User.create({
      name: 'Prof. Virendra Verma',
      email: 'warden@sharda.ac.in',
      password: 'warden123',
      role: 'warden'
    });

    const ayushUser = await User.create({
      name: 'Ayush',
      email: 'ayush@sharda.ac.in',
      password: 'ayush123',
      role: 'student'
    });

    const anushkaUser = await User.create({
      name: 'Anushka Upadhyay',
      email: 'anushka@sharda.ac.in',
      password: 'student123',
      role: 'student'
    });

    const bhoomiUser = await User.create({
      name: 'Bhoomi Purushwani',
      email: 'bhoomi@sharda.ac.in',
      password: 'student123',
      role: 'student'
    });

    const palakUser = await User.create({
      name: 'Palak Saraswat',
      email: 'palak@sharda.ac.in',
      password: 'student123',
      role: 'student'
    });

    // 2. Create Hostel Blocks
    console.log('Seeding Hostel Blocks...');
    const mandelaHostel = await Hostel.create({
      name: 'Nelson Mandela Boys Hostel (Block B)',
      code: 'NMB-B',
      totalFloors: 4,
      totalRooms: 60,
      capacity: 180,
      gender: 'boys',
      warden: wardenUser._id
    });

    const tagoreHostel = await Hostel.create({
      name: 'Rabindranath Tagore Boys Hostel (Block A)',
      code: 'RTB-A',
      totalFloors: 4,
      totalRooms: 60,
      capacity: 180,
      gender: 'boys',
      warden: wardenUser._id
    });

    const sarojiniHostel = await Hostel.create({
      name: 'Sarojini Naidu Girls Hostel (Block C)',
      code: 'SNG-C',
      totalFloors: 4,
      totalRooms: 50,
      capacity: 150,
      gender: 'girls',
      warden: wardenUser._id
    });

    // 3. Create Rooms for Nelson Mandela Boys Hostel
    console.log('Seeding Rooms...');
    const room204 = await Room.create({
      hostel: mandelaHostel._id,
      roomNumber: '204',
      floor: 2,
      capacity: 2,
      occupied: 1,
      feeAmount: 45000,
      status: 'available',
      amenities: ['2 Beds', '2 Study Desks', 'Attached Washroom', 'High-Speed Wi-Fi', 'Balcony']
    });

    const room205 = await Room.create({
      hostel: mandelaHostel._id,
      roomNumber: '205',
      floor: 2,
      capacity: 3,
      occupied: 3,
      feeAmount: 40000,
      status: 'occupied',
      amenities: ['3 Beds', '3 Study Desks', 'Common Washroom', 'Wi-Fi']
    });

    const room101 = await Room.create({
      hostel: mandelaHostel._id,
      roomNumber: '101',
      floor: 1,
      capacity: 2,
      occupied: 0,
      feeAmount: 45000,
      status: 'available',
      amenities: ['2 Beds', 'Study Desks', 'Attached Washroom', 'Air Conditioning']
    });

    // 4. Create Students & Room Allocation for Ayush (25ASETCSE019)
    console.log('Seeding Student Records...');
    const ayushStudent = await Student.create({
      user: ayushUser._id,
      rollNumber: '25ASETCSE019',
      department: 'Computer Science & Engineering',
      year: 2,
      phone: '9876543210',
      guardianPhone: '9876543211',
      address: {
        street: 'Fatehabad Road',
        city: 'Agra',
        state: 'Uttar Pradesh',
        zipCode: '282001'
      },
      status: 'active'
    });

    const anushkaStudent = await Student.create({
      user: anushkaUser._id,
      rollNumber: '25ASETCSE020',
      department: 'Computer Science & Engineering',
      year: 2,
      phone: '9876543212',
      guardianPhone: '9876543213',
      address: {
        street: 'Sanjay Place',
        city: 'Agra',
        state: 'Uttar Pradesh',
        zipCode: '282002'
      },
      status: 'active'
    });

    // 5. Create Allocation for Ayush in Room 204
    console.log('Allocating Room 204 to Ayush...');
    const ayushAllocation = await Allocation.create({
      student: ayushStudent._id,
      hostel: mandelaHostel._id,
      room: room204._id,
      startDate: new Date('2026-08-01'),
      status: 'active',
      remarks: 'Allocated to Room 204, Bed 1 (Merit List)'
    });

    ayushStudent.roomAllocation = ayushAllocation._id;
    await ayushStudent.save();

    // 6. Seed Fees & Payment for Ayush
    console.log('Seeding Fee Structure & Receipt...');
    const ayushFee = await Fee.create({
      student: ayushStudent._id,
      term: 'Term 1 (Autumn 2026)',
      amount: 45000,
      dueDate: new Date('2026-08-15'),
      status: 'paid',
      paidAt: new Date('2026-08-10')
    });

    await Payment.create({
      fee: ayushFee._id,
      student: ayushStudent._id,
      amount: 45000,
      transactionId: 'TXN-SUA-2026-89412',
      paymentMethod: 'UPI / NetBanking',
      status: 'success'
    });

    // 7. Seed Complaints
    console.log('Seeding Maintenance Complaints...');
    await Complaint.create({
      student: ayushStudent._id,
      category: 'electrical',
      subject: 'Balcony LED Light Replacement',
      description: 'The exterior balcony light fitting in Room 204 is flickering intermittently.',
      priority: 'medium',
      status: 'resolved',
      resolvedBy: wardenUser._id,
      resolvedAt: new Date('2026-08-22'),
      resolutionNotes: 'Electrician inspected and replaced the 15W LED bulb fixture.'
    });

    await Complaint.create({
      student: ayushStudent._id,
      category: 'wifi',
      subject: 'Wi-Fi Signal Strength in 2nd Floor Wing B',
      description: 'Wi-Fi speed drops during 9:00 PM peak hours in Room 204.',
      priority: 'low',
      status: 'in-progress'
    });

    // 8. Seed Outstation Leave Pass (Palak's Module)
    console.log('Seeding Outstation Leave Passes...');
    await Leave.create({
      student: ayushStudent._id,
      startDate: new Date('2026-09-19'),
      endDate: new Date('2026-09-21'),
      reason: 'Visiting home in Agra for family ceremony',
      status: 'approved',
      reviewedBy: wardenUser._id,
      reviewComments: 'Parent telephonically verified. Gate Pass code: PASS-SUA-2026-019.'
    });

    // 9. Seed Night Attendance (Palak's Module)
    console.log('Seeding Night Attendance Records...');
    for (let i = 1; i <= 14; i++) {
      const attDate = new Date();
      attDate.setDate(attDate.getDate() - i);
      attDate.setHours(0, 0, 0, 0);

      await Attendance.create({
        student: ayushStudent._id,
        date: attDate,
        status: i === 5 ? 'leave' : 'present',
        markedBy: wardenUser._id,
        remarks: i === 5 ? 'Weekend gate pass' : 'Present at 10:00 PM roll call'
      });
    }

    // 10. Seed Visitor Log (Palak's Module)
    console.log('Seeding Campus Security Visitor Log...');
    await Visitor.create({
      student: ayushStudent._id,
      visitorName: 'Mr. Rajesh Sharma',
      relation: 'Father',
      phone: '9876543211',
      entryTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: 'inside',
      loggedBy: wardenUser._id
    });

    // 11. Seed Campus Notices
    console.log('Seeding University Notices...');
    await Notice.create({
      title: 'Hostel Night Curfew Timings & Biometric Roll Call Notice',
      content: 'All resident students must report to their designated hostel blocks by 10:00 PM sharp. Late entries require prior warden-approved outstation gate passes.',
      targetAudience: 'all',
      category: 'curfew',
      isPinned: true,
      publishedBy: adminUser._id
    });

    await Notice.create({
      title: 'Mess Menu Revision & Special Festival Dinner',
      content: 'The student mess committee has approved the new weekly meal schedule starting Monday. Special festival dinner will be served on Saturday.',
      targetAudience: 'all',
      category: 'mess',
      isPinned: false,
      publishedBy: wardenUser._id
    });

    console.log('====================================================');
    console.log('🎉 SHARDA UNIVERSITY AGRA DATABASE SEEDED SUCCESSFULLY!');
    console.log('====================================================');
    console.log('Demo Logins:');
    console.log('👤 Admin:   admin@sharda.ac.in   / admin123');
    console.log('👤 Warden:  warden@sharda.ac.in  / warden123');
    console.log('👤 Student: ayush@sharda.ac.in   / ayush123 (Roll: 25ASETCSE019)');
    console.log('====================================================');

    process.exit(0);
  } catch (error) {
    console.error('❌ Database Seeder Error:', error);
    process.exit(1);
  }
};

seedDatabase();
