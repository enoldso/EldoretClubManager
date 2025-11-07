import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Banknote, Check, ChevronDown, ChevronUp, Clock, CreditCard, DollarSign, Download, Edit, Eye, EyeOff, FileText, Globe, Lock, Mail, MapPin, MoreHorizontal, Phone, Plus, Save, Settings, Trash2, Upload, User, Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Dummy data
const clubInfo = {
  name: "Eldoret Golf Club",
  email: "info@eldoretgolfclub.com",
  phone: "+254 712 345 678",
  address: "Eldoret-Nairobi Highway, Eldoret, Kenya",
  logo: "/logo.png",
  description: "Premier golfing destination in the North Rift region, offering world-class facilities and breathtaking views of the Cherangani Hills.",
  timezone: "Africa/Nairobi",
  currency: "KES",
  dateFormat: "DD/MM/YYYY",
  timeFormat: "24h"
};

const businessHours = [
  { day: "Monday", open: "06:00", close: "18:00", isOpen: true },
  { day: "Tuesday", open: "06:00", close: "18:00", isOpen: true },
  { day: "Wednesday", open: "06:00", close: "18:00", isOpen: true },
  { day: "Thursday", open: "06:00", close: "18:00", isOpen: true },
  { day: "Friday", open: "06:00", close: "20:00", isOpen: true },
  { day: "Saturday", open: "07:00", close: "20:00", isOpen: true },
  { day: "Sunday", open: "07:00", close: "18:00", isOpen: true },
];

const notificationSettings = {
  emailNotifications: {
    newBooking: true,
    paymentReceived: true,
    bookingReminder: true,
    specialOffers: false,
    newsletter: true,
  },
  pushNotifications: {
    bookingConfirmation: true,
    paymentReminder: true,
    eventUpdates: true,
    maintenanceAlerts: true,
  },
  smsNotifications: {
    bookingConfirmation: true,
    paymentConfirmation: false,
    urgentAlerts: true,
  },
};

const paymentMethods = [
  { id: 1, type: "mpesa", name: "M-Pesa", isActive: true, credentials: { tillNumber: "123456" } },
  { id: 2, type: "card", name: "Credit/Debit Card", isActive: true, credentials: { processor: "Stripe" } },
  { id: 3, type: "bank", name: "Bank Transfer", isActive: true, credentials: { accountName: "Eldoret Golf Club", accountNumber: "1234567890", bankName: "KCB Bank", branch: "Eldoret" } },
  { id: 4, type: "cash", name: "Cash", isActive: true, credentials: {} },
];

const taxRates = [
  { id: 1, name: "VAT", rate: 16, isActive: true, appliesTo: ["green_fees", "pro_shop", "food_beverage"] },
  { id: 2, name: "Tourism Levy", rate: 2, isActive: true, appliesTo: ["green_fees", "accommodation"] },
];

const userRoles = [
  { id: 1, name: "Administrator", description: "Full access to all settings and features", permissions: ["all"] },
  { id: 2, name: "Manager", description: "Can manage bookings, members, and view reports", permissions: ["bookings", "members", "reports"] },
  { id: 3, name: "Pro Shop Staff", description: "Can process sales and manage inventory", permissions: ["pro_shop"] },
  { id: 4, name: "Caddie Master", description: "Can manage caddies and tee times", permissions: ["caddies", "tee_times"] },
];

const apiKeys = [
  { id: 1, name: "Website Integration", key: "sk_test_1234567890abcdef", lastUsed: "2023-11-07T10:30:00Z", created: "2023-10-15T09:15:00Z" },
  { id: 2, name: "Mobile App", key: "sk_test_abcdef1234567890", lastUsed: "2023-11-05T14:20:00Z", created: "2023-09-20T11:45:00Z" },
];

const SettingsManagement = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(clubInfo);
  const [hours, setHours] = useState(businessHours);
  const [notifications, setNotifications] = useState(notificationSettings);
  const [payments, setPayments] = useState(paymentMethods);
  const [taxes, setTaxes] = useState(taxRates);
  const [roles, setRoles] = useState(userRoles);
  const [apiKeysList, setApiKeys] = useState(apiKeys);
  const [showApiKey, setShowApiKey] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHoursChange = (index: number, field: string, value: string | boolean) => {
    const updatedHours = [...hours];
    updatedHours[index] = {
      ...updatedHours[index],
      [field]: field === 'isOpen' ? !updatedHours[index].isOpen : value
    };
    setHours(updatedHours);
  };

  const handleNotificationChange = (type: string, key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [type]: {
        ...prev[type as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const generateApiKey = () => {
    const newKey = {
      id: apiKeysList.length + 1,
      name: `API Key ${apiKeysList.length + 1}`,
      key: `sk_${Math.random().toString(36).substring(2, 28)}`,
      lastUsed: "Never",
      created: new Date().toISOString()
    };
    setApiKeys([...apiKeysList, newKey]);
  };

  const revokeApiKey = (id: number) => {
    setApiKeys(apiKeysList.filter(key => key.id !== id));
  };

  const saveSettings = () => {
    // In a real app, this would save to your backend
    console.log('Saving settings:', { formData, hours, notifications, payments, taxes, roles });
    setIsEditing(false);
    // Show success message
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your club's settings and preferences
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="general">
            <Settings className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="business-hours">
            <Clock className="mr-2 h-4 w-4" />
            Business Hours
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Mail className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="payments">
            <CreditCard className="mr-2 h-4 w-4" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="taxes">
            <DollarSign className="mr-2 h-4 w-4" />
            Taxes
          </TabsTrigger>
          <TabsTrigger value="api">
            <Globe className="mr-2 h-4 w-4" />
            API
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Club Information</CardTitle>
              <CardDescription>Update your club's basic information and contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                <div className="flex-shrink-0">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={formData.logo} alt={formData.name} />
                    <AvatarFallback>{formData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 w-full space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Club Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Contact Email</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                          <Mail className="h-4 w-4" />
                        </span>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                          <Phone className="h-4 w-4" />
                        </span>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select 
                        value={formData.timezone} 
                        onValueChange={(value) => setFormData({...formData, timezone: value})}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Africa/Nairobi">Nairobi (GMT+3)</SelectItem>
                          <SelectItem value="Africa/Dar_es_Salaam">Dar es Salaam (GMT+3)</SelectItem>
                          <SelectItem value="Africa/Kampala">Kampala (GMT+3)</SelectItem>
                          <SelectItem value="Africa/Addis_Ababa">Addis Ababa (GMT+3)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => {
                    setFormData(clubInfo);
                    setIsEditing(false);
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={saveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Information
                </Button>
              )}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Settings</CardTitle>
              <CardDescription>Configure date, time, and currency formats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select value={formData.currency} disabled={!isEditing}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="KES">Kenyan Shilling (KES)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select value={formData.dateFormat} disabled={!isEditing}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Time Format</Label>
                  <Select value={formData.timeFormat} disabled={!isEditing}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour (2:30 PM)</SelectItem>
                      <SelectItem value="24h">24-hour (14:30)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business-hours" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>Set your club's operating hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hours.map((day, index) => (
                  <div key={day.day} className="flex items-center space-x-4">
                    <div className="w-32 font-medium">{day.day}</div>
                    <div className="flex items-center space-x-2">
                      <Input 
                        type="time" 
                        value={day.open} 
                        onChange={(e) => handleHoursChange(index, 'open', e.target.value)}
                        className="w-28"
                        disabled={!isEditing}
                      />
                      <span>to</span>
                      <Input 
                        type="time" 
                        value={day.close} 
                        onChange={(e) => handleHoursChange(index, 'close', e.target.value)}
                        className="w-28"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id={`open-${index}`} 
                          checked={day.isOpen}
                          onCheckedChange={() => handleHoursChange(index, 'isOpen', !day.isOpen)}
                          disabled={!isEditing}
                        />
                        <Label htmlFor={`open-${index}`} className={day.isOpen ? 'text-green-600' : 'text-destructive'}>
                          {day.isOpen ? 'Open' : 'Closed'}
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => {
                    setHours(businessHours);
                    setIsEditing(false);
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    console.log('Saving hours:', hours);
                    setIsEditing(false);
                  }}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Hours
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Hours
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure which email notifications to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Booking Notifications</h3>
                <div className="space-y-4">
                  {Object.entries(notifications.emailNotifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <Label htmlFor={`email-${key}`} className="font-normal">
                        {key.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
                      </Label>
                      <Switch 
                        id={`email-${key}`}
                        checked={value as boolean}
                        onCheckedChange={(checked) => handleNotificationChange('emailNotifications', key, checked)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Push Notifications</h3>
                <div className="space-y-4">
                  {Object.entries(notifications.pushNotifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <Label htmlFor={`push-${key}`} className="font-normal">
                        {key.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
                      </Label>
                      <Switch 
                        id={`push-${key}`}
                        checked={value as boolean}
                        onCheckedChange={(checked) => handleNotificationChange('pushNotifications', key, checked)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">SMS Notifications</h3>
                <div className="space-y-4">
                  {Object.entries(notifications.smsNotifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <Label htmlFor={`sms-${key}`} className="font-normal">
                        {key.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
                      </Label>
                      <Switch 
                        id={`sms-${key}`}
                        checked={value as boolean}
                        onCheckedChange={(checked) => handleNotificationChange('smsNotifications', key, checked)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage accepted payment methods</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-md bg-muted">
                        {method.type === 'mpesa' && <Phone className="h-6 w-6" />}
                        {method.type === 'card' && <CreditCard className="h-6 w-6" />}
                        {method.type === 'bank' && <Banknote className="h-6 w-6" />}
                        {method.type === 'cash' && <DollarSign className="h-6 w-6" />}
                      </div>
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {method.type === 'mpesa' && `TILL: ${method.credentials.tillNumber}`}
                          {method.type === 'card' && `Processed by ${method.credentials.processor}`}
                          {method.type === 'bank' && `${method.credentials.bankName} - ${method.credentials.accountNumber}`}
                          {method.type === 'cash' && 'Pay in person at the club'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch checked={method.isActive} />
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="taxes" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Tax Rates</CardTitle>
                  <CardDescription>Manage tax rates and rules</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Tax Rate
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Applies To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxes.map((tax) => (
                    <TableRow key={tax.id}>
                      <TableCell className="font-medium">{tax.name}</TableCell>
                      <TableCell>{tax.rate}%</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {tax.appliesTo.map((item) => (
                            <Badge key={item} variant="outline" className="text-xs">
                              {item.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={tax.isActive ? 'default' : 'outline'} className={tax.isActive ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}>
                          {tax.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage your API keys for system integration</CardDescription>
                </div>
                <Button onClick={generateApiKey}>
                  <Plus className="mr-2 h-4 w-4" />
                  Generate New Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>API Key</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeysList.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell className="font-medium">{key.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                            {showApiKey === key.id ? key.key : '••••••••••••••••••••••••'}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 ml-1"
                            onClick={() => setShowApiKey(showApiKey === key.id ? null : key.id)}
                          >
                            {showApiKey === key.id ? (
                              <EyeOff className="h-3.5 w-3.5" />
                            ) : (
                              <Eye className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{key.lastUsed === 'Never' ? 'Never' : new Date(key.lastUsed).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(key.created).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => revokeApiKey(key.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-2">
              <div className="text-sm text-muted-foreground">
                <p className="font-medium">API Documentation</p>
                <p>View our API documentation for integration details and examples.</p>
              </div>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                View API Documentation
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsManagement;
