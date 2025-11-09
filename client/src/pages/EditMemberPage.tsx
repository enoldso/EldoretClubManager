import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const [formData, setFormData] = useState<Omit<Member, 'id' | 'joinDate'>>({ 
    name: '',
    email: '',
    phone: '',
    membershipType: 'Bronze',
    status: 'Active'
  });

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
      
      // Show success message
      toast.success(
        <div>
          <h3 className="font-bold">Member Updated</h3>
          <p className="text-sm">
            {formData.name}'s details have been updated successfully.
          </p>
        </div>
      );

      // Redirect back to members list after a short delay
      setTimeout(() => {
        navigate('/admin/members');
      }, 1500);
    } catch (error) {
      console.error('Error updating member:', error);
      toast.error('Failed to update member');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
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
                  <Label htmlFor="membershipType">Membership Type</Label>
                  <Select
                    value={formData.membershipType}
                    onValueChange={(value) => handleInputChange('membershipType', value as 'Gold' | 'Silver' | 'Bronze')}
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
                    onValueChange={(value) => handleInputChange('status', value as 'Active' | 'Inactive' | 'Suspended')}
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
    </div>
  );
}
