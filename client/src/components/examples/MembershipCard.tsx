import MembershipCard from '../MembershipCard';

export default function MembershipCardExample() {
  const memberData = {
    name: "John Doe",
    memberId: "EC2024-1247",
    memberSince: "Jan 2020",
    membershipType: "Individual" as const,
    status: "Active" as const,
    expiryDate: "Dec 31, 2025",
    handicap: 12
  };

  return (
    <div className="p-6 max-w-md">
      <MembershipCard member={memberData} onRenew={() => console.log('Renew membership')} />
    </div>
  );
}
