import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Minus, Clock, MapPin, Utensils, ShoppingCart, Calendar as CalendarIcon, Phone, CalendarDays, UtensilsCrossed, Coffee, Wine, Salad } from "lucide-react";
import { Label } from "@/components/ui/label";

// Weekly menu specials
const weeklyMenu = {
  monday: {
    day: 'Monday',
    special: 'Meatless Monday',
    items: [
      { name: 'Mushroom Risotto', description: 'Creamy arborio rice with wild mushrooms and parmesan', price: 1600, isVeg: true },
      { name: 'Greek Salad', description: 'Fresh vegetables, feta, olives, and olive oil', price: 1200, isVeg: true }
    ]
  },
  tuesday: {
    day: 'Tuesday',
    special: 'Taco Tuesday',
    items: [
      { name: 'Beef Tacos', description: 'Three soft corn tortillas with seasoned beef, salsa, and guacamole', price: 1500, isVeg: false },
      { name: 'Veggie Fajitas', description: 'Grilled vegetables with warm tortillas and all the fixings', price: 1400, isVeg: true }
    ]
  },
  wednesday: {
    day: 'Wednesday',
    special: 'Wine & Dine',
    items: [
      { name: 'Wine Pairing Menu', description: 'Three-course meal with selected wine pairings', price: 3500, isVeg: false },
      { name: 'Cheese Platter', description: 'Selection of artisanal cheeses with fruits and nuts', price: 1800, isVeg: true }
    ]
  },
  thursday: {
    day: 'Thursday',
    special: 'Chef\'s Special',
    items: [
      { name: 'Grilled Ribeye', description: '12oz prime ribeye with roasted vegetables and red wine reduction', price: 2800, isVeg: false },
      { name: 'Butternut Squash Soup', description: 'Creamy soup with toasted pumpkin seeds', price: 900, isVeg: true }
    ]
  },
  friday: {
    day: 'Friday',
    special: 'Seafood Friday',
    items: [
      { name: 'Seafood Platter', description: 'Grilled fish, shrimp, and calamari with lemon butter sauce', price: 3200, isVeg: false },
      { name: 'Fish & Chips', description: 'Beer-battered cod with hand-cut fries and tartar sauce', price: 1900, isVeg: false }
    ]
  },
  saturday: {
    day: 'Saturday',
    special: 'Weekend Brunch',
    items: [
      { name: 'Eggs Benedict', description: 'Poached eggs on English muffins with hollandaise sauce', price: 1600, isVeg: false },
      { name: 'Pancake Stack', description: 'Fluffy buttermilk pancakes with maple syrup and berries', price: 1300, isVeg: true }
    ]
  },
  sunday: {
    day: 'Sunday',
    special: 'Sunday Roast',
    items: [
      { name: 'Roast Beef Dinner', description: 'Slow-roasted beef with Yorkshire pudding and all the trimmings', price: 2500, isVeg: false },
      { name: 'Nut Roast', description: 'Seasonal vegetable and nut roast with vegetarian gravy', price: 1800, isVeg: true }
    ]
  }
};

// Sample menu items
const menuItems = [
  { id: 1, name: 'Grilled Salmon', category: 'Main Course', price: 1800, description: 'Fresh Atlantic salmon with lemon butter sauce', isVeg: false },
  { id: 2, name: 'Club Sandwich', category: 'Lunch', price: 1200, description: 'Triple-decker sandwich with turkey, bacon, and avocado', isVeg: false },
  { id: 3, name: 'Caesar Salad', category: 'Starter', price: 950, description: 'Crisp romaine with Caesar dressing and croutons', isVeg: true },
  { id: 4, name: 'Beef Burger', category: 'Main Course', price: 1500, description: 'Juicy beef patty with cheese and special sauce', isVeg: false },
  { id: 5, name: 'Margherita Pizza', category: 'Main Course', price: 1600, description: 'Classic pizza with tomato, mozzarella, and basil', isVeg: true },
  { id: 6, name: 'Chocolate Lava Cake', category: 'Dessert', price: 800, description: 'Warm chocolate cake with a molten center', isVeg: true },
];

const categories = [...new Set(menuItems.map(item => item.category))];

const DiningPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dine-in');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<Array<{id: number | string, quantity: number, name: string, price: number, isSpecial?: boolean}>>([]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [partySize, setPartySize] = useState(2);

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: { id: number | string, name: string, price: number, isSpecial?: boolean }) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id && cartItem.isSpecial === item.isSpecial);
      if (existingItem) {
        return prev.map(cartItem => 
          cartItem.id === item.id && cartItem.isSpecial === item.isSpecial 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number | string, isSpecial: boolean = false) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === itemId && item.isSpecial === isSpecial);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(item => 
          item.id === itemId && item.isSpecial === isSpecial 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      }
      return prev.filter(item => !(item.id === itemId && item.isSpecial === isSpecial));
    });
  };

  const getCartItem = (itemId: number | string, isSpecial: boolean = false) => {
    return cart.find(item => item.id === itemId && item.isSpecial === isSpecial)?.quantity || 0;
  };

  const cartTotal = cart.reduce((total, cartItem) => {
    return total + (cartItem.price * cartItem.quantity);
  }, 0);

  const handlePlaceOrder = () => {
    const orderDetails = {
      type: activeTab,
      items: cart.map(cartItem => ({
        id: cartItem.id,
        name: cartItem.name,
        quantity: cartItem.quantity,
        price: cartItem.price,
        total: cartItem.price * cartItem.quantity,
        isSpecial: cartItem.isSpecial || false
      })),
      total: cartTotal,
      deliveryAddress: activeTab === 'delivery' ? deliveryAddress : null,
      tableNumber: activeTab === 'dine-in' ? tableNumber : null,
      specialInstructions,
      reservation: activeTab === 'reservation' ? {
        date: reservationDate,
        time: reservationTime,
        partySize
      } : null
    };

    console.log('Placing order:', orderDetails);
    // In a real app, you would send this to your backend
    alert('Order placed successfully!');
    setCart([]);
  };

  // Get today's special based on the current day
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const todaySpecial = weeklyMenu[today as keyof typeof weeklyMenu];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Dining & Ordering</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {activeTab === 'delivery' 
              ? 'Get your favorite meals delivered to your location' 
              : activeTab === 'dine-in' 
                ? 'Order food to be served at your table' 
                : activeTab === 'reservation' 
                  ? 'Reserve a table for an exquisite dining experience'
                  : 'Explore our weekly menu specials'}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full md:grid-cols-4 grid-cols-2 mb-8 gap-2">
              <TabsTrigger value="menu" className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Weekly Menu
              </TabsTrigger>
              <TabsTrigger value="dine-in" className="flex items-center gap-2">
                <Utensils className="h-4 w-4" />
                Dine In
              </TabsTrigger>
              <TabsTrigger value="delivery" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Delivery
              </TabsTrigger>
              <TabsTrigger value="reservation" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Make Reservation
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu Section */}
        {activeTab === 'menu' && (
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Today's Special</CardTitle>
                    <CardDescription>{todaySpecial.day} - {todaySpecial.special}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {todaySpecial.items.map((item, index) => (
                    <div key={`${item.name}-${index}`} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                            {item.isVeg && (
                              <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">VEG</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{item.description}</p>
                          <p className="font-medium text-primary">KSh {item.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => removeFromCart(`special-${index}`, true)}
                            disabled={!getCartItem(`special-${index}`, true)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-6 text-center">
                            {getCartItem(`special-${index}`, true)}
                          </span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => addToCart({
                              id: `special-${index}`,
                              name: item.name,
                              price: item.price,
                              isSpecial: true
                            })}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab !== 'menu' && (
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Our Menu</CardTitle>
                    <CardDescription>Select from our delicious offerings</CardDescription>
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredItems.map(item => (
                    <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                          <p className="mt-2 font-medium text-primary">KSh {item.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => removeFromCart(item.id)}
                            disabled={!getCartItem(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-6 text-center">{getCartItem(item.id)}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => addToCart(item.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {item.isVeg && (
                        <span className="inline-flex items-center text-xs text-green-600 dark:text-green-400 mt-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                          Vegetarian
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Order Summary */}
        <div className="lg:sticky lg:top-6 lg:h-fit">
          <Card className="border-primary/20">
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Order Summary
              </CardTitle>
              <CardDescription>
                {activeTab === 'delivery' 
                  ? 'Delivery order' 
                  : activeTab === 'dine-in' 
                    ? 'Table service order' 
                    : activeTab === 'reservation' 
                      ? 'Table reservation'
                      : 'No order summary'}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {activeTab === 'delivery' && (
                <div className="space-y-2">
                  <Label htmlFor="delivery-address">Delivery Address</Label>
                  <Input 
                    id="delivery-address" 
                    placeholder="Enter your delivery address" 
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                  />
                </div>
              )}

              {activeTab === 'dine-in' && (
                <div className="space-y-2">
                  <Label htmlFor="table-number">Table Number</Label>
                  <Input 
                    id="table-number" 
                    placeholder="Enter your table number" 
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                  />
                </div>
              )}

              {activeTab === 'reservation' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reservation-date">Date</Label>
                      <Input 
                        id="reservation-date" 
                        type="date" 
                        value={reservationDate}
                        onChange={(e) => setReservationDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reservation-time">Time</Label>
                      <Input 
                        id="reservation-time" 
                        type="time" 
                        value={reservationTime}
                        onChange={(e) => setReservationTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="party-size">Party Size</Label>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setPartySize(prev => Math.max(1, prev - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{partySize}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setPartySize(prev => prev + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-gray-500 ml-2">people</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="special-instructions">Special Instructions</Label>
                <Input 
                  id="special-instructions" 
                  placeholder="Any special requests or dietary restrictions?" 
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                />
              </div>

              {cart.length > 0 && (
                <div className="border-t pt-4 space-y-3">
                  <h4 className="font-medium">Your Order</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {cart.map(cartItem => {
                      const item = menuItems.find(menuItem => menuItem.id === cartItem.id);
                      if (!item) return null;
                      return (
                        <div key={cartItem.id} className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-medium">{cartItem.quantity}x</span> {item.name}
                          </div>
                          <div className="font-medium">
                            KSh {(item.price * cartItem.quantity).toLocaleString()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Total</span>
                    <span>KSh {cartTotal.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <Button 
                className="w-full mt-4" 
                size="lg"
                onClick={handlePlaceOrder}
                disabled={cart.length === 0}
              >
                {activeTab === 'reservation' ? 'Reserve Table' : 'Place Order'}
              </Button>

              <div className="flex items-center text-xs text-muted-foreground mt-2">
                <Clock className="h-3 w-3 mr-1" />
                {activeTab === 'delivery' 
                  ? 'Delivery time: 30-45 min' 
                  : activeTab === 'dine-in' 
                    ? 'Food will be served at your table' 
                    : activeTab === 'reservation' 
                      ? 'Reservation will be confirmed shortly'
                      : ''}
              </div>
            </CardContent>
          </Card>

          {/* Restaurant Info */}
          <Card className="mt-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Restaurant Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mt-0.5 mr-2 text-primary" />
                <div>
                  <p className="font-medium">Eldoret Golf Club Restaurant</p>
                  <p className="text-muted-foreground">Eldoret-Nairobi Highway, Eldoret, Kenya</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-primary" />
                <div>
                  <p className="font-medium">Opening Hours</p>
                  <p className="text-muted-foreground">Mon-Sun: 7:00 AM - 10:00 PM</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                <div>
                  <p className="font-medium">Contact</p>
                  <p className="text-muted-foreground">+254 712 345 678</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiningPage;
