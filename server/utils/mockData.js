const jwt = require('jsonwebtoken');

/**
 * In-Memory Mock Test Data Store for Sharda University Agra Hostel Management System
 * Enables 100% instant execution without requiring MongoDB or any cloud setup.
 */

const mockUsers = [
  {
    _id: 'usr-admin-01',
    name: 'Dr. R. K. Sharma',
    email: 'admin@sharda.ac.in',
    password: 'admin123',
    role: 'admin',
    isActive: true
  },
  {
    _id: 'usr-warden-01',
    name: 'Prof. Virendra Verma',
    email: 'warden@sharda.ac.in',
    password: 'warden123',
    role: 'warden',
    isActive: true
  },
  {
    _id: 'usr-student-01',
    name: 'Ayush',
    email: 'ayush@sharda.ac.in',
    password: 'ayush123',
    role: 'student',
    isActive: true
  },
  {
    _id: 'usr-student-02',
    name: 'Priya Verma',
    email: 'priya@sharda.ac.in',
    password: 'student123',
    role: 'student',
    isActive: true
  },
  {
    _id: 'usr-student-03',
    name: 'Ankit Kumar',
    email: 'ankit@sharda.ac.in',
    password: 'student123',
    role: 'student',
    isActive: true
  }
];

const mockHostels = [
  {
    _id: 'hst-01',
    name: 'Nelson Mandela Boys Hostel (Block B)',
    code: 'NMB-B',
    gender: 'boys',
    totalFloors: 4,
    totalRooms: 60,
    totalCapacity: 180,
    totalOccupied: 165,
    occupancyRate: 92,
    warden: { name: 'Prof. Virendra Verma', email: 'warden@sharda.ac.in' }
  },
  {
    _id: 'hst-02',
    name: 'Rabindranath Tagore Boys Hostel (Block A)',
    code: 'RTB-A',
    gender: 'boys',
    totalFloors: 4,
    totalRooms: 60,
    totalCapacity: 180,
    totalOccupied: 158,
    occupancyRate: 88,
    warden: { name: 'Prof. Virendra Verma', email: 'warden@sharda.ac.in' }
  },
  {
    _id: 'hst-03',
    name: 'Sarojini Naidu Girls Hostel (Block C)',
    code: 'SNG-C',
    gender: 'girls',
    totalFloors: 4,
    totalRooms: 50,
    totalCapacity: 150,
    totalOccupied: 142,
    occupancyRate: 95,
    warden: { name: 'Dr. Sunita Sen', email: 'sunita@sharda.ac.in' }
  },
  {
    _id: 'hst-04',
    name: 'Mother Teresa PG & Scholars Wing (Block D)',
    code: 'MTS-D',
    gender: 'co-ed',
    totalFloors: 3,
    totalRooms: 30,
    totalCapacity: 60,
    totalOccupied: 50,
    occupancyRate: 83,
    warden: { name: 'Dr. R. K. Sharma', email: 'admin@sharda.ac.in' }
  }
];

const mockRooms = [
  {
    _id: 'rm-204',
    hostel: { _id: 'hst-01', name: 'Nelson Mandela Boys Hostel (Block B)', code: 'NMB-B', gender: 'boys' },
    roomNumber: '204',
    floor: 2,
    capacity: 2,
    occupied: 1,
    status: 'available',
    feeAmount: 45000,
    amenities: ['2 Beds', 'Attached Washroom', 'Wi-Fi 6', 'Balcony View', 'Study Desks']
  },
  {
    _id: 'rm-205',
    hostel: { _id: 'hst-01', name: 'Nelson Mandela Boys Hostel (Block B)', code: 'NMB-B', gender: 'boys' },
    roomNumber: '205',
    floor: 2,
    capacity: 3,
    occupied: 3,
    status: 'occupied',
    feeAmount: 40000,
    amenities: ['3 Beds', 'Common Washroom', 'Wi-Fi 6', 'Study Desks']
  },
  {
    _id: 'rm-101',
    hostel: { _id: 'hst-01', name: 'Nelson Mandela Boys Hostel (Block B)', code: 'NMB-B', gender: 'boys' },
    roomNumber: '101',
    floor: 1,
    capacity: 2,
    occupied: 0,
    status: 'available',
    feeAmount: 45000,
    amenities: ['2 Beds', 'AC Attached', 'Study Desks', 'Wi-Fi 6']
  },
  {
    _id: 'rm-108',
    hostel: { _id: 'hst-03', name: 'Sarojini Naidu Girls Hostel (Block C)', code: 'SNG-C', gender: 'girls' },
    roomNumber: '108',
    floor: 1,
    capacity: 2,
    occupied: 1,
    status: 'available',
    feeAmount: 48000,
    amenities: ['2 Beds', 'Attached Washroom', 'High-Speed Wi-Fi', 'Wardrobe']
  },
  {
    _id: 'rm-302',
    hostel: { _id: 'hst-02', name: 'Rabindranath Tagore Boys Hostel (Block A)', code: 'RTB-A', gender: 'boys' },
    roomNumber: '302',
    floor: 3,
    capacity: 3,
    occupied: 2,
    status: 'available',
    feeAmount: 40000,
    amenities: ['3 Beds', 'Study Desks', 'Wi-Fi']
  }
];

const mockStudents = [
  {
    _id: 'std-01',
    user: { _id: 'usr-student-01', name: 'Ayush', email: 'ayush@sharda.ac.in', avatar: '', isActive: true },
    rollNumber: '25ASETCSE019',
    department: 'Computer Science & Engineering',
    year: 2,
    phone: '+91 9876543210',
    guardianPhone: '+91 9876543211',
    hostel: 'Nelson Mandela Boys Hostel (Block B)',
    room: '204',
    roomAllocation: {
      _id: 'alc-01',
      room: { _id: 'rm-204', roomNumber: '204', capacity: 2, occupied: 1 },
      hostel: { _id: 'hst-01', name: 'Nelson Mandela Boys Hostel (Block B)' },
      startDate: '2026-08-01',
      status: 'active'
    },
    status: 'active'
  },
  {
    _id: 'std-02',
    user: { _id: 'usr-student-02', name: 'Priya Verma', email: 'priya@sharda.ac.in', avatar: '', isActive: true },
    rollNumber: '2026BECE045',
    department: 'Electronics & Communication',
    year: 2,
    phone: '+91 9876543211',
    guardianPhone: '+91 9876543222',
    hostel: 'Sarojini Naidu Girls Hostel (Block C)',
    room: '108',
    roomAllocation: {
      _id: 'alc-02',
      room: { _id: 'rm-108', roomNumber: '108', capacity: 2, occupied: 1 },
      hostel: { _id: 'hst-03', name: 'Sarojini Naidu Girls Hostel (Block C)' },
      startDate: '2026-08-01',
      status: 'active'
    },
    status: 'active'
  },
  {
    _id: 'std-03',
    user: { _id: 'usr-student-03', name: 'Ankit Kumar', email: 'ankit@sharda.ac.in', avatar: '', isActive: true },
    rollNumber: '2026BME112',
    department: 'Mechanical Engineering',
    year: 3,
    phone: '+91 9876543212',
    guardianPhone: '+91 9876543233',
    hostel: 'Rabindranath Tagore Boys Hostel (Block A)',
    room: '302',
    roomAllocation: {
      _id: 'alc-03',
      room: { _id: 'rm-302', roomNumber: '302', capacity: 3, occupied: 2 },
      hostel: { _id: 'hst-02', name: 'Rabindranath Tagore Boys Hostel (Block A)' },
      startDate: '2026-08-01',
      status: 'active'
    },
    status: 'active'
  },
  {
    _id: 'std-04',
    user: { _id: 'usr-student-04', name: 'Sneha Gupta', email: 'sneha@sharda.ac.in', avatar: '', isActive: true },
    rollNumber: '2026BCSE201',
    department: 'Computer Science & Engineering',
    year: 1,
    phone: '+91 9876543213',
    guardianPhone: '+91 9876543244',
    hostel: 'Sarojini Naidu Girls Hostel (Block C)',
    room: '215',
    roomAllocation: null,
    status: 'active'
  }
];

const mockComplaints = [
  {
    _id: 'cmp-104',
    id: 'CMP-2026-104',
    student: { name: 'Ayush', rollNumber: '25ASETCSE019', room: '204' },
    category: 'Air Conditioner',
    subject: 'Cooling Insufficient in Room 204',
    description: 'AC airflow is normal but cooling refrigerant seems low during afternoons.',
    priority: 'High',
    date: '06 Sep 2026',
    status: 'in-progress'
  },
  {
    _id: 'cmp-089',
    id: 'CMP-2026-089',
    student: { name: 'Ayush', rollNumber: '25ASETCSE019', room: '204' },
    category: 'Plumbing',
    subject: 'Bathroom Washbasin Tap Leaking',
    description: 'Washer was damaged causing steady drip.',
    priority: 'Medium',
    date: '28 Aug 2026',
    status: 'resolved',
    resolutionNotes: 'Plumber replaced rubber washer. Issue resolved.'
  },
  {
    _id: 'cmp-105',
    id: 'CMP-2026-105',
    student: { name: 'Ankit Kumar', rollNumber: '2026BME112', room: '302' },
    category: 'Plumbing',
    subject: 'Slow Drainage in Shower',
    description: 'Shower floor drain takes 15 minutes to clear.',
    priority: 'Medium',
    date: '07 Sep 2026',
    status: 'pending'
  }
];

const mockLeaves = [
  {
    _id: 'lv-042',
    id: 'LV-2026-042',
    student: { name: 'Ayush', rollNumber: '25ASETCSE019', room: '204', phone: '+91 9876543210' },
    startDate: '2026-09-12',
    endDate: '2026-09-14',
    dates: '12 Sep - 14 Sep 2026',
    reason: 'Weekend Home Visit to Agra',
    parentContact: '+91 9876543211',
    status: 'approved',
    gatePassCode: 'PASS-SUA-2026-019',
    reviewedBy: { name: 'Prof. Virendra Verma' },
    reviewComments: 'Parent telephonically verified. Approved.'
  },
  {
    _id: 'lv-040',
    id: 'LV-2026-040',
    student: { name: 'Priya Verma', rollNumber: '2026BECE045', room: '108', phone: '+91 9876543211' },
    startDate: '2026-09-10',
    endDate: '2026-09-12',
    dates: '10 Sep - 12 Sep 2026',
    reason: 'Family Function in Delhi',
    parentContact: '+91 9876543222',
    status: 'approved',
    gatePassCode: 'PASS-SUA-2026-045',
    reviewedBy: { name: 'Prof. Virendra Verma' }
  }
];

const mockVisitors = [
  {
    _id: 'vis-901',
    visitorName: 'Mr. Ramesh Sharma',
    relation: 'Father',
    phone: '+91 9876543211',
    student: { name: 'Ayush', rollNumber: '25ASETCSE019', room: '204' },
    entryTime: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    exitTime: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
    status: 'exited',
    hoursInside: '2.0',
    isOverstay: false
  },
  {
    _id: 'vis-902',
    visitorName: 'Mrs. Sunita Verma',
    relation: 'Mother',
    phone: '+91 9876543222',
    student: { name: 'Priya Verma', rollNumber: '2026BECE045', room: '108' },
    entryTime: new Date(Date.now() - 1.5 * 3600 * 1000).toISOString(),
    exitTime: null,
    status: 'inside',
    hoursInside: '1.5',
    isOverstay: false
  }
];

const mockNotices = [
  {
    _id: 'ntc-01',
    id: 1,
    title: 'Hostel Night Curfew Timings & Biometric Roll Call Notice',
    content: 'All resident students must report to their designated hostel blocks by 10:00 PM sharp. Late entries require prior warden-approved outstation gate passes.',
    targetAudience: 'all',
    category: 'curfew',
    isPinned: true,
    publishedBy: { name: 'Dr. R. K. Sharma', role: 'admin' },
    createdAt: new Date().toISOString()
  },
  {
    _id: 'ntc-02',
    id: 2,
    title: 'Special Festival Mess Dinner & Voting Schedule',
    content: 'The student mess committee has finalized the festival celebration dinner for Saturday evening. Special Rajasthani Thali and Sweets will be served.',
    targetAudience: 'all',
    category: 'mess',
    isPinned: false,
    publishedBy: { name: 'Prof. Virendra Verma', role: 'warden' },
    createdAt: new Date().toISOString()
  }
];

const mockFees = [
  {
    _id: 'fee-01',
    student: { _id: 'std-01', rollNumber: '25ASETCSE019', user: { name: 'Ayush' } },
    term: 'Term 1 (Autumn 2026)',
    amount: 45000,
    dueDate: '2026-08-15',
    status: 'paid',
    receiptId: 'RCP-SUA-2026-042',
    paidAt: '2026-08-10'
  }
];

// Helper to sign mock JWT
const generateMockToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.JWT_SECRET || 'sharda_mock_jwt_secret_2026',
    { expiresIn: '24h' }
  );
};

module.exports = {
  mockUsers,
  mockHostels,
  mockRooms,
  mockStudents,
  mockComplaints,
  mockLeaves,
  mockVisitors,
  mockNotices,
  mockFees,
  generateMockToken
};
