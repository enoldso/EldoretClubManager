import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus } from "lucide-react";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  image?: string;
}

interface MenuCardProps {
  item: MenuItem;
  onAddToCart?: (itemId: string, quantity: number) => void;
}

export default function MenuCard({ item, onAddToCart }: MenuCardProps) {
  const [quantity, setQuantity] = useState(0);

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    console.log(`Added ${item.name}, quantity: ${newQuantity}`);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      console.log(`Removed ${item.name}, quantity: ${newQuantity}`);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart?.(item.id, quantity);
      console.log(`Added to cart: ${item.name} x${quantity}`);
    }
  };

  return (
    <Card className={!item.available ? 'opacity-60' : ''} data-testid={`card-menu-item-${item.id}`}>
      {item.image && (
        <div className="aspect-video w-full overflow-hidden rounded-t-md bg-muted">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-medium leading-tight" data-testid={`text-menu-name-${item.id}`}>{item.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
          </div>
          <Badge variant="outline" className="shrink-0">{item.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-lg font-bold text-primary" data-testid={`text-menu-price-${item.id}`}>
          ${item.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        {item.available ? (
          <>
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={decrementQuantity}
                disabled={quantity === 0}
                data-testid={`button-decrease-${item.id}`}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center font-medium" data-testid={`text-quantity-${item.id}`}>{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={incrementQuantity}
                data-testid={`button-increase-${item.id}`}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <Button
              className="flex-1"
              onClick={handleAddToCart}
              disabled={quantity === 0}
              data-testid={`button-add-cart-${item.id}`}
            >
              Add to Cart
            </Button>
          </>
        ) : (
          <Badge variant="destructive" className="w-full justify-center">
            Unavailable
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
}
