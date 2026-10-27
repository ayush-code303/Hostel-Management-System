/**
 * Multi-College & Multi-Hostel Central Database Registry
 * Enables instant institution detection, customized branding, and role routing
 * for University Students, Wardens, and Campus Administrators.
 */

export const INSTITUTIONS = {
  'SUA': {
    id: 'SUA',
    name: 'Sharda University Agra',
    campusCode: 'SUA-AGRA',
    state: 'Uttar Pradesh',
    affiliation: 'NAAC A+ Accredited University',
    tagline: 'Empowering Minds, Transforming Residences',
    primaryColor: '#1D4ED8', // Royal Blue
    accentColor: '#D97706',
    logoText: 'SHARDA AGRA',
    helpline: '+91 98765 43210',
    idPatterns: ['25ASET', 'SUA', '@sharda.ac.in'],
    hostels: [
      { id: 'hst-sua-01', name: 'Nelson Mandela Boys Hostel (Block B)', code: 'NMB-B', gender: 'Boys', totalBeds: 180, occupiedBeds: 165 },
      { id: 'hst-sua-02', name: 'Rabindranath Tagore Boys Hostel (Block A)', code: 'RTB-A', gender: 'Boys', totalBeds: 180, occupiedBeds: 158 },
      { id: 'hst-sua-03', name: 'Sarojini Naidu Girls Hostel (Block C)', code: 'SNG-C', gender: 'Girls', totalBeds: 160, occupiedBeds: 142 },
      { id: 'hst-sua-04', name: 'Mother Teresa PG & Scholars Wing (Block D)', code: 'MTS-D', gender: 'Co-Ed', totalBeds: 60, occupiedBeds: 50 },
    ]
  },
  'DTU': {
    id: 'DTU',
    name: 'Delhi Technological University',
    campusCode: 'DTU-BAWANA',
    state: 'NCT of Delhi',
    affiliation: 'State University of Technology',
    tagline: 'Engineering Excellence & Smart Campus Life',
    primaryColor: '#0F766E', // Deep Teal
    accentColor: '#F59E0B',
    logoText: 'DTU DELHI',
    helpline: '+91 11 2787 1018',
    idPatterns: ['2026DTU', 'DTU', '@dtu.ac.in'],
    hostels: [
      { id: 'hst-dtu-01', name: 'Sir C.V. Raman Hall of Residence', code: 'CVR-1', gender: 'Boys', totalBeds: 240, occupiedBeds: 228 },
      { id: 'hst-dtu-02', name: 'Aryabhatta Hall of Residence', code: 'ARY-2', gender: 'Boys', totalBeds: 220, occupiedBeds: 205 },
      { id: 'hst-dtu-03', name: 'Kalpana Chawla Girls Hall', code: 'KCG-3', gender: 'Girls', totalBeds: 200, occupiedBeds: 190 },
    ]
  },
  'IITD': {
    id: 'IITD',
    name: 'Indian Institute of Technology Delhi',
    campusCode: 'IITD-HAUZKHAS',
    state: 'Delhi',
    affiliation: 'Institute of National Importance',
    tagline: 'National Science & Residential Community',
    primaryColor: '#7C2D12', // Crimson Maroon
    accentColor: '#0284C7',
    logoText: 'IIT DELHI',
    helpline: '+91 11 2659 1000',
    idPatterns: ['2026IITD', 'IITD', '@iitd.ac.in'],
    hostels: [
      { id: 'hst-iitd-01', name: 'Nilgiri Hall of Residence', code: 'NIL-A', gender: 'Boys', totalBeds: 300, occupiedBeds: 292 },
      { id: 'hst-iitd-02', name: 'Karakoram Hall of Residence', code: 'KAR-B', gender: 'Boys', totalBeds: 280, occupiedBeds: 270 },
      { id: 'hst-iitd-03', name: 'Kailash Girls Hostel', code: 'KAI-C', gender: 'Girls', totalBeds: 250, occupiedBeds: 245 },
    ]
  },
  'BHU': {
    id: 'BHU',
    name: 'Banaras Hindu University',
    campusCode: 'BHU-VARANASI',
    state: 'Uttar Pradesh',
    affiliation: 'Central University of National Eminence',
    tagline: 'Varanasi Heritage & Residential Learning',
    primaryColor: '#9D174D', // Deep Rose / Varanasi Silk
    accentColor: '#D97706',
    logoText: 'BHU VARANASI',
    helpline: '+91 542 236 8558',
    idPatterns: ['2026BHU', 'BHU', '@bhu.ac.in'],
    hostels: [
      { id: 'hst-bhu-01', name: 'Birla Hall of Residence', code: 'BIR-1', gender: 'Boys', totalBeds: 250, occupiedBeds: 238 },
      { id: 'hst-bhu-02', name: 'Kasturba Girls Hostel', code: 'KAS-2', gender: 'Girls', totalBeds: 220, occupiedBeds: 210 },
    ]
  }
};

/**
 * Demo Users Across Multiple Institutions & Roles
 */
export const MULTI_COLLEGE_USERS = [
  // 1. Sharda University Agra - Student
  {
    id: 'usr-sua-student',
    username: '25ASETCSE019',
    email: 'ayush@sharda.ac.in',
    name: 'Ayush',
    role: 'student',
    institutionId: 'SUA',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    student: {
      rollNumber: '25ASETCSE019',
      enrollmentNo: 'EN-SUA-2024-8891',
      department: 'Computer Science & Engineering',
      semester: 5,
      year: 3,
      bloodGroup: 'B+',
      phone: '+91 9876543210',
      guardianName: 'Ramesh Sharma',
      guardianPhone: '+91 9876543219',
      hostelId: 'hst-sua-01',
      hostelName: 'Nelson Mandela Boys Hostel (Block B)',
      room: '204',
      bed: 'Bed 2',
      duesAmount: 0,
      feeStatus: 'Paid',
      attendanceRate: 94.2
    }
  },
  // 2. Sharda University Agra - Warden
  {
    id: 'usr-sua-warden',
    username: 'warden.sua',
    email: 'warden.blockb@sharda.ac.in',
    name: 'Prof. Virendra Verma',
    role: 'warden',
    institutionId: 'SUA',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    warden: {
      designation: 'Chief Hostel Warden',
      assignedHostel: 'Nelson Mandela Boys Hostel (Block B)',
      assignedBlock: 'Block B',
      officeRoom: 'Admin Office Ground Floor, Block B',
      helpline: '+91 9876543210',
      residentsCount: 165
    }
  },
  // 3. Sharda University Agra - Campus Admin
  {
    id: 'usr-sua-admin',
    username: 'admin.sua',
    email: 'admin@sharda.ac.in',
    name: 'Dr. R. K. Sharma',
    role: 'admin',
    institutionId: 'SUA',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    admin: {
      designation: 'Dean of Student Welfare & Campus Director',
      officeLocation: 'Central Administrative Secretariat, Agra',
      totalHostelBlocks: 4,
      totalStudentsEnrolled: 650
    }
  },

  // 4. Delhi Technological University - Student
  {
    id: 'usr-dtu-student',
    username: '2026DTUCSE042',
    email: 'priya@dtu.ac.in',
    name: 'Priya Verma',
    role: 'student',
    institutionId: 'DTU',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    student: {
      rollNumber: '2026DTUCSE042',
      enrollmentNo: 'EN-DTU-2024-1102',
      department: 'Information Technology',
      semester: 4,
      year: 2,
      bloodGroup: 'O+',
      phone: '+91 9876543211',
      guardianName: 'M. K. Verma',
      guardianPhone: '+91 9876543220',
      hostelId: 'hst-dtu-03',
      hostelName: 'Kalpana Chawla Girls Hall (Block 3)',
      room: '108',
      bed: 'Bed 1',
      duesAmount: 0,
      feeStatus: 'Paid',
      attendanceRate: 96.5
    }
  },
  // 5. Delhi Technological University - Warden
  {
    id: 'usr-dtu-warden',
    username: 'warden.dtu',
    email: 'warden@dtu.ac.in',
    name: 'Dr. H. S. Meena',
    role: 'warden',
    institutionId: 'DTU',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    warden: {
      designation: 'Warden, Sir C.V. Raman Hall',
      assignedHostel: 'Sir C.V. Raman Hall of Residence',
      assignedBlock: 'Hall 1',
      officeRoom: 'Gate 2 Residence Office, DTU',
      helpline: '+91 11 2787 1018',
      residentsCount: 228
    }
  },

  // 6. IIT Delhi - Student
  {
    id: 'usr-iitd-student',
    username: '2026IITDCS104',
    email: 'ankit@iitd.ac.in',
    name: 'Ankit Kumar',
    role: 'student',
    institutionId: 'IITD',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    student: {
      rollNumber: '2026IITDCS104',
      enrollmentNo: 'EN-IITD-2025-4510',
      department: 'Electrical Engineering',
      semester: 3,
      year: 2,
      bloodGroup: 'A+',
      phone: '+91 9876543212',
      guardianName: 'Suresh Kumar',
      guardianPhone: '+91 9876543221',
      hostelId: 'hst-iitd-01',
      hostelName: 'Nilgiri Hall of Residence',
      room: '302',
      bed: 'Bed 1',
      duesAmount: 0,
      feeStatus: 'Paid',
      attendanceRate: 91.8
    }
  },

  // 7. BHU - Student
  {
    id: 'usr-bhu-student',
    username: '2026BHUCS089',
    email: 'sneha@bhu.ac.in',
    name: 'Sneha Gupta',
    role: 'student',
    institutionId: 'BHU',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    student: {
      rollNumber: '2026BHUCS089',
      enrollmentNo: 'EN-BHU-2024-3091',
      department: 'Computer Science',
      semester: 4,
      year: 2,
      bloodGroup: 'AB+',
      phone: '+91 9876543213',
      guardianName: 'Anil Gupta',
      guardianPhone: '+91 9876543222',
      hostelId: 'hst-bhu-02',
      hostelName: 'Kasturba Girls Hostel',
      room: '215',
      bed: 'Bed 2',
      duesAmount: 0,
      feeStatus: 'Paid',
      attendanceRate: 98.0
    }
  }
];

/**
 * Smart Institution & Role Detector from User ID or Email
 */
export function detectInstitutionAndUser(query) {
  if (!query || typeof query !== 'string') return null;

  const clean = query.trim().toLowerCase();

  // 1. Direct matched user check
  const matchedUser = MULTI_COLLEGE_USERS.find(u => 
    u.username.toLowerCase() === clean || 
    u.email.toLowerCase() === clean ||
    (u.student && u.student.rollNumber.toLowerCase() === clean)
  );

  if (matchedUser) {
    const institution = INSTITUTIONS[matchedUser.institutionId] || INSTITUTIONS['SUA'];
    return {
      institution,
      user: matchedUser,
      confidence: 'EXACT_MATCH',
      detectedCollege: institution.name,
      detectedHostel: matchedUser.student ? matchedUser.student.hostelName : (matchedUser.warden ? matchedUser.warden.assignedHostel : 'All Hostels'),
      role: matchedUser.role
    };
  }

  // 2. Pattern-based Institution Detection
  for (const [code, inst] of Object.entries(INSTITUTIONS)) {
    const matchesPattern = inst.idPatterns.some(pat => clean.includes(pat.toLowerCase()));
    if (matchesPattern) {
      // Determine probable role
      const role = clean.includes('admin') ? 'admin' : (clean.includes('warden') ? 'warden' : 'student');
      return {
        institution: inst,
        user: null,
        confidence: 'PATTERN_MATCH',
        detectedCollege: inst.name,
        detectedHostel: inst.hostels[0].name,
        role
      };
    }
  }

  // 3. Fallback default to Sharda University Agra
  return {
    institution: INSTITUTIONS['SUA'],
    user: null,
    confidence: 'DEFAULT_FALLBACK',
    detectedCollege: INSTITUTIONS['SUA'].name,
    detectedHostel: INSTITUTIONS['SUA'].hostels[0].name,
    role: clean.includes('admin') ? 'admin' : (clean.includes('warden') ? 'warden' : 'student')
  };
}
