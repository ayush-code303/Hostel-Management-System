const mongoose = require('mongoose');
const MessFeedback = require('../models/MessFeedback');
const Student = require('../models/Student');
const { sendSuccess, sendError } = require('../utils/response');

// Predefined Sharda University Agra Mess Timetable
const weeklyMessMenu = {
  Monday: {
    breakfast: 'Aloo Paratha, Curd, Butter, Tea / Coffee',
    lunch: 'Dal Tadka, Mix Veg, Jeera Rice, Chapati, Fresh Green Salad',
    snacks: 'Veg Samosa / Cutlet & Hot Masala Tea',
    dinner: 'Paneer Butter Masala, Shahi Dal, Steamed Rice, Chapati, Gulab Jamun'
  },
  Tuesday: {
    breakfast: 'Idli, Sambhar, Coconut Chutney, Banana, Milk / Tea',
    lunch: 'Rajma Masala, Aloo Gobi, Basmati Rice, Phulka, Boondi Raita',
    snacks: 'Poha with Roasted Peanuts, Sev & Tea',
    dinner: 'Kadai Mushroom / Chana Masala, Arhar Dal, Rice, Tandoori Roti, Kheer'
  },
  Wednesday: {
    breakfast: 'Poori Bhaji, Halwa, Pickle, Milk / Tea',
    lunch: 'Kadhi Pakora, Seasonal Sabzi, Plain Rice, Chapati, Papad',
    snacks: 'Veg Grilled Sandwich, Green Chutney & Tea',
    dinner: 'Shahi Paneer, Dal Makhani, Pulao, Butter Naan / Chapati, Custard'
  },
  Thursday: {
    breakfast: 'Poha / Upma, Mint Chutney, Boiled Eggs / Fruit, Tea',
    lunch: 'Chole Bhature, Onion Salad, Lemon Pickle, Sweet Lassi',
    snacks: 'Bread Pakora & Hot Tea',
    dinner: 'Aloo Matar Paneer, Yellow Dal Fry, Rice, Chapati, Fruit Trifle'
  },
  Friday: {
    breakfast: 'Methi Paratha, White Butter, Pickle, Sprouted Moong, Tea',
    lunch: 'Veg Biryani with Mix Veg Raita, Dal Tadka, Roti, Salad',
    snacks: 'Mix Pakora (Onion & Potato) & Ginger Cardamom Tea',
    dinner: 'Matar Paneer, Dal Palak, Jeera Rice, Chapati, Rasgulla'
  },
  Saturday: {
    breakfast: 'Uttapam / Masala Dosa, Sambhar, Tomato Chutney, Milk / Coffee',
    lunch: 'Dal Fry, Bhindi Do Pyaza, Steamed Rice, Chapati, Curd',
    snacks: 'Bhel Puri / Sev Puri & Lemon Ice Tea',
    dinner: 'Malai Kofta, Moong Dal Tadka, Rice, Garlic Naan / Chapati, Ice Cream'
  },
  Sunday: {
    breakfast: 'Chole Kulche, Pickled Chilies, Fresh Fruit Juice / Tea',
    lunch: 'Special Sharda Feast: Dum Aloo, Dal Bukhara, Pulao, Laccha Paratha, Raita',
    snacks: 'Cookies & Hot Tea / Coffee',
    dinner: 'Special Khichdi or Paneer Do Pyaza, Dal Fry, Rice, Chapati, Moong Dal Halwa'
  }
};

// In-memory fallback mock feedback
const mockFeedbacks = [
  {
    _id: 'fb-01',
    studentName: 'Ayush',
    rollNumber: '25ASETCSE019',
    mealType: 'Dinner',
    rating: 5,
    comment: 'Paneer butter masala and gulab jamun were delicious tonight!',
    date: '2026-10-20'
  },
  {
    _id: 'fb-02',
    studentName: 'Priya Verma',
    rollNumber: '2026BECE045',
    mealType: 'Lunch',
    rating: 4,
    comment: 'Rajma rice was very good, please keep curd cold.',
    date: '2026-10-20'
  },
  {
    _id: 'fb-03',
    studentName: 'Ankit Kumar',
    rollNumber: '2026BME112',
    mealType: 'Breakfast',
    rating: 4,
    comment: 'Aloo parathas were crispy and fresh.',
    date: '2026-10-19'
  }
];

const getWeeklyMenu = async (req, res) => {
  try {
    return sendSuccess(res, 'Weekly mess timetable retrieved successfully', weeklyMessMenu);
  } catch (error) {
    return sendError(res, error.message || 'Error fetching mess timetable', 500);
  }
};

const getMessFeedback = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const avgRating = (mockFeedbacks.reduce((acc, f) => acc + f.rating, 0) / (mockFeedbacks.length || 1)).toFixed(1);
      return sendSuccess(res, 'Mess feedback retrieved (Mock Mode)', {
        feedbacks: mockFeedbacks,
        averageRating: parseFloat(avgRating),
        totalReviews: mockFeedbacks.length
      });
    }

    const feedbacks = await MessFeedback.find().sort({ createdAt: -1 }).limit(50);
    const totalReviews = feedbacks.length;
    const avgRating = totalReviews > 0 
      ? (feedbacks.reduce((acc, f) => acc + f.rating, 0) / totalReviews).toFixed(1)
      : 4.5;

    return sendSuccess(res, 'Mess feedback records retrieved', {
      feedbacks,
      averageRating: parseFloat(avgRating),
      totalReviews
    });
  } catch (error) {
    return sendError(res, error.message || 'Error fetching mess feedback', 500);
  }
};

const submitMessFeedback = async (req, res) => {
  try {
    const { mealType, rating, comment, studentName, rollNumber } = req.body;

    if (!mealType || !rating || !comment) {
      return sendError(res, 'Meal type, rating (1-5), and comments are required', 400);
    }

    const name = studentName || (req.user && req.user.name) || 'Ayush';
    const roll = rollNumber || (req.user && req.user.student && req.user.student.rollNumber) || '25ASETCSE019';

    if (mongoose.connection.readyState !== 1) {
      const newFb = {
        _id: `fb-${Date.now()}`,
        studentName: name,
        rollNumber: roll,
        mealType,
        rating: Number(rating),
        comment,
        date: new Date().toISOString().split('T')[0]
      };
      mockFeedbacks.unshift(newFb);

      if (req.io) {
        req.io.emit('feedback:submitted', newFb);
      }

      return sendSuccess(res, 'Thank you! Your dining feedback has been recorded (Mock Mode)', newFb, 201);
    }

    const feedback = await MessFeedback.create({
      studentName: name,
      rollNumber: roll,
      mealType,
      rating: Number(rating),
      comment
    });

    if (req.io) {
      req.io.emit('feedback:submitted', feedback);
    }

    return sendSuccess(res, 'Thank you! Your dining feedback has been recorded', feedback, 201);
  } catch (error) {
    return sendError(res, error.message || 'Error recording mess feedback', 500);
  }
};

module.exports = {
  getWeeklyMenu,
  getMessFeedback,
  submitMessFeedback
};
