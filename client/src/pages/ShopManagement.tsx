import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, MoreHorizontal, ShoppingBag, Tag, Package, DollarSign, BarChart, ArrowUpDown, Trash2, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ProductStatus = 'in_stock' | 'low_stock' | 'out_of_stock';
type ProductCategory = 'clubs' | 'apparel' | 'accessories' | 'balls' | 'shoes' | 'gifts';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  price: number;
  cost: number;
  stock: number;
  status: ProductStatus;
  lastSold?: string;
  image?: string;
  description?: string;
}

export default function ShopManagement() {
  // Dummy data for products
  const products: Product[] = [
    {
      id: 'PROD-001',
      name: 'TaylorMade Stealth Driver',
      sku: 'TM-S-DR-001',
      category: 'clubs',
      price: 599.99,
      cost: 349.99,
      stock: 8,
      status: 'in_stock',
      lastSold: '2023-10-25',
      description: 'Carbonwood construction with 60X Carbon Twist Face for explosive ball speed.'
    },
    {
      id: 'PROD-002',
      name: 'Titleist Pro V1 Golf Balls (Dozen)',
      sku: 'TIT-PV1-DZN',
      category: 'balls',
      price: 54.99,
      cost: 32.50,
      stock: 24,
      status: 'in_stock',
      lastSold: '2023-11-05',
      description: 'The #1 ball in golf. Exceptional distance with consistent flight and very low long game spin.'
    },
    {
      id: 'PROD-003',
      name: 'Nike Dri-FIT UV Golf Polo',
      sku: 'NIKE-DF-POLO',
      category: 'apparel',
      price: 79.99,
      cost: 42.00,
      stock: 3,
      status: 'low_stock',
      lastSold: '2023-11-03',
      description: 'Moisture-wicking polo with UV protection and stretch fabric for full range of motion.'
    },
    {
      id: 'PROD-004',
      name: 'FootJoy Pro/SL Golf Shoes',
      sku: 'FJ-PRO-SL',
      category: 'shoes',
      price: 199.99,
      cost: 129.99,
      stock: 0,
      status: 'out_of_stock',
      lastSold: '2023-10-15',
      description: 'Waterproof performance golf shoes with exceptional comfort and stability.'
    },
    {
      id: 'PROD-005',
      name: 'Callaway Golf Glove (Right Hand)',
      sku: 'CALLY-GL-RH',
      category: 'accessories',
      price: 24.99,
      cost: 12.50,
      stock: 15,
      status: 'in_stock',
      lastSold: '2023-11-06',
      description: 'Premium cabretta leather glove with advanced grip pattern.'
    },
    {
      id: 'PROD-006',
      name: 'Eldoret Golf Club Headcover Set',
      sku: 'EGC-HC-SET',
      category: 'gifts',
      price: 89.99,
      cost: 45.00,
      stock: 5,
      status: 'in_stock',
      lastSold: '2023-10-28',
      description: 'Premium leather headcover set with Eldoret Golf Club logo.'
    },
    {
      id: 'PROD-007',
      name: 'Ping G425 Max Fairway Wood',
      sku: 'PING-G425-FW',
      category: 'clubs',
      price: 329.99,
      cost: 219.99,
      stock: 2,
      status: 'low_stock',
      lastSold: '2023-11-01',
      description: 'High-launching fairway wood with adjustable hosel for optimal trajectory.'
    },
  ];

  const categories: { id: ProductCategory; label: string; icon: any }[] = [
    { id: 'clubs', label: 'Golf Clubs', icon: Tag },
    { id: 'apparel', label: 'Apparel', icon: ShoppingBag },
    { id: 'accessories', label: 'Accessories', icon: Package },
    { id: 'balls', label: 'Golf Balls', icon: '⛳' },
    { id: 'shoes', label: 'Golf Shoes', icon: '👞' },
    { id: 'gifts', label: 'Gifts', icon: '🎁' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusBadge = (status: ProductStatus) => {
    const statusMap = {
      in_stock: { label: 'In Stock', variant: 'default' as const },
      low_stock: { label: 'Low Stock', variant: 'secondary' as const },
      out_of_stock: { label: 'Out of Stock', variant: 'destructive' as const },
    };
    
    const { label, variant } = statusMap[status] || { label: status, variant: 'secondary' as const };
    return <Badge variant={variant}>{label}</Badge>;
  };

  const getCategoryBadge = (category: ProductCategory) => {
    const cat = categories.find(c => c.id === category);
    return (
      <Badge variant="outline" className="text-xs">
        {cat?.icon} {cat?.label}
      </Badge>
    );
  };

  // Calculate inventory value
  const inventoryValue = products.reduce((sum, product) => sum + (product.cost * product.stock), 0);
  const retailValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const outOfStockCount = products.filter(p => p.status === 'out_of_stock').length;
  const lowStockCount = products.filter(p => p.status === 'low_stock').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Golf Shop Management</h1>
          <p className="text-muted-foreground">
            Manage inventory, products, and sales for the pro shop
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <BarChart className="mr-2 h-4 w-4" />
            Reports
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">
              {products.filter(p => p.status !== 'out_of_stock').length} in stock
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Inventory Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(inventoryValue)}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(retailValue)} retail value
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockCount}</div>
            <p className="text-xs text-muted-foreground">
              {outOfStockCount} out of stock
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">
              {products.length} products across categories
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <TabsList>
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="in_stock">In Stock</TabsTrigger>
            <TabsTrigger value="low_stock">Low Stock</TabsTrigger>
            <TabsTrigger value="out_of_stock">Out of Stock</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-9"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>All Categories</DropdownMenuItem>
                <DropdownMenuSeparator />
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id}>
                    {category.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Products</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="h-8">
                    <DollarSign className="mr-2 h-3.5 w-3.5" />
                    <span>Export</span>
                  </Button>
                  <Button size="sm" className="h-8">
                    <Plus className="mr-2 h-3.5 w-3.5" />
                    <span>Add Product</span>
                  </Button>
                </div>
              </div>
              <CardDescription>
                Manage your pro shop inventory and product listings
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getCategoryBadge(product.category)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {product.sku}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(product.price)}
                        <div className="text-xs text-muted-foreground">
                          Cost: {formatCurrency(product.cost)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {product.stock}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(product.status)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Product
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Package className="mr-2 h-4 w-4" />
                              Update Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Tag className="mr-2 h-4 w-4" />
                              Change Price
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Product
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
      </Tabs>
    </div>
  );
}
