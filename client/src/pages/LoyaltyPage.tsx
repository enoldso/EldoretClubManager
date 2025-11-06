import React from 'react';

const LoyaltyPage: React.FC = () => {
  // Sample loyalty data
  const loyaltyData = {
    points: 1250,
    level: 'Gold',
    nextLevel: 'Platinum',
    pointsToNextLevel: 250,
    benefits: [
      '10% discount on all dining',
      'Priority reservations',
      'Complimentary drink on your birthday',
      'Exclusive member events',
      'Early access to special offers'
    ],
    recentActivity: [
      { id: 1, description: 'Dinner at Main Restaurant', points: 100, date: '2025-11-05' },
      { id: 2, description: 'Lounge Access', points: 50, date: '2025-11-03' },
      { id: 3, description: 'Referral Bonus', points: 200, date: '2025-10-28' },
    ]
  };

  const progressPercentage = Math.min(100, (loyaltyData.points / (loyaltyData.points + loyaltyData.pointsToNextLevel)) * 100);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Loyalty Program</h1>
      
      {/* Loyalty Status Card */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-600 dark:to-yellow-700 rounded-lg shadow-lg text-white p-6 mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold">Welcome back, Valued Member!</h2>
            <p className="text-yellow-100">You're a {loyaltyData.level} Member</p>
          </div>
          <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
            {loyaltyData.level} Status
          </div>
        </div>
        
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span>{loyaltyData.points} Points</span>
            <span>{loyaltyData.points + loyaltyData.pointsToNextLevel} Points for {loyaltyData.nextLevel}</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-2.5">
            <div 
              className="bg-white h-2.5 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Points Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Your Points</h3>
          <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
            {loyaltyData.points.toLocaleString()}
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Available Points</p>
          <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            Redeem Points
          </button>
        </div>

        {/* Current Benefits */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Your Benefits</h3>
          <ul className="space-y-2">
            {loyaltyData.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span>View Rewards Catalog</span>
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span>Refer a Friend</span>
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span>View All Benefits</span>
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-lg">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {loyaltyData.recentActivity.length > 0 ? (
            loyaltyData.recentActivity.map((activity) => (
              <div key={activity.id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(activity.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div className="text-green-600 dark:text-green-400 font-medium">
                  +{activity.points} pts
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              No recent activity to display
            </div>
          )}
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
          <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyPage;
