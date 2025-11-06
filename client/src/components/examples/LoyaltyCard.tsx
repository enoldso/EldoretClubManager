import LoyaltyCard from '../LoyaltyCard';

export default function LoyaltyCardExample() {
  const loyaltyData = {
    currentPoints: 12450,
    tier: "Gold" as const,
    nextTier: "Platinum",
    pointsToNextTier: 7550,
    lifetimePoints: 45820
  };

  return (
    <div className="p-6 max-w-md">
      <LoyaltyCard data={loyaltyData} />
    </div>
  );
}
