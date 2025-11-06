import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const products: Product[] = [
  // Drivers
  {
    id: "d1",
    name: "TaylorMade Stealth 2 Driver",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1593111774240-fb7191ab5dc0?ixlib=rb-4.0.3",
    category: "Drivers"
  },
  {
    id: "d2",
    name: "Callaway Paradym Triple Diamond",
    price: 649.99,
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5c87623d?ixlib=rb-4.0.3",
    category: "Drivers"
  },
  
  // Irons
  {
    id: "i1",
    name: "Titleist T200 Irons (4-PW)",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1591883709370-3d81144cffd8?ixlib=rb-4.0.3",
    category: "Iron Sets"
  },
  
  // Putters
  {
    id: "p1",
    name: "Scotty Cameron Special Select",
    price: 429.99,
    image: "https://images.unsplash.com/photo-1591883709370-3d81144cffd8?ixlib=rb-4.0.3",
    category: "Putters"
  },
  
  // Golf Balls
  {
    id: "b1",
    name: "Titleist Pro V1 (12 Pack)",
    price: 52.99,
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5c87623d?ixlib=rb-4.0.3",
    category: "Golf Balls"
  },
  {
    id: "b2",
    name: "Callaway Chrome Soft X (12 Pack)",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-4.0.3",
    category: "Golf Balls"
  },
  
  // Apparel - Men's
  {
    id: "a1",
    name: "Nike Dri-FIT Polo Shirt",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1600185365483-26c7a535bbfd?ixlib=rb-4.0.3",
    category: "Men's Apparel"
  },
  {
    id: "a2",
    name: "Under Armour Tech 2.0 Polo",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3",
    category: "Men's Apparel"
  },
  
  // Apparel - Women's
  {
    id: "aw1",
    name: "Nike Ladies Dri-FIT Polo",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1525450824786-227cbef70703?ixlib=rb-4.0.3",
    category: "Women's Apparel"
  },
  
  // Footwear
  {
    id: "f1",
    name: "FootJoy Pro SL Carbon Golf Shoes",
    price: 229.99,
    image: "https://images.unsplash.com/photo-1600269452002-792e0b4ef0d6?ixlib=rb-4.0.3",
    category: "Golf Shoes"
  },
  {
    id: "f2",
    name: "Adidas CodeChaos Spikeless",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3",
    category: "Golf Shoes"
  },
  
  // Bags
  {
    id: "bg1",
    name: "Titleist Players 4 Stand Bag",
    price: 279.99,
    image: "https://images.unsplash.com/photo-1598276625409-2a8f47fdd5e1?ixlib=rb-4.0.3",
    category: "Golf Bags"
  },
  
  // Accessories
  {
    id: "ac1",
    name: "Golf Pride MCC Plus4 Grip",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5c87623d?ixlib=rb-4.0.3",
    category: "Grips"
  },
  {
    id: "ac2",
    name: "Callaway Golf Glove",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1584949091598-533c5c420fa2?ixlib=rb-4.0.3",
    category: "Accessories"
  },
  {
    id: "ac3",
    name: "Bushnell Pro X3 Rangefinder",
    price: 549.99,
    image: "https://images.unsplash.com/photo-1600185365926-5a8487ef186d?ixlib=rb-4.0.3",
    category: "Electronics"
  },
  
  // Training Aids
  {
    id: "t1",
    name: "PuttOut Pressure Putt Trainer",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1569012871812-f4ee1c0b1b4f?ixlib=rb-4.0.3",
    category: "Training Aids"
  },
  {
    id: "t2",
    name: "Swingyde Golf Swing Trainer",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1518640467707-681bf063a2b0?ixlib=rb-4.0.3",
    category: "Training Aids"
  },
  
  // Headcovers
  {
    id: "h1",
    name: "Dormie Workshop Leather Headcover",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1571974096035-cd82ce9b9f8a?ixlib=rb-4.0.3",
    category: "Headcovers"
  },
  
  // Umbrellas
  {
    id: "u1",
    name: "GustBuster Pro Series Gold",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1534957753291-64d667ce2927?ixlib=rb-4.0.3",
    category: "Accessories"
  },
  
  // Towels
  {
    id: "tw1",
    name: "Titleist Players Golf Towel",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1600185365926-5a8487ef186d?ixlib=rb-4.0.3",
    category: "Accessories"
  },
  
  // Hats
  {
    id: "hat1",
    name: "Nike Heritage86 Golf Hat",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521369902140-64c9fca23e37?ixlib=rb-4.0.3",
    category: "Hats & Visors"
  }
];

export default function GolfShopPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Golf Shop</h1>
        <p className="text-muted-foreground">Premium golf equipment and apparel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-video bg-gray-100 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl">{product.name}</CardTitle>
              <p className="text-muted-foreground">{product.category}</p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                <Button>Add to Cart</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
