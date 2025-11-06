import React from 'react';

const DiningPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dining & Reservations</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200 dark:bg-gray-700">
            <img 
              src="/images/restaurant.jpg" 
              alt="Restaurant" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Main Restaurant</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Enjoy a fine dining experience with our exquisite menu prepared by our award-winning chefs.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Make Reservation
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200 dark:bg-gray-700">
            <img 
              src="/images/lounge.jpg" 
              alt="Lounge" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Members' Lounge</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Relax in our exclusive lounge area with a selection of fine wines and cocktails.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              View Menu
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Dining Hours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-200">Breakfast</h3>
            <p className="text-gray-600 dark:text-gray-400">7:00 AM - 11:00 AM</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-200">Lunch</h3>
            <p className="text-gray-600 dark:text-gray-400">12:00 PM - 3:00 PM</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-200">Dinner</h3>
            <p className="text-gray-600 dark:text-gray-400">6:00 PM - 10:00 PM</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-200">Lounge</h3>
            <p className="text-gray-600 dark:text-gray-400">11:00 AM - 11:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiningPage;
