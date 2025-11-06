import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Calendar, Clock, MapPin, Users, ChevronDown, ChevronUp, Check, X, User, Plus, Minus } from 'lucide-react';

type Course = {
  id: number;
  name: string;
  holes: number[];
  price: number;
  image: string;
  description: string;
  rating: number;
  slope: number;
  par: number;
  yardage: number;
};

type TimeSlot = {
  time: string;
  available: boolean;
  price?: number;
  isHotDeal?: boolean;
};

const BookTeeTime: React.FC = () => {
  const [_, navigate] = useLocation();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedHoles, setSelectedHoles] = useState<number>(18);
  const [players, setPlayers] = useState<number>(1);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Dummy data for courses
  const courses: Course[] = [
    {
      id: 1,
      name: 'Championship Course',
      holes: [9, 18],
      price: 120,
      image: '/courses/championship.jpg',
      description: 'Our premier 18-hole championship course designed by a renowned golf architect. Features challenging water hazards and strategic bunkering.',
      rating: 4.8,
      slope: 135,
      par: 72,
      yardage: 7156
    },
    {
      id: 2,
      name: 'Valley View',
      holes: [9, 18],
      price: 95,
      image: '/courses/valley-view.jpg',
      description: 'Scenic 18-hole course with stunning valley views. Perfect for players who enjoy elevation changes and natural landscapes.',
      rating: 4.5,
      slope: 128,
      par: 71,
      yardage: 6820
    },
    {
      id: 3,
      name: 'Lakeside Nine',
      holes: [9],
      price: 65,
      image: '/courses/lakeside.jpg',
      description: 'Beautiful 9-hole course winding around natural lakes. Great for a quick round or beginners looking to improve their game.',
      rating: 4.2,
      slope: 118,
      par: 36,
      yardage: 3205
    },
  ];

  // Generate time slots (every 10 minutes from 6:00 AM to 6:00 PM)
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    let currentHour = 6;
    let currentMinute = 0;
    let isHotDeal = false;

    while (currentHour < 18 || (currentHour === 18 && currentMinute === 0)) {
      const time = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
      // Randomly mark some slots as hot deals (20% chance)
      isHotDeal = Math.random() < 0.2 && currentHour > 10 && currentHour < 16;
      
      slots.push({
        time,
        available: Math.random() > 0.3, // 70% chance of being available
        price: isHotDeal 
          ? Math.floor(selectedCourse!.price * 0.8) // 20% off for hot deals
          : selectedCourse?.price,
        isHotDeal
      });

      // Increment time by 10 minutes
      currentMinute += 10;
      if (currentMinute >= 60) {
        currentHour++;
        currentMinute = 0;
      }
    }

    return slots;
  };

  const timeSlots = selectedCourse ? generateTimeSlots() : [];
  const availableSlots = timeSlots.filter(slot => slot.available);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setShowTimeSlots(true);
  };

  const handleBookNow = () => {
    if (selectedCourse && selectedDate && selectedTime) {
      // In a real app, this would submit the booking
      alert(`Booking confirmed for ${selectedCourse.name} on ${selectedDate} at ${selectedTime}`);
      navigate('/dashboard');
    }
  };

  // Generate next 7 days for date selection
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Book a Tee Time</h1>
      
      {/* Course Selection */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">1. Select Course</h2>
        <div className="relative">
          <button
            onClick={() => setShowCourseDropdown(!showCourseDropdown)}
            className="w-full flex justify-between items-center p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            <span className="text-left">
              {selectedCourse ? (
                <span className="font-medium">{selectedCourse.name}</span>
              ) : (
                <span className="text-gray-500">Choose a course</span>
              )}
            </span>
            {showCourseDropdown ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {showCourseDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
              {courses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => {
                    setSelectedCourse(course);
                    setShowCourseDropdown(false);
                    setSelectedHoles(course.holes[0]);
                    setShowTimeSlots(false);
                  }}
                  className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{course.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {course.holes.join('/')} holes • ${course.price} • Par {course.par}
                      </p>
                    </div>
                    {selectedCourse?.id === course.id && <Check className="text-green-500" size={20} />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedCourse && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <h3 className="font-medium mb-2">{selectedCourse.name} Details</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{selectedCourse.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Rating</p>
                <p className="font-medium">{selectedCourse.rating}/5.0</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Slope</p>
                <p className="font-medium">{selectedCourse.slope}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Par</p>
                <p className="font-medium">{selectedCourse.par}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Yardage</p>
                <p className="font-medium">{selectedCourse.yardage} yds</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Holes Selection */}
      {selectedCourse && selectedCourse.holes.length > 1 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">2. Select Holes</h2>
          <div className="flex space-x-4">
            {selectedCourse.holes.map((holeCount) => (
              <button
                key={holeCount}
                onClick={() => setSelectedHoles(holeCount)}
                className={`px-6 py-3 rounded-lg border-2 ${
                  selectedHoles === holeCount
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                {holeCount} Holes
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Players */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">3. Number of Players</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setPlayers(Math.max(1, players - 1))}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            disabled={players <= 1}
          >
            <Minus size={20} />
          </button>
          <div className="flex items-center">
            <User className="mr-2 text-gray-600 dark:text-gray-300" />
            <span className="text-xl font-medium">{players} {players === 1 ? 'Player' : 'Players'}</span>
          </div>
          <button
            onClick={() => setPlayers(Math.min(4, players + 1))}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            disabled={players >= 4}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Date Selection */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">4. Select Date</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
          {dates.map((date, index) => {
            const dateStr = date.toISOString().split('T')[0];
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNum = date.getDate();
            const isSelected = selectedDate === dateStr;
            
            return (
              <button
                key={dateStr}
                onClick={() => handleDateSelect(dateStr)}
                className={`flex flex-col items-center p-3 rounded-lg border-2 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : dayName}
                </span>
                <span className="text-lg font-medium">{dayNum}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      {showTimeSlots && selectedDate && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
            5. Available Time Slots
          </h2>
          {availableSlots.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {availableSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`p-3 rounded-lg border-2 text-center ${
                    selectedTime === slot.time
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                >
                  <div className="font-medium">{slot.time}</div>
                  <div className="text-sm">
                    {slot.isHotDeal ? (
                      <span className="text-orange-500 font-medium">
                        ${slot.price} <span className="line-through text-gray-400 text-xs">${selectedCourse?.price}</span>
                      </span>
                    ) : (
                      `$${selectedCourse?.price}`
                    )}
                  </div>
                  {slot.isHotDeal && (
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full mt-1 inline-block">
                      Hot Deal
                    </span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-yellow-800 dark:text-yellow-200">
                No available time slots for this date. Please select another date.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Booking Summary */}
      {(selectedCourse && selectedDate && selectedTime) && (
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Course</span>
              <span className="font-medium">{selectedCourse.name} ({selectedHoles} holes)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Date & Time</span>
              <span className="font-medium">
                {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                {' at '}{selectedTime}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Players</span>
              <span className="font-medium">{players} {players === 1 ? 'player' : 'players'}</span>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${(selectedCourse.price * players).toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleBookNow}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Book Now
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
              You can cancel up to 24 hours before your tee time
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookTeeTime;
