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
  {
    id: "1",
    name: "Pro V1 Golf Balls (12 Pack)",
    price: 52.99,
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5c87623d?ixlib=rb-4.0.3",
    category: "Golf Balls"
  },
  {
    id: "2",
    name: "Paradym Driver",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1593111774240-fb7191ab5dc0?ixlib=rb-4.0.3",
    category: "Drivers"
  },
  {
    id: "3",
    name: "Golf Polo Shirt",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1600185365483-26c7a535bbfd?ixlib=rb-4.0.3",
    category: "Apparel"
  },
  {
    id: "4",
    name: "Spider X Putter",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1591883709370-3d81144cffd8?ixlib=rb-4.0.3",
    category: "Putters"
  },
  {
    id: "5",
    name: "Golf Shoes",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1600269452002-792e0b4ef0d6?ixlib=rb-4.0.3",
    category: "Footwear"
  },
  {
    id: "6",
    name: "Golf Bag",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1598276625409-2a8f47fdd5e1?ixlib=rb-4.0.3",
    category: "Bags"
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
