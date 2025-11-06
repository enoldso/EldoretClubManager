import MenuCard from '../MenuCard';
import diningImage from '@assets/generated_images/Clubhouse_dining_room_9c8a6dcd.png';

export default function MenuCardExample() {
  const menuItems = [
    {
      id: "1",
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon with lemon butter sauce, seasonal vegetables",
      price: 28.50,
      category: "Main Course",
      available: true,
      image: diningImage
    },
    {
      id: "2",
      name: "Caesar Salad",
      description: "Crispy romaine lettuce, parmesan, croutons, classic dressing",
      price: 12.00,
      category: "Appetizer",
      available: true
    },
    {
      id: "3",
      name: "Beef Tenderloin",
      description: "Prime beef with truffle mashed potatoes and red wine reduction",
      price: 42.00,
      category: "Main Course",
      available: false
    }
  ];

  return (
    <div className="p-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl">
        {menuItems.map(item => (
          <MenuCard
            key={item.id}
            item={item}
            onAddToCart={(id, qty) => console.log('Add to cart:', id, qty)}
          />
        ))}
      </div>
    </div>
  );
}
