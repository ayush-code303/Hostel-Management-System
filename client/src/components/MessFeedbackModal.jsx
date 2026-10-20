import React, { useState, useEffect } from 'react';
import { X, Utensils, Star, Send, Clock, ThumbsUp, Calendar } from 'lucide-react';
import { messAPI } from '../services/api';

const defaultMenu = {
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

export default function MessFeedbackModal({ onClose, onFeedbackSubmitted }) {
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'feedback'
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [menu, setMenu] = useState(defaultMenu);
  
  // Feedback form state
  const [mealType, setMealType] = useState('Dinner');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [avgRating, setAvgRating] = useState(4.6);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Fetch live menu
    messAPI.getMenu()
      .then(res => {
        if (res?.data) setMenu(res.data);
      })
      .catch(() => {});

    // Fetch live feedback
    messAPI.getFeedback()
      .then(res => {
        if (res?.data?.feedbacks) {
          setFeedbacks(res.data.feedbacks);
          setAvgRating(res.data.averageRating || 4.6);
        }
      })
      .catch(() => {
        setFeedbacks([
          { _id: '1', studentName: 'Ayush', mealType: 'Dinner', rating: 5, comment: 'Paneer butter masala and gulab jamun were delicious!', date: 'Today' },
          { _id: '2', studentName: 'Priya Verma', mealType: 'Lunch', rating: 4, comment: 'Dal tadka and jeera rice quality is very consistent.', date: 'Yesterday' }
        ]);
      });
  }, []);

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!comment) return;
    setSubmitting(true);
    try {
      const res = await messAPI.submitFeedback({
        mealType,
        rating,
        comment,
        studentName: 'Ayush',
        rollNumber: '25ASETCSE019'
      });
      const newReview = res?.data || {
        _id: `fb-${Date.now()}`,
        studentName: 'Ayush',
        mealType,
        rating,
        comment,
        date: 'Just Now'
      };
      setFeedbacks([newReview, ...feedbacks]);
      setComment('');
      if (onFeedbackSubmitted) onFeedbackSubmitted(newReview);
      setActiveTab('feedback');
    } catch (err) {
      console.warn('Feedback submit fallback:', err);
      const fallbackReview = {
        _id: `fb-${Date.now()}`,
        studentName: 'Ayush',
        mealType,
        rating,
        comment,
        date: 'Just Now'
      };
      setFeedbacks([fallbackReview, ...feedbacks]);
      setComment('');
      if (onFeedbackSubmitted) onFeedbackSubmitted(fallbackReview);
      setActiveTab('feedback');
    } finally {
      setSubmitting(false);
    }
  };

  const currentDayMenu = menu[selectedDay] || defaultMenu[selectedDay];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 max-w-2xl w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur">
              <Utensils className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-black text-sm tracking-wide">Campus Mess & Dining Console</h3>
              <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">
                Sharda University Central Dining Facility
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-xl text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-slate-100 dark:bg-slate-800/60 p-2 px-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 shrink-0 text-xs font-extrabold">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-4 py-1.5 rounded-xl transition-all ${
                activeTab === 'menu' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Weekly Timetable
            </button>
            <button
              onClick={() => setActiveTab('feedback')}
              className={`px-4 py-1.5 rounded-xl transition-all ${
                activeTab === 'feedback' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Food Ratings & Reviews ({feedbacks.length})
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-amber-600 dark:text-amber-400 font-extrabold bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-xl border border-amber-200/60">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{avgRating} / 5.0 Quality Index</span>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 dark:text-slate-300">
          
          {/* TAB 1: WEEKLY MENU */}
          {activeTab === 'menu' && (
            <div className="space-y-4">
              {/* Day Selector Pills */}
              <div className="flex flex-wrap gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs ${
                      selectedDay === day
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              {/* Day Schedule Cards */}
              <div className="grid sm:grid-cols-2 gap-3.5">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-blue-600 dark:text-blue-400">☕ Breakfast</span>
                    <span className="text-[10px] text-slate-400">07:30 - 09:30 AM</span>
                  </div>
                  <p className="font-medium text-slate-800 dark:text-slate-200 text-xs leading-relaxed">
                    {currentDayMenu.breakfast}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-blue-600 dark:text-blue-400">🍛 Lunch</span>
                    <span className="text-[10px] text-slate-400">12:30 - 02:30 PM</span>
                  </div>
                  <p className="font-medium text-slate-800 dark:text-slate-200 text-xs leading-relaxed">
                    {currentDayMenu.lunch}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-blue-600 dark:text-blue-400">🥪 Evening Snacks</span>
                    <span className="text-[10px] text-slate-400">05:00 - 06:00 PM</span>
                  </div>
                  <p className="font-medium text-slate-800 dark:text-slate-200 text-xs leading-relaxed">
                    {currentDayMenu.snacks}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-blue-600 dark:text-blue-400">🍲 Special Dinner</span>
                    <span className="text-[10px] text-slate-400">08:00 - 09:30 PM</span>
                  </div>
                  <p className="font-medium text-slate-800 dark:text-slate-200 text-xs leading-relaxed">
                    {currentDayMenu.dinner}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTab('feedback')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Star className="w-4 h-4 fill-amber-300 text-amber-300" /> Rate Today's Food Quality
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: FOOD RATINGS & FEEDBACK */}
          {activeTab === 'feedback' && (
            <div className="space-y-6">
              
              {/* Review Submission Form */}
              <form onSubmit={handleSubmitFeedback} className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">Submit Daily Meal Feedback</h4>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 font-bold mb-1">Meal Eaten</label>
                    <select
                      value={mealType}
                      onChange={(e) => setMealType(e.target.value)}
                      className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-bold dark:text-white"
                    >
                      <option value="Breakfast">Breakfast</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Snacks">Evening Snacks</option>
                      <option value="Dinner">Dinner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 font-bold mb-1">Star Rating (1 - 5)</label>
                    <div className="flex items-center gap-1.5 pt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star 
                            className={`w-5 h-5 ${
                              star <= rating 
                                ? 'fill-amber-400 text-amber-400' 
                                : 'text-slate-300 dark:text-slate-600'
                            }`} 
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
                        {rating} / 5
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 font-bold mb-1">Comments / Suggestions</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="e.g. Rice was well-cooked, dal seasoning was good..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-medium dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Submitting...' : 'Post Dining Review'}</span>
                  </button>
                </div>
              </form>

              {/* Feedbacks List */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">Recent Dining Reviews</h4>
                <div className="space-y-2.5 max-h-60 overflow-y-auto">
                  {feedbacks.map((f, i) => (
                    <div key={f._id || i} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">{f.studentName}</span>
                          <span className="text-[10px] bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-extrabold px-2 py-0.5 rounded">
                            {f.mealType}
                          </span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star 
                              key={idx} 
                              className={`w-3 h-3 ${
                                idx < f.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px] font-medium">{f.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
