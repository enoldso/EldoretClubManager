import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Member = {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: 'Gold' | 'Silver' | 'Bronze';
  joinDate: string;
  status: 'Active' | 'Inactive' | 'Suspended';
};

export default function AddMemberPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Omit<Member, 'id' | 'joinDate'>>({ 
    name: '',
    email: '',
    phone: '',
    membershipType: 'Bronze',
    status: 'Active'
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would save this to your backend
    const newMember: Member = {
      ...formData,
      id: `M${Math.floor(1000 + Math.random() * 9000)}`,
      joinDate: new Date().toISOString().split('T')[0]
    };

    // Show success message
    toast.success(
      <div>
        <h3 className="font-bold">Member Added</h3>
        <p className="text-sm">
          {formData.name} has been added as a {formData.membershipType} member.
        </p>
      </div>
    );

    // Redirect back to dashboard after a short delay
    setTimeout(() => {
      navigate('/admin');
    }, 1500);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Add New Member</CardTitle>
                <CardDescription>Enter member details below</CardDescription>
              </div>
              <Button variant="outline" onClick={() => navigate(-1)}>Back to Dashboard</Button>
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
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+254 712 345 678"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="membershipType">Membership Type</Label>
                  <Select
                    value={formData.membershipType}
                    onValueChange={(value) => handleInputChange('membershipType', value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select membership type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Gold">Gold</SelectItem>
                      <SelectItem value="Silver">Silver</SelectItem>
                      <SelectItem value="Bronze">Bronze</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleInputChange('status', value as any)}
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
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Add Member
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
