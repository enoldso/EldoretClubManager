import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Minus, Clock, MapPin, Utensils, ShoppingCart, Calendar as CalendarIcon, Phone, CalendarDays, UtensilsCrossed, Coffee, Wine, Salad } from "lucide-react";
import { Label } from "@/components/ui/label";

// Menu items type
type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  isVeg: boolean;
  isAvailable?: boolean;
};

// Sample menu items for the regular menu
const menuItems: MenuItem[] = [
  { 
    id: 1, 
    name: 'Grilled Salmon', 
    category: 'Main Course', 
    price: 2800, 
    description: 'Fresh Atlantic salmon with lemon butter sauce and seasonal vegetables', 
    isVeg: false,
    isAvailable: true
  },
  { 
    id: 2, 
    name: 'Margherita Pizza', 
    category: 'Main Course', 
    price: 2200, 
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil', 
    isVeg: true,
    isAvailable: true
  },
  { 
    id: 3, 
    name: 'Caesar Salad', 
    category: 'Starter', 
    price: 1200, 
    description: 'Crisp romaine with Caesar dressing, croutons, and parmesan', 
    isVeg: true,
    isAvailable: true
  },
  { 
    id: 4, 
    name: 'Beef Burger', 
    category: 'Main Course', 
    price: 1900, 
    description: 'Juicy beef patty with cheese, lettuce, and special sauce', 
    isVeg: false,
    isAvailable: true
  },
  { 
    id: 5, 
    name: 'Chocolate Lava Cake', 
    category: 'Dessert', 
    price: 900, 
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream', 
    isVeg: true,
    isAvailable: true
  },
  { 
    id: 6, 
    name: 'Mushroom Risotto', 
    category: 'Main Course', 
    price: 2100, 
    description: 'Creamy arborio rice with wild mushrooms and parmesan', 
    isVeg: true,
    isAvailable: true
  }
];

// Delivery options
const deliveryOptions = [
  { id: 'standard', name: 'Standard Delivery', price: 300, time: '45-60 min' },
  { id: 'express', name: 'Express Delivery', price: 500, time: '25-35 min' }
];

// Table types for reservations
const tableTypes = [
  { id: 'standard', name: 'Standard Table', seats: 2, minSpend: 2000 },
  { id: 'booth', name: 'Booth', seats: 4, minSpend: 4000 },
  { id: 'private', name: 'Private Room', seats: 6, minSpend: 10000 }
];

// Monthly menu specials
const monthlyMenu = {
  week1: {
    name: 'Week 1: Mediterranean Delights',
    days: {
      monday: {
        day: 'Monday',
        special: 'Mezze Monday',
        items: [
          { name: 'Hummus & Pita Platter', description: 'House-made hummus with warm pita and olives', price: 1200, isVeg: true, isChefSpecial: true },
          { name: 'Falafel Wrap', description: 'Crispy falafel with tahini and fresh vegetables', price: 1400, isVeg: true }
        ]
      },
      tuesday: {
        day: 'Tuesday',
        special: 'Tuscan Tuesday',
        items: [
          { name: 'Pasta Carbonara', description: 'Classic spaghetti with pancetta, eggs, and pecorino', price: 1800, isVeg: false, isChefSpecial: true },
          { name: 'Bruschetta', description: 'Toasted bread with tomatoes, garlic, and basil', price: 1000, isVeg: true }
        ]
      },
      wednesday: {
        day: 'Wednesday',
        special: 'Wine & Dine',
        items: [
          { name: 'Wine Pairing Menu', description: 'Three-course meal with selected wine pairings', price: 3500, isVeg: false, isChefSpecial: true },
          { name: 'Cheese & Charcuterie Board', description: 'Selection of artisanal cheeses and cured meats', price: 2200, isVeg: false }
        ]
      },
      thursday: {
        day: 'Thursday',
        special: 'Steak Night',
        items: [
          { name: 'Grilled Ribeye', description: '12oz prime ribeye with roasted vegetables and red wine reduction', price: 3200, isVeg: false, isChefSpecial: true },
          { name: 'Mushroom Risotto', description: 'Creamy arborio rice with wild mushrooms', price: 1600, isVeg: true }
        ]
      },
      friday: {
        day: 'Friday',
        special: 'Seafood Extravaganza',
        items: [
          { name: 'Seafood Paella', description: 'Spanish-style rice with mixed seafood and saffron', price: 2800, isVeg: false, isChefSpecial: true },
          { name: 'Grilled Salmon', description: 'With lemon butter sauce and seasonal vegetables', price: 2400, isVeg: false }
        ]
      },
      saturday: {
        day: 'Saturday',
        special: 'Chef\'s Tasting Menu',
        items: [
          { name: '5-Course Tasting Menu', description: 'Chef\'s selection of seasonal dishes', price: 4500, isVeg: false, isChefSpecial: true },
          { name: 'Wine Pairing', description: 'Optional wine pairing with each course', price: 2000, isVeg: false }
        ]
      },
      sunday: {
        day: 'Sunday',
        special: 'Sunday Roast',
        items: [
          { name: 'Beef Roast', description: 'Slow-roasted beef with Yorkshire pudding and vegetables', price: 2600, isVeg: false, isChefSpecial: true },
          { name: 'Vegetable Wellington', description: 'Mushroom and spinach in puff pastry', price: 2000, isVeg: true }
        ]
      }
    }
  },
  week2: {
    name: 'Week 2: Asian Fusion',
    days: {
      monday: {
        day: 'Monday',
        special: 'Sushi Night',
        items: [
          { name: 'Sushi Platter', description: 'Assorted fresh sushi and sashimi', price: 2800, isVeg: false, isChefSpecial: true },
          { name: 'Vegetable Tempura', description: 'Lightly battered seasonal vegetables', price: 1600, isVeg: true }
        ]
      },
      tuesday: {
        day: 'Tuesday',
        special: 'Thai Tuesday',
        items: [
          { name: 'Pad Thai', description: 'Stir-fried rice noodles with shrimp and peanuts', price: 1800, isVeg: false, isChefSpecial: true },
          { name: 'Green Curry', description: 'With your choice of chicken, beef, or tofu', price: 1700, isVeg: false }
        ]
      },
      wednesday: {
        day: 'Wednesday',
        special: 'Dim Sum Day',
        items: [
          { name: 'Dim Sum Platter', description: 'Assorted steamed dumplings and buns', price: 2200, isVeg: false, isChefSpecial: true },
          { name: 'Hot & Sour Soup', description: 'Spicy and tangy traditional soup', price: 900, isVeg: true }
        ]
      },
      thursday: {
        day: 'Thursday',
        special: 'Korean BBQ',
        items: [
          { name: 'Bulgogi', description: 'Marinated beef with rice and banchan', price: 2600, isVeg: false, isChefSpecial: true },
          { name: 'Bibimbap', description: 'Mixed rice with vegetables and egg', price: 1900, isVeg: false }
        ]
      },
      friday: {
        day: 'Friday',
        special: 'Sichuan Night',
        items: [
          { name: 'Kung Pao Chicken', description: 'Spicy stir-fry with peanuts and vegetables', price: 2000, isVeg: false, isChefSpecial: true },
          { name: 'Mapo Tofu', description: 'Spicy tofu with minced pork in chili sauce', price: 1700, isVeg: false }
        ]
      },
      saturday: {
        day: 'Saturday',
        special: 'Sushi & Sake',
        items: [
          { name: 'Omakase Experience', description: 'Chef\'s choice sushi selection', price: 3800, isVeg: false, isChefSpecial: true },
          { name: 'Sake Tasting', description: 'Selection of premium sakes', price: 2500, isVeg: true }
        ]
      },
      sunday: {
        day: 'Sunday',
        special: 'Ramen Sunday',
        items: [
          { name: 'Tonkotsu Ramen', description: 'Rich pork broth with chashu and ramen eggs', price: 2000, isVeg: false, isChefSpecial: true },
          { name: 'Vegetable Ramen', description: 'Miso broth with seasonal vegetables', price: 1800, isVeg: true }
        ]
      }
    }
  },
  week3: {
    name: 'Week 3: Italian Classics',
    days: {
      monday: {
        day: 'Monday',
        special: 'Pasta Night',
        items: [
          { name: 'Spaghetti Carbonara', description: 'Classic Roman pasta with egg and pancetta', price: 1900, isVeg: false, isChefSpecial: true },
          { name: 'Penne Arrabbiata', description: 'Spicy tomato sauce with garlic and chili', price: 1600, isVeg: true }
        ]
      },
      tuesday: {
        day: 'Tuesday',
        special: 'Pizza Night',
        items: [
          { name: 'Truffle Mushroom Pizza', description: 'White truffle oil, wild mushrooms, and mozzarella', price: 2200, isVeg: true, isChefSpecial: true },
          { name: 'Pepperoni Pizza', description: 'Classic pepperoni with tomato sauce', price: 2000, isVeg: false }
        ]
      },
      wednesday: {
        day: 'Wednesday',
        special: 'Risotto Day',
        items: [
          { name: 'Saffron Risotto', description: 'With seared scallops and lemon zest', price: 2500, isVeg: false, isChefSpecial: true },
          { name: 'Mushroom Risotto', description: 'With wild mushrooms and parmesan', price: 1800, isVeg: true }
        ]
      },
      thursday: {
        day: 'Thursday',
        special: 'Meatball Night',
        items: [
          { name: 'Grandma\'s Meatballs', description: 'Homestyle meatballs in tomato sauce with polenta', price: 2100, isVeg: false, isChefSpecial: true },
          { name: 'Eggplant Parmesan', description: 'Breaded eggplant with marinara and mozzarella', price: 1900, isVeg: true }
        ]
      },
      friday: {
        day: 'Friday',
        special: 'Seafood Pasta',
        items: [
          { name: 'Linguine alle Vongole', description: 'Clams in white wine and garlic sauce', price: 2600, isVeg: false, isChefSpecial: true },
          { name: 'Shrimp Scampi', description: 'With linguine in garlic butter sauce', price: 2800, isVeg: false }
        ]
      },
      saturday: {
        day: 'Saturday',
        special: 'Tuscan Feast',
        items: [
          { name: 'Bistecca alla Fiorentina', description: 'Grilled T-bone steak with rosemary potatoes', price: 3800, isVeg: false, isChefSpecial: true },
          { name: 'Truffle Risotto', description: 'With wild mushrooms and parmesan', price: 2200, isVeg: true }
        ]
      },
      sunday: {
        day: 'Sunday',
        special: 'Sunday Gravy',
        items: [
          { name: 'Sunday Gravy', description: 'Slow-cooked meat sauce with pasta', price: 2200, isVeg: false, isChefSpecial: true },
          { name: 'Tiramisu', description: 'Classic Italian dessert', price: 900, isVeg: true }
        ]
      }
    }
  },
  week4: {
    name: 'Week 4: Global Cuisine',
    days: {
      monday: {
        day: 'Monday',
        special: 'Mexican Fiesta',
        items: [
          { name: 'Carne Asada Tacos', description: 'Grilled steak with fresh salsa and guacamole', price: 1900, isVeg: false, isChefSpecial: true },
          { name: 'Vegetable Enchiladas', description: 'With tomatillo sauce and queso fresco', price: 1700, isVeg: true }
        ]
      },
      tuesday: {
        day: 'Tuesday',
        special: 'Indian Spice',
        items: [
          { name: 'Butter Chicken', description: 'Tandoori chicken in tomato cream sauce', price: 2100, isVeg: false, isChefSpecial: true },
          { name: 'Palak Paneer', description: 'Spinach and cheese in spiced curry', price: 1800, isVeg: true }
        ]
      },
      wednesday: {
        day: 'Wednesday',
        special: 'Greek Night',
        items: [
          { name: 'Moussaka', description: 'Layered eggplant and spiced meat with béchamel', price: 2200, isVeg: false, isChefSpecial: true },
          { name: 'Greek Salad', description: 'With feta, olives, and olive oil', price: 1500, isVeg: true }
        ]
      },
      thursday: {
        day: 'Thursday',
        special: 'French Bistro',
        items: [
          { name: 'Coq au Vin', description: 'Chicken braised in red wine with mushrooms', price: 2800, isVeg: false, isChefSpecial: true },
          { name: 'Ratatouille', description: 'Provençal vegetable stew', price: 1900, isVeg: true }
        ]
      },
      friday: {
        day: 'Friday',
        special: 'Seafood Tower',
        items: [
          { name: 'Grand Seafood Tower', description: 'Oysters, shrimp, crab, and lobster with sauces', price: 4500, isVeg: false, isChefSpecial: true },
          { name: 'Grilled Octopus', description: 'With lemon and herbs', price: 2600, isVeg: false }
        ]
      },
      saturday: {
        day: 'Saturday',
        special: 'Chef\'s Tasting',
        items: [
          { name: '7-Course Tasting Menu', description: 'Chef\'s selection of global flavors', price: 5200, isVeg: false, isChefSpecial: true },
          { name: 'Wine Pairing', description: 'Selected wines with each course', price: 2500, isVeg: false }
        ]
      },
      sunday: {
        day: 'Sunday',
        special: 'BBQ Sunday',
        items: [
          { name: 'BBQ Platter', description: 'Ribs, brisket, and pulled pork with sides', price: 2800, isVeg: false, isChefSpecial: true },
          { name: 'Vegetable Skewers', description: 'Grilled seasonal vegetables with chimichurri', price: 1800, isVeg: true }
        ]
      }
    }
  }
};

const categories = [...new Set(menuItems.map(item => item.category))];


const DiningPage: React.FC = () => {
  // Navigation and menu state
  const [activeTab, setActiveTab] = useState<'menu' | 'reservation' | 'delivery'>('menu');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeWeek, setActiveWeek] = useState<string>('week1');
  const [activeDay, setActiveDay] = useState<string>('monday');
  const [diningOption, setDiningOption] = useState<'sitting-in' | 'takeaway' | 'home-delivery'>('sitting-in');
  
  // Cart state
  const [cart, setCart] = useState<Array<{
    id: number | string, 
    quantity: number, 
    name: string, 
    price: number, 
    isSpecial?: boolean
  }>>([]);
  
  // Delivery state
  const [deliveryOption, setDeliveryOption] = useState<string>('standard');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [deliveryInstructions, setDeliveryInstructions] = useState<string>('');
  
  // Reservation state
  const [reservationDate, setReservationDate] = useState<string>('');
  const [reservationTime, setReservationTime] = useState<string>('19:00');
  const [partySize, setPartySize] = useState<number>(2);
  const [tableType, setTableType] = useState<string>('standard');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  
  // UI state
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [tableNumber, setTableNumber] = useState<string>('');

  const handlePartySizeChange = (increment: boolean) => {
    setPartySize(prev => {
      const newSize = increment ? prev + 1 : prev - 1;
      return Math.min(Math.max(newSize, 1), 10);
    });
  };

  // Get current week's menu
  const currentWeekMenu = monthlyMenu[activeWeek as keyof typeof monthlyMenu];
  
  // Filter menu items based on selected category
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

  // Get current date in YYYY-MM-DD format for date input
  const today = new Date().toISOString().split('T')[0];
  
  // Set default reservation date to today if not set
  if (!reservationDate) {
    setReservationDate(today);
  }

  // Calculate cart total
  const cartTotal = cart.reduce((total, cartItem) => {
    const item = menuItems.find(item => item.id === cartItem.id);
    return total + ((item?.price || 0) * cartItem.quantity);
  }, 0);

  const handlePlaceOrder = async () => {
    if (activeTab === 'reservation') {
      await handleMakeReservation();
    } else {
      await handleSubmitOrder();
    }
  };

  const handleSubmitOrder = async () => {
    try {
      if (cart.length === 0) {
        alert('Your cart is empty. Please add items before placing an order.');
        return;
      }

      const order = {
        type: diningOption === 'home-delivery' ? 'delivery' : 'dine-in',
        diningOption,
        items: cart.map(cartItem => {
          const item = menuItems.find(menuItem => menuItem.id === cartItem.id) || 
                     Object.values(monthlyMenu).flatMap(week => 
                       Object.values(week.days).flatMap(day => 
                         day.items.find(i => i.id === cartItem.id)
                       )
                     ).find(Boolean);
          return {
            itemId: cartItem.id,
            name: item?.name || 'Unknown Item',
            quantity: cartItem.quantity,
            price: item?.price || 0,
            total: (item?.price || 0) * cartItem.quantity,
            isSpecial: cartItem.isSpecial || false
          };
        }),
        total: cartTotal,
        partySize: diningOption === 'home-delivery' ? 1 : partySize,
        deliveryAddress: diningOption === 'home-delivery' ? deliveryAddress : undefined,
        tableNumber: diningOption === 'sitting-in' ? tableNumber : undefined,
        specialInstructions,
        orderTime: new Date().toISOString(),
        status: 'pending'
      };

      console.log('Submitting order:', order);
      
      // Here you would typically make an API call to submit the order
      // For now, we'll just show a success message
      alert('Your order has been placed successfully!');
      
      // Reset form after submission
      setCart([]);
      setSpecialRequests('');
      setSpecialInstructions('');
      setDeliveryAddress('');
      setTableNumber('');
      setShowConfirmation(true);
      
      // Hide confirmation after 3 seconds
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error processing your order. Please try again.');
    }
  };

  const handleMakeReservation = async () => {
    try {
      if (!reservationDate) {
        alert('Please select a date for your reservation');
        return;
      }

      const reservation = {
        date: reservationDate,
        time: reservationTime,
        partySize,
        specialRequests,
        status: 'pending'
      };

      console.log('Making reservation:', reservation);
      setShowConfirmation(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setReservationDate('');
        setPartySize(2);
        setReservationTime('19:00');
        setSpecialRequests('');
        setShowConfirmation(false);
      }, 3000);
    } catch (error) {
      console.error('Error making reservation:', error);
      alert('There was an error processing your reservation. Please try again.');
    }
  };

  // Get current day name
  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  };

  // Set active day to current day if not set
  React.useEffect(() => {
    const today = new Date();
    const currentDay = getDayName(today);
    setActiveDay(currentDay);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Dining & Ordering</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {activeTab === 'delivery' 
              ? 'Get your favorite meals delivered to your location' 
              : activeTab === 'reservation' 
                ? 'Reserve a table for an exquisite dining experience'
                : 'Explore our menu and place your order'}
          </p>
          
          {/* Dining Options Tabs */}
          <div className="mt-6 mb-8">
            <div className="flex flex-wrap gap-2 md:gap-4">
              <button
                onClick={() => setActiveTab('menu')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'menu' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Utensils size={18} />
                  <span>Menu</span>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('reservation')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'reservation' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CalendarDays size={18} />
                  <span>Make a Reservation</span>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('delivery')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'delivery' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>Home Delivery</span>
                </div>
              </button>
            </div>
            
            {/* Dining Type Selector - Only show when on menu tab */}
            {activeTab === 'menu' && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dining Option</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setDiningOption('sitting-in')}
                    className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
                      diningOption === 'sitting-in'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Utensils size={16} />
                      <span>Sitting In</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setDiningOption('takeaway')}
                    className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
                      diningOption === 'takeaway'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingCart size={16} />
                      <span>Takeaway</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Today's Special</CardTitle>
                    <CardDescription>
                      {currentWeekMenu.days[activeDay as keyof typeof currentWeekMenu.days].day} - {currentWeekMenu.days[activeDay as keyof typeof currentWeekMenu.days].special}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentWeekMenu.days[activeDay as keyof typeof currentWeekMenu.days].items.map((item, index) => {
                    const cartQuantity = getCartItem(item.id, true);
                    return (
                      <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                            <div className="flex items-center mt-2">
                              <span className="font-medium text-primary">KSh {item.price.toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end ml-4">
                            {cartQuantity > 0 ? (
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={() => removeFromCart(item.id, true)}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-6 text-center">{cartQuantity}</span>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={() => addToCart({ ...item, isSpecial: true })}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <Button 
                                size="sm" 
                                onClick={() => addToCart({ ...item, isSpecial: true })}
                                className="whitespace-nowrap"
                              >
                                Add to Cart
                              </Button>
                            )}
                          </div>
                        </div>
                        {item.isChefSpecial && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Chef's Special
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order/Reservation Form */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeTab === 'delivery' 
                    ? 'Delivery Details'
                    : activeTab === 'dine-in'
                      ? 'Dine-in Order'
                      : 'Table Reservation'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Delivery Address (only for delivery) */}
                {activeTab === 'delivery' && (
                  <div className="space-y-2">
                    <Label htmlFor="delivery-address">Delivery Address</Label>
                    <Input 
                      id="delivery-address"
                      placeholder="Enter your delivery address"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      required
                    />
                  </div>
                )}

                {/* Table Number (only for dine-in) */}
                {activeTab === 'dine-in' && (
                  <div className="space-y-2">
                    <Label htmlFor="table-number">Table Number</Label>
                    <Input 
                      id="table-number"
                      placeholder="Enter your table number"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      required
                    />
                  </div>
                )}

                {/* Party Size (for all order types) */}
                <div className="space-y-2">
                  <Label htmlFor="party-size">
                    {activeTab === 'delivery' ? 'Number of Meals' : 'Party Size'}
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handlePartySizeChange(false)}
                      type="button"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{partySize}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handlePartySizeChange(true)}
                      type="button"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-gray-500 ml-2">
                      {activeTab === 'delivery' ? 'meals' : 'people'}
                    </span>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-2">
                  <Label htmlFor="special-requests">
                    {activeTab === 'reservation' ? 'Additional Notes' : 'Special Instructions'}
                  </Label>
                  <Input 
                    id="special-requests" 
                    placeholder={
                      activeTab === 'reservation' 
                        ? 'Any special requests or notes for your reservation?'
                        : 'Any special requests or dietary restrictions?'
                    }
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                  />
                  
                  {/* Cart Items */}
                  {cart.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="font-medium">Your Order</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                        {cart.map(cartItem => {
                          const item = menuItems.find(menuItem => menuItem.id === cartItem.id) || 
                                     Object.values(monthlyMenu).flatMap(week => 
                                       Object.values(week.days).flatMap(day => 
                                         day.items.find(i => i.id === cartItem.id)
                                       )
                                     ).find(Boolean);
                          if (!item) return null;
                          return (
                            <div key={`${cartItem.id}-${cartItem.isSpecial ? 'special' : 'regular'}`} 
                                 className="flex justify-between items-center text-sm py-1">
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
                      <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                        <span>Total</span>
                        <span>KSh {cartTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Button */}
                <Button 
                  className="w-full mt-4" 
                  size="lg"
                  onClick={handlePlaceOrder}
                  disabled={activeTab === 'reservation' ? false : cart.length === 0}
                >
                  {activeTab === 'reservation' 
                    ? 'Make Reservation' 
                    : activeTab === 'delivery' 
                      ? 'Place Delivery Order' 
                      : activeTab === 'dine-in'
                        ? 'Order Now'
                        : 'Place Order'}
                </Button>

              <div className="flex items-center text-xs text-muted-foreground mt-2">
                <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                <span>
                  {activeTab === 'delivery' 
                    ? 'Delivery time: 30-45 min' 
                    : activeTab === 'dine-in' 
                      ? 'Food will be served at your table' 
                      : activeTab === 'reservation' 
                        ? 'Reservation will be confirmed shortly'
                        : ''}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Restaurant Info */}
          <Card className="mt-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Restaurant Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mt-0.5 mr-2 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Eldoret Golf Club Restaurant</p>
                  <p className="text-muted-foreground">Eldoret-Nairobi Highway, Eldoret, Kenya</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-4 w-4 mt-0.5 mr-2 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Opening Hours</p>
                  <p className="text-muted-foreground">Mon-Sun: 7:00 AM - 10:00 PM</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-4 w-4 mt-0.5 mr-2 text-primary flex-shrink-0" />
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
