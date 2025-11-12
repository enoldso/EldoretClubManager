import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MembershipType } from './AddMemberPage';

type Member = {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: MembershipType;
  joinDate: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  dateOfBirth?: string;
  upgradeRequested?: boolean;
  upgradeRequestDate?: string;
  upgradeRequestedTo?: MembershipType;
};

// Mock function to fetch member data - replace with actual API call in production
const fetchMember = async (id: string): Promise<Member> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // This is mock data - in a real app, you would fetch this from your backend
      const mockMember: Member = {
        id,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+254712345678',
        membershipType: 'Gold',
        joinDate: '2023-01-15',
        status: 'Active'
      };
      resolve(mockMember);
    }, 500);
  });
};

export default function EditMemberPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Omit<Member, 'id' | 'joinDate' | 'upgradeRequested' | 'upgradeRequestDate' | 'upgradeRequestedTo'>>({ 
    name: '',
    email: '',
    phone: '',
    membershipType: 'Full',
    status: 'Active',
    dateOfBirth: ''
  });
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [requestedUpgrade, setRequestedUpgrade] = useState<MembershipType>('Full');

  useEffect(() => {
    const loadMember = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const member = await fetchMember(id);
        // Remove id and joinDate from the member object as they're not editable
        const { id: _, joinDate: __, ...editableFields } = member;
        setFormData(editableFields);
      } catch (error) {
        console.error('Error loading member:', error);
        toast.error('Failed to load member data');
        navigate('/admin/members');
      } finally {
        setLoading(false);
      }
    };

    loadMember();
  }, [id, navigate]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;
    
    try {
      // In a real app, you would update this in your backend
      // await updateMember(id, formData);
      
      toast.success('Member updated successfully');
      navigate('/admin/members');
    } catch (error) {
      console.error('Error updating member:', error);
      toast.error('Failed to update member');
    }
  };

  const handleUpgradeRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // In a real app, you would send this to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state to reflect the upgrade request
      setFormData(prev => ({
        ...prev,
        upgradeRequested: true,
        upgradeRequestDate: new Date().toISOString(),
        upgradeRequestedTo: requestedUpgrade
      }));
      
      setShowUpgradeDialog(false);
      toast.success('Upgrade request submitted for approval');
    } catch (error) {
      console.error('Error requesting upgrade:', error);
      toast.error('Failed to submit upgrade request');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const calculateAge = (dateOfBirth: string): number => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="container mx-auto py-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Edit Member</CardTitle>
                <CardDescription>Update member details below</CardDescription>
              </div>
              <Button variant="outline" onClick={() => navigate(-1)}>Back to Members</Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+254712345678"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="membershipType">Membership Type</Label>
                    {!formData.upgradeRequested && (
                      <Button 
                        type="button" 
                        variant="link" 
                        className="h-4 p-0 text-sm"
                        onClick={() => setShowUpgradeDialog(true)}
                      >
                        Request Upgrade
                      </Button>
                    )}
                  </div>
                  <Select
                    value={formData.membershipType}
                    onValueChange={(value) => handleInputChange('membershipType', value as MembershipType)}
                    disabled={formData.upgradeRequested}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select membership type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full">Full Member</SelectItem>
                      <SelectItem value="Outskirt">Outskirt Member</SelectItem>
                      <SelectItem value="Absentee">Absentee Member (Pay Only)</SelectItem>
                      <SelectItem value="Junior" disabled={!formData.dateOfBirth || calculateAge(formData.dateOfBirth) >= 25}>
                        Junior Member (Under 25)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {formData.upgradeRequested && (
                    <p className="text-sm text-amber-600">
                      Upgrade to {formData.upgradeRequestedTo} requested on {new Date(formData.upgradeRequestDate!).toLocaleDateString()}
                    </p>
                  )}
                </div>

                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth || ''}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
                    {formData.dateOfBirth && (
                      <p className="text-sm text-muted-foreground">
                        Age: {calculateAge(formData.dateOfBirth)} years
                        {formData.membershipType === 'Junior' && calculateAge(formData.dateOfBirth) >= 25 && (
                          <span className="text-amber-600"> - Note: Member is 25 or older</span>
                        )}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => handleInputChange('status', value as Member['status'])}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      
      {/* Upgrade Request Dialog */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Membership Upgrade</DialogTitle>
            <DialogDescription>
              Select the membership type you'd like to upgrade to.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Current Membership</Label>
              <Input value={formData.membershipType} disabled />
            </div>
            
            <div className="space-y-2">
              <Label>Upgrade To</Label>
              <Select 
                value={requestedUpgrade} 
                onValueChange={(value: MembershipType) => setRequestedUpgrade(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select membership type" />
                </SelectTrigger>
                <SelectContent>
                  {['Full', 'Outskirt', 'Absentee'].filter(type => type !== formData.membershipType).map(type => (
                    <SelectItem key={type} value={type}>
                      {type} Member{type === 'Absentee' ? ' (Pay Only)' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {requestedUpgrade === 'Junior' && calculateAge(formData.dateOfBirth || '') >= 25 && (
              <div className="text-amber-600 text-sm">
                Note: Member must be under 25 years old for Junior membership.
              </div>
            )}
            
            <div className="pt-4 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleUpgradeRequest}
                disabled={requestedUpgrade === formData.membershipType || 
                         (requestedUpgrade === 'Junior' && calculateAge(formData.dateOfBirth || '') >= 25)}
              >
                Request Upgrade
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
