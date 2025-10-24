import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Award, Phone, Mail } from "lucide-react";
import productFoxtail from "@/assets/product-foxtail.jpg";
import productPearl from "@/assets/product-pearl.jpg";
import productFinger from "@/assets/product-finger.jpg";

const shops = {
  "1": {
    name: "Dharwad FPO",
    description: "Direct from farmers in Karnataka. Organic certified millets with traditional farming methods.",
    region: "Karnataka",
    rating: 4.8,
    certifications: ["Organic", "FSSAI"],
    phone: "+91 98765 43210",
    email: "contact@dharwadfpo.com",
    products: [
      {
        id: "1",
        name: "Organic Foxtail Millet",
        price: 120,
        originalPrice: 150,
        rating: 4.8,
        reviews: 156,
        certified: true,
        image: productFoxtail,
        region: "Karnataka",
      },
      {
        id: "2",
        name: "Pearl Millet (Bajra)",
        price: 100,
        originalPrice: 130,
        rating: 4.7,
        reviews: 89,
        certified: true,
        image: productPearl,
        region: "Karnataka",
      },
      {
        id: "3",
        name: "Finger Millet (Ragi)",
        price: 110,
        originalPrice: 140,
        rating: 4.9,
        reviews: 203,
        certified: true,
        image: productFinger,
        region: "Karnataka",
      },
    ],
  },
  "2": {
    name: "Maharashtra Millet Co.",
    description: "Premium quality jowar and bajra from Maharashtra's heartland.",
    region: "Maharashtra",
    rating: 4.7,
    certifications: ["FSSAI", "ISO"],
    phone: "+91 98765 43211",
    email: "info@maharashtramillet.com",
    products: [
      {
        id: "4",
        name: "Premium Jowar",
        price: 95,
        originalPrice: 120,
        rating: 4.6,
        reviews: 112,
        certified: true,
        image: productPearl,
        region: "Maharashtra",
      },
      {
        id: "5",
        name: "Bajra Flour",
        price: 85,
        originalPrice: 110,
        rating: 4.5,
        reviews: 67,
        certified: true,
        image: productFoxtail,
        region: "Maharashtra",
      },
    ],
  },
};

const ShopProducts = () => {
  const { id } = useParams();
  const shop = shops[id as keyof typeof shops];

  if (!shop) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold">Shop not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Shop Header */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
        <div className="container">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-4xl font-bold text-primary">
              {shop.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{shop.name}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{shop.region}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="font-medium">{shop.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground max-w-2xl">{shop.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {shop.certifications.map((cert) => (
                  <Badge key={cert} variant="secondary" className="gap-1">
                    <Award className="h-3 w-3" />
                    {cert}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{shop.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{shop.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Sort */}
      <section className="py-6 bg-card border-b">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {shop.products.length} products
            </div>
            <div className="flex gap-4">
              <Select defaultValue="featured">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
            {shop.products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Shop */}
      <section className="py-16 bg-card">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">About {shop.name}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Our Story</h3>
                <p className="text-sm text-muted-foreground">
                  We are a farmer-led organization committed to sustainable agriculture and fair trade practices. Our millets are grown using traditional methods passed down through generations.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Quality Assurance</h3>
                <p className="text-sm text-muted-foreground">
                  Every batch undergoes rigorous testing at certified labs. We maintain complete traceability from farm to consumer, ensuring you get the best quality products.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Community Impact</h3>
                <p className="text-sm text-muted-foreground">
                  By purchasing from us, you directly support local farmers and their families. We've helped improve the livelihood of over 500 farmers in our region.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ShopProducts;
