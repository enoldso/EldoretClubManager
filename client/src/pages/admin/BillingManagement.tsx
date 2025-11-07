import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, MoreHorizontal, Download, FileText, Mail, Calendar, DollarSign, CreditCard, CheckCircle, XCircle, AlertCircle, Clock, ArrowUpDown, ChevronDown, ChevronUp, ArrowRight, ArrowLeft, User, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'refunded' | 'failed';
type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'void';
type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'unpaid' | 'trialing';
type TransactionType = 'charge' | 'refund' | 'adjustment' | 'payout';

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  amount: number;
  tax: number;
  total: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  items: {
    description: string;
    amount: number;
    quantity: number;
  }[];
  notes?: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  joinDate: string;
  totalSpent: number;
  lastPurchase: string;
  status: 'active' | 'inactive' | 'delinquent';
  avatar?: string;
  membershipType?: string;
  membershipExpiry?: string;
  paymentMethod?: {
    type: string;
    last4: string;
    expiry: string;
  };
}

interface Transaction {
  id: string;
  date: string;
  customer: {
    id: string;
    name: string;
  };
  type: TransactionType;
  amount: number;
  status: PaymentStatus;
  invoiceNumber?: string;
  paymentMethod: string;
  reference: string;
}

interface Subscription {
  id: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  plan: string;
  amount: number;
  interval: 'month' | 'year';
  status: SubscriptionStatus;
  startDate: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  paymentMethod: string;
  nextBillingDate: string;
  trialEnd?: string;
}

const BillingManagement = () => {
  // Dummy data for invoices
  const invoices: Invoice[] = [
    {
      id: 'INV-2023-001',
      invoiceNumber: 'INV-2023-001',
      customer: {
        id: 'CUST-001',
        name: 'John Mwangi',
        email: 'john.mwangi@example.com',
        avatar: '/avatars/john-mwangi.jpg',
      },
      amount: 25000,
      tax: 3750,
      total: 28750,
      status: 'paid',
      issueDate: '2023-11-01',
      dueDate: '2023-11-15',
      paidDate: '2023-11-10',
      items: [
        { description: 'Monthly Membership Fee - Gold', amount: 20000, quantity: 1 },
        { description: 'Locker Rental', amount: 2000, quantity: 2 },
        { description: 'Golf Cart Rental', amount: 500, quantity: 2 },
      ],
      notes: 'Thank you for your business!',
    },
    {
      id: 'INV-2023-002',
      invoiceNumber: 'INV-2023-002',
      customer: {
        id: 'CUST-002',
        name: 'Sarah Ochieng',
        email: 'sarah.ochieng@example.com',
        avatar: '/avatars/sarah-ochieng.jpg',
      },
      amount: 35000,
      tax: 5250,
      total: 40250,
      status: 'overdue',
      issueDate: '2023-11-01',
      dueDate: '2023-11-15',
      items: [
        { description: 'Monthly Membership Fee - Platinum', amount: 30000, quantity: 1 },
        { description: 'Golf Lessons (4 sessions)', amount: 5000, quantity: 1 },
      ],
    },
    {
      id: 'INV-2023-003',
      invoiceNumber: 'INV-2023-003',
      customer: {
        id: 'CUST-003',
        name: 'David Kamau',
        email: 'david.kamau@example.com',
        avatar: '/avatars/david-kamau.jpg',
      },
      amount: 15000,
      tax: 2250,
      total: 17250,
      status: 'sent',
      issueDate: '2023-11-05',
      dueDate: '2023-11-20',
      items: [
        { description: 'Monthly Membership Fee - Silver', amount: 15000, quantity: 1 },
      ],
    },
    {
      id: 'INV-2023-004',
      invoiceNumber: 'INV-2023-004',
      customer: {
        id: 'CUST-004',
        name: 'Grace Wambui',
        email: 'grace.wambui@example.com',
        avatar: '/avatars/grace-wambui.jpg',
      },
      amount: 45000,
      tax: 6750,
      total: 51750,
      status: 'draft',
      issueDate: '2023-11-07',
      dueDate: '2023-11-22',
      items: [
        { description: 'Annual Membership Fee - Platinum', amount: 300000, quantity: 1 },
        { description: 'Locker Rental (Annual)', amount: 20000, quantity: 1 },
      ],
    },
  ];

  // Dummy data for customers
  const customers: Customer[] = [
    {
      id: 'CUST-001',
      name: 'John Mwangi',
      email: 'john.mwangi@example.com',
      phone: '+254712345678',
      joinDate: '2022-01-15',
      totalSpent: 345000,
      lastPurchase: '2023-11-10',
      status: 'active',
      avatar: '/avatars/john-mwangi.jpg',
      membershipType: 'Gold',
      membershipExpiry: '2024-12-31',
      paymentMethod: {
        type: 'visa',
        last4: '4242',
        expiry: '12/25',
      },
    },
    {
      id: 'CUST-002',
      name: 'Sarah Ochieng',
      email: 'sarah.ochieng@example.com',
      phone: '+254723456789',
      joinDate: '2022-03-22',
      totalSpent: 278500,
      lastPurchase: '2023-10-15',
      status: 'delinquent',
      avatar: '/avatars/sarah-ochieng.jpg',
      membershipType: 'Platinum',
      membershipExpiry: '2023-12-31',
      paymentMethod: {
        type: 'mastercard',
        last4: '5555',
        expiry: '10/24',
      },
    },
    {
      id: 'CUST-003',
      name: 'David Kamau',
      email: 'david.kamau@example.com',
      phone: '+254734567890',
      joinDate: '2023-06-10',
      totalSpent: 120000,
      lastPurchase: '2023-11-05',
      status: 'active',
      avatar: '/avatars/david-kamau.jpg',
      membershipType: 'Silver',
      membershipExpiry: '2023-12-31',
      paymentMethod: {
        type: 'visa',
        last4: '1881',
        expiry: '05/26',
      },
    },
    {
      id: 'CUST-004',
      name: 'Grace Wambui',
      email: 'grace.wambui@example.com',
      phone: '+254745678901',
      joinDate: '2021-11-30',
      totalSpent: 1250000,
      lastPurchase: '2023-11-08',
      status: 'active',
      avatar: '/avatars/grace-wambui.jpg',
      membershipType: 'Platinum',
      membershipExpiry: '2024-12-31',
      paymentMethod: {
        type: 'amex',
        last4: '1005',
        expiry: '09/25',
      },
    },
  ];

  // Dummy data for transactions
  const transactions: Transaction[] = [
    {
      id: 'TXN-2023-001',
      date: '2023-11-10T09:30:00Z',
      customer: {
        id: 'CUST-001',
        name: 'John Mwangi',
      },
      type: 'charge',
      amount: 28750,
      status: 'paid',
      invoiceNumber: 'INV-2023-001',
      paymentMethod: 'Visa ending in 4242',
      reference: 'ch_3NlXa2KZv3mJgV0L1rXv6e4f',
    },
    {
      id: 'TXN-2023-002',
      date: '2023-10-15T14:22:10Z',
      customer: {
        id: 'CUST-002',
        name: 'Sarah Ochieng',
      },
      type: 'charge',
      amount: 40250,
      status: 'failed',
      invoiceNumber: 'INV-2023-002',
      paymentMethod: 'Mastercard ending in 5555',
      reference: 'ch_3NlXb2KZv3mJgV0L0rXv6e4f',
    },
    {
      id: 'TXN-2023-003',
      date: '2023-10-10T11:05:30Z',
      customer: {
        id: 'CUST-001',
        name: 'John Mwangi',
      },
      type: 'refund',
      amount: 5000,
      status: 'refunded',
      invoiceNumber: 'INV-2023-001',
      paymentMethod: 'Visa ending in 4242',
      reference: 're_3NlXc2KZv3mJgV0L1rXv6e4f',
    },
    {
      id: 'TXN-2023-004',
      date: '2023-11-05T16:45:22Z',
      customer: {
        id: 'CUST-003',
        name: 'David Kamau',
      },
      type: 'charge',
      amount: 17250,
      status: 'pending',
      invoiceNumber: 'INV-2023-003',
      paymentMethod: 'Visa ending in 1881',
      reference: 'ch_3NlXd2KZv3mJgV0L2rXv6e4f',
    },
  ];

  // Dummy data for subscriptions
  const subscriptions: Subscription[] = [
    {
      id: 'sub_9sKX2KZv3mJgV0L1rXv6e4f',
      customer: {
        id: 'CUST-001',
        name: 'John Mwangi',
        email: 'john.mwangi@example.com',
      },
      plan: 'Gold Membership',
      amount: 20000,
      interval: 'month',
      status: 'active',
      startDate: '2023-01-15',
      currentPeriodStart: '2023-11-01',
      currentPeriodEnd: '2023-12-01',
      cancelAtPeriodEnd: false,
      paymentMethod: 'Visa ending in 4242',
      nextBillingDate: '2023-12-01',
    },
    {
      id: 'sub_9sKX3KZv3mJgV0L1rXv6e4g',
      customer: {
        id: 'CUST-002',
        name: 'Sarah Ochieng',
        email: 'sarah.ochieng@example.com',
      },
      plan: 'Platinum Membership',
      amount: 30000,
      interval: 'month',
      status: 'past_due',
      startDate: '2022-03-22',
      currentPeriodStart: '2023-10-22',
      currentPeriodEnd: '2023-11-22',
      cancelAtPeriodEnd: false,
      paymentMethod: 'Mastercard ending in 5555',
      nextBillingDate: '2023-11-22',
    },
    {
      id: 'sub_9sKX4KZv3mJgV0L1rXv6e4h',
      customer: {
        id: 'CUST-003',
        name: 'David Kamau',
        email: 'david.kamau@example.com',
      },
      plan: 'Silver Membership',
      amount: 15000,
      interval: 'month',
      status: 'active',
      startDate: '2023-06-10',
      currentPeriodStart: '2023-11-10',
      currentPeriodEnd: '2023-12-10',
      cancelAtPeriodEnd: false,
      paymentMethod: 'Visa ending in 1881',
      nextBillingDate: '2023-12-10',
    },
    {
      id: 'sub_9sKX5KZv3mJgV0L1rXv6e4i',
      customer: {
        id: 'CUST-004',
        name: 'Grace Wambui',
        email: 'grace.wambui@example.com',
      },
      plan: 'Platinum Membership (Annual)',
      amount: 300000,
      interval: 'year',
      status: 'active',
      startDate: '2022-01-15',
      currentPeriodStart: '2023-01-15',
      currentPeriodEnd: '2024-01-15',
      cancelAtPeriodEnd: false,
      paymentMethod: 'Amex ending in 1005',
      nextBillingDate: '2024-01-15',
    },
  ];

  // Helper functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' }> = {
      paid: { label: 'Paid', variant: 'success' },
      pending: { label: 'Pending', variant: 'secondary' },
      overdue: { label: 'Overdue', variant: 'destructive' },
      refunded: { label: 'Refunded', variant: 'outline' },
      failed: { label: 'Failed', variant: 'destructive' },
      draft: { label: 'Draft', variant: 'outline' },
      sent: { label: 'Sent', variant: 'secondary' },
      active: { label: 'Active', variant: 'success' },
      canceled: { label: 'Canceled', variant: 'outline' },
      past_due: { label: 'Past Due', variant: 'destructive' },
      unpaid: { label: 'Unpaid', variant: 'destructive' },
      trialing: { label: 'Trialing', variant: 'secondary' },
      void: { label: 'Void', variant: 'outline' },
    };
    
    const { label, variant } = statusMap[status] || { label: status, variant: 'secondary' };
    // Cast to any to handle the custom 'success' variant
    return <Badge variant={variant as any} className="capitalize">{label}</Badge>;
  };

  const getPaymentMethodIcon = (method: string) => {
    const methodLower = method.toLowerCase();
    if (methodLower.includes('visa')) return 'VISA';
    if (methodLower.includes('mastercard')) return 'MC';
    if (methodLower.includes('amex')) return 'AMEX';
    if (methodLower.includes('discover')) return 'DISC';
    return 'CARD';
  };

  // Stats for the dashboard
  const stats = [
    {
      title: 'Total Revenue',
      value: formatCurrency(1250000),
      description: '+12.5% from last month',
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: 'Active Subscriptions',
      value: '3',
      description: '+2 from last month',
      icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: 'Pending Invoices',
      value: '2',
      description: 'KES 57,500 total',
      icon: <FileText className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: 'Overdue',
      value: '1',
      description: 'KES 40,250 total',
      icon: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing Management</h1>
          <p className="text-muted-foreground">
            Manage invoices, subscriptions, and customer billing
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="h-4 w-4 text-muted-foreground">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices">
            <FileText className="mr-2 h-4 w-4" />
            Invoices
          </TabsTrigger>
          <TabsTrigger value="customers">
            <User className="mr-2 h-4 w-4" />
            Customers
          </TabsTrigger>
          <TabsTrigger value="subscriptions">
            <CreditCard className="mr-2 h-4 w-4" />
            Subscriptions
          </TabsTrigger>
          <TabsTrigger value="transactions">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Transactions
          </TabsTrigger>
        </TabsList>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>
                  Manage and track all your invoices
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search invoices..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[250px]"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-10">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuCheckboxItem checked>
                      All
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Paid</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Pending</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Overdue</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                          {invoice.invoiceNumber}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="mr-2 h-6 w-6">
                            <AvatarImage src={invoice.customer.avatar} alt={invoice.customer.name} />
                            <AvatarFallback>{invoice.customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span>{invoice.customer.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>{formatDate(invoice.issueDate)}</TableCell>
                      <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(invoice.total)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-amber-600">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Customers</CardTitle>
                <CardDescription>
                  Manage your customers and their billing information
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search customers..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[250px]"
                  />
                </div>
                <Button variant="outline" className="h-10">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Member Since</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="mr-2 h-8 w-8">
                            <AvatarImage src={customer.avatar} alt={customer.name} />
                            <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-xs text-muted-foreground">{customer.phone}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{formatDate(customer.joinDate)}</TableCell>
                      <TableCell>{getStatusBadge(customer.status)}</TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(customer.totalSpent)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Invoices
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CreditCard className="mr-2 h-4 w-4" />
                              Payment Methods
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-amber-600">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Subscriptions</CardTitle>
                <CardDescription>
                  Manage recurring subscriptions and billing cycles
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search subscriptions..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[250px]"
                  />
                </div>
                <Button variant="outline" className="h-10">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Next Billing</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptions.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell>
                        <div className="font-medium">{subscription.plan}</div>
                        <div className="text-xs text-muted-foreground">
                          {subscription.interval === 'month' ? 'Monthly' : 'Yearly'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="mr-2 h-6 w-6">
                            <AvatarFallback>{subscription.customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span>{subscription.customer.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(subscription.amount)}/{subscription.interval}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{formatDate(subscription.nextBillingDate)}</span>
                          <span className="text-xs text-muted-foreground">
                            {subscription.paymentMethod}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CreditCard className="mr-2 h-4 w-4" />
                              Update Payment Method
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {subscription.status === 'active' ? (
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel Subscription
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-green-600">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Reactivate
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  View and manage payment transactions
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search transactions..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[250px]"
                  />
                </div>
                <Button variant="outline" className="h-10">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(transaction.date).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{transaction.customer.name}</div>
                        {transaction.invoiceNumber && (
                          <div className="text-xs text-muted-foreground">
                            {transaction.invoiceNumber}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                      <TableCell>
                        <div className="font-mono text-xs">
                          {transaction.reference}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(transaction.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingManagement;
