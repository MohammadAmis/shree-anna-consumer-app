import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, QrCode, Heart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  variety: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  certifications: string[];
  region: string;
}

const ProductCard = ({
  id,
  name,
  variety,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  certifications,
  region,
}: ProductCardProps) => {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-[var(--card-shadow-hover)] border-border">
      {/* Image Container */}
      <Link to={`/product/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Certifications */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {certifications.map((cert) => (
              <Badge key={cert} variant="secondary" className="text-xs font-medium">
                {cert}
              </Badge>
            ))}
          </div>

          {/* Quick Actions - Always visible like certificates */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Button 
              size="icon" 
              variant="secondary" 
              className="h-8 w-8 rounded-full shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="secondary" 
              className="h-8 w-8 rounded-full shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <QrCode className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>

      <CardContent className="p-4 space-y-2">
        {/* Title */}
        <Link to={`/product/${id}`}>
          <h3 className="font-semibold text-foreground line-clamp-1 hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground">{variety}</p>
        </Link>

        {/* Rating & Region */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            <span className="font-medium">{rating}</span>
            <span className="text-muted-foreground">({reviews})</span>
          </div>
          <span className="text-muted-foreground text-xs">📍 {region}</span>
        </div>

      
        {/* Price with Discount Badge */}
        

          <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-2xl font-bold text-primary">₹{price}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{originalPrice}
            </span>
          )}
          <span className="text-sm text-muted-foreground">/kg</span>
          {discount > 0 && (
            <div className="">
              <Badge className="py-1  bg-destructive text-destructive-foreground">
                {discount}% OFF
              </Badge>
            </div>
          )}
        </div>
        
        
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <Button className="flex-1 gap-2" variant="default">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
          <Button className="flex-1" variant="secondary">
            Buy Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;