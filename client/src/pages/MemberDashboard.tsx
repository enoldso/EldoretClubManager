import React from 'react';
import { useLocation } from 'wouter';
import { Calendar, User, Bell, Clock, MapPin, Users, CreditCard, Star, X, RefreshCw, Plus, ClipboardCheck, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import MemberChatbot from '@/components/MemberChatbot';
import { toast } from 'react-hot-toast';

type Booking = {
  id: number;
  type: 'golf' | 'dining' | 'event' | 'lesson' | 'tournament';
  title: string;
  date: string;
  time: string;
  location: string;
  guests: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  handicap?: number;
  course?: string;
  holes?: 9 | 18;
  cartIncluded?: boolean;
  instructor?: string;
  format?: string;
};

const MemberDashboard: React.FC = () => {
  const [_, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState<Record<number, boolean>>({});
  const [showCancelModal, setShowCancelModal] = useState<number | null>(null);
  
  // Dummy data
  const memberStats = {
    loyaltyPoints: 1250,
    memberSince: '2023-01-15',
    membershipLevel: 'Gold',
    handicap: 12.4,
    roundsPlayed: 24,
    averageScore: 84,
    favoriteCourse: 'Championship Course',
    upcomingBookings: 4,
    totalSpent: 3250,
  };

  const upcomingBookings: Booking[] = [
    {
      id: 1,
      type: 'golf',
      title: 'Weekend Round',
      date: '2025-11-13',
      time: '08:30',
      location: 'Championship Course',
      course: 'Championship Course',
      guests: 3,
      status: 'confirmed',
      handicap: 12.4,
      holes: 18,
      cartIncluded: true
    },
    {
      id: 2,
      type: 'lesson',
      title: 'Golf Lesson',
      date: '2025-11-14',
      time: '15:00',
      location: 'Driving Range',
      guests: 1,
      status: 'confirmed',
      instructor: 'Pro James Wilson'
    },
    {
      id: 3,
      type: 'tournament',
      title: 'Member-Guest Tournament',
      date: '2025-11-17',
      time: '07:00',
      location: 'Championship Course',
      course: 'Championship Course',
      guests: 1,
      status: 'confirmed',
      handicap: 12.4,
      format: 'Best Ball'
    },
    {
      id: 4,
      type: 'dining',
      title: 'Post-Game Dinner',
      date: '2025-11-17',
      time: '19:00',
      location: 'Clubhouse Restaurant',
      guests: 4,
      status: 'confirmed'
    }
  ];

  const recentActivity = [
    { 
      id: 1, 
      type: 'golf', 
      description: 'Completed Round', 
      date: '2025-11-10', 
      details: 'Championship Course - Score: 82',
      points: 100 
    },
    { 
      id: 2, 
      type: 'achievement', 
      description: 'New Personal Best', 
      date: '2025-11-08', 
      details: 'Broke 80 for the first time! (79)' 
    },
    { 
      id: 3, 
      type: 'handicap', 
      description: 'Handicap Update', 
      date: '2025-11-07', 
      details: 'Improved from 13.2 to 12.4' 
    },
    { 
      id: 4, 
      type: 'shop', 
      description: 'Pro Shop Purchase', 
      date: '2025-11-05', 
      amount: 249.99,
      item: 'New Driver' 
    },
  ];

  // Function to handle booking actions
  const handleBookingAction = async (bookingId: number, action: 'cancel' | 'reschedule' | 'view' | 'addToCalendar') => {
    try {
      setIsLoading(prev => ({ ...prev, [bookingId]: true }));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      switch (action) {
        case 'cancel':
          toast.success('Booking cancelled successfully');
          // In a real app, you would update the bookings list here
          break;
        case 'reschedule':
          navigate(`/book-tee-time?reschedule=${bookingId}`);
          break;
        case 'view':
          navigate(`/my-bookings/${bookingId}`);
          break;
        case 'addToCalendar':
          const booking = upcomingBookings.find(b => b.id === bookingId);
          if (booking) {
            const startDate = new Date(`${booking.date}T${booking.time}`);
            const endDate = new Date(startDate);
            endDate.setHours(endDate.getHours() + 2); // 2 hour event
            
            const calendarEvent = {
              title: booking.title,
              description: `Location: ${booking.location}\nType: ${booking.type}`,
              location: booking.location,
              start: startDate.toISOString(),
              end: endDate.toISOString(),
            };
            
            // Create .ics file for download
            const icsContent = [
              'BEGIN:VCALENDAR',
              'VERSION:2.0',
              'BEGIN:VEVENT',
              `DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
              `DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
              `SUMMARY:${booking.title}`,
              `DESCRIPTION:${booking.type} at ${booking.location}`,
              `LOCATION:${booking.location}`,
              'END:VEVENT',
              'END:VCALENDAR'
            ].join('\n');
            
            const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `event-${booking.id}.ics`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            toast.success('Added to calendar');
          }
          break;
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(prev => ({ ...prev, [bookingId]: false }));
      setShowCancelModal(null);
    }
  };

  const quickActions = [
    { 
      id: 1, 
      title: 'Tee Time Scoring', 
      icon: <ClipboardCheck size={20} />,
      onClick: () => navigate('/tee-time-scoring')
    },
    { 
      id: 2, 
      title: 'Book Tee Time', 
      icon: <Calendar size={20} />, 
      onClick: () => navigate('/book-tee-time') 
    },
    { 
      id: 2, 
      title: 'Golf Lessons', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
           </svg>, 
      onClick: () => navigate('/lessons') 
    },
    { 
      id: 3, 
      title: 'Tournaments', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
           </svg>,
      onClick: () => navigate('/tournaments') 
    },
    { 
      id: 4, 
      title: 'My Handicap', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
           </svg>, 
      onClick: () => navigate('/handicap') 
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string, type?: string) => {
    const statusClasses = {
      confirmed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };

    const typeIcons = {
      golf: '⛳',
      lesson: '🏌️',
      tournament: '🏆',
      dining: '🍽️',
      event: '🎉'
    };
    
    return (
      <div className="flex items-center space-x-1">
        {type && (
          <span className="text-sm" title={type}>
            {typeIcons[type as keyof typeof typeIcons] || '📅'}
          </span>
        )}
        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusClasses[status as keyof typeof statusClasses]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    );
  };

  const renderBookingDetails = (booking: Booking) => {
    switch(booking.type) {
      case 'golf':
        return (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{booking.course} • {booking.holes} holes</span>
            </div>
            {booking.cartIncluded && (
              <div className="flex items-center mt-1">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded dark:bg-blue-900/30 dark:text-blue-300">
                  🚗 Cart Included
                </span>
              </div>
            )}
          </div>
        );
      case 'lesson':
        return (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span>With: {booking.instructor}</span>
            </div>
          </div>
        );
      case 'tournament':
        return (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Format: {booking.format}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Hero Section with Image */}
      <div className="relative rounded-xl overflow-hidden mb-6 h-64 md:h-80">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10 flex items-center">
          <div className="px-8 md:px-12 max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">Welcome to Eldoret Golf Club</h1>
            <p className="text-gray-200 text-lg">Experience world-class golfing in the heart of Kenya</p>
          </div>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1597865992644-549ae818bd01?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGdvbGZ8ZW58MHwwfDB8fHwy&auto=format&fit=crop&q=60&w=500" 
          alt="Golf course at sunset"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Welcome back, John! 👋</h1>
          <p className="text-gray-600 dark:text-gray-300">Perfect day for golf! ⛅ 22°C | 72°F</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg">
            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <div>
              <p className="text-xs text-green-600 dark:text-green-400">Handicap</p>
              <p className="text-sm font-medium text-green-800 dark:text-green-200">{memberStats.handicap}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg">
            <Star className="text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-xs text-blue-600 dark:text-blue-400">Loyalty Points</p>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">{memberStats.loyaltyPoints}</p>
            </div>
            <span className="text-sm text-blue-600 dark:text-blue-400">• {memberStats.membershipLevel}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-gray-700"
          >
            <div className="p-2 mb-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
              {action.icon}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{action.title}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Bookings */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Bookings</h2>
            <button 
              onClick={() => navigate('/my-bookings')}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors px-3 py-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-800/30 rounded-md"
            >
              View All Bookings
            </button>
          </div>
          
          <div className="space-y-3">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border-l-4 border-blue-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{booking.title}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDate(booking.date)} • {booking.time}</span>
                    </div>
                    <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{booking.location}</span>
                      <span className="mx-2">•</span>
                      <Users className="w-4 h-4 mr-1" />
                      <span>{booking.guests} {booking.guests === 1 ? 'person' : 'people'}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                {getStatusBadge(booking.status, booking.type)}
                {renderBookingDetails(booking)}
                <div className="flex space-x-2 mt-2">
                  <button 
                    onClick={() => handleBookingAction(booking.id, 'view')}
                    className="text-xs px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md transition-colors dark:bg-blue-900/30 dark:hover:bg-blue-800/50 dark:text-blue-300"
                    disabled={isLoading[booking.id]}
                  >
                    {isLoading[booking.id] ? 'Loading...' : 'View'}
                  </button>
                  <button 
                    onClick={() => handleBookingAction(booking.id, 'addToCalendar')}
                    className="text-xs p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                    title="Add to Calendar"
                    disabled={isLoading[booking.id]}
                  >
                    <Plus size={16} />
                  </button>
                  <button 
                    onClick={() => handleBookingAction(booking.id, 'reschedule')}
                    className="text-xs p-1 text-gray-500 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400"
                    title="Reschedule"
                    disabled={isLoading[booking.id]}
                  >
                    <RefreshCw size={16} />
                  </button>
                  <button 
                    onClick={() => setShowCancelModal(booking.id)}
                    className="text-xs p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                    title="Cancel Booking"
                    disabled={isLoading[booking.id]}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              
              {/* Cancel Booking Modal */}
              {showCancelModal === booking.id && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">Cancel Booking</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Are you sure you want to cancel this booking? This action cannot be undone.
                    </p>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setShowCancelModal(null)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        disabled={isLoading[booking.id]}
                      >
                        No, Keep It
                      </button>
                      <button
                        onClick={() => handleBookingAction(booking.id, 'cancel')}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
                        disabled={isLoading[booking.id]}
                      >
                        {isLoading[booking.id] ? 'Cancelling...' : 'Yes, Cancel'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <ul className="space-y-4">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="flex items-start pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0 last:mb-0">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    {activity.type === 'points' && <Star className="w-4 h-4" />}
                    {activity.type === 'booking' && <Calendar className="w-4 h-4" />}
                    {activity.type === 'payment' && <CreditCard className="w-4 h-4" />}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(activity.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                      {activity.type === 'points' && ` • ${activity.points} points`}
                      {activity.type === 'payment' && ` • $${activity.amount}`}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Add Chatbot */}
      <MemberChatbot />
    </div>
  );
};

export default MemberDashboard;
