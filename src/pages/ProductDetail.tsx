import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, QrCode } from "lucide-react";
import foxtailImage from "@/assets/product-foxtail.jpg";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in real app, fetch based on id
  const product = {
    name: "Organic Foxtail Millet - 1kg",
    image: foxtailImage,
    price: 180,
    originalPrice: 250,
    rating: 4.5,
    reviews: 128,
    inStock: true,
    certified: true,
    region: "Karnataka",
    farmer: "FPO Dharwad Collective",
    batchCode: "FTM-2024-001",
    description: "Premium quality organic foxtail millet sourced directly from certified farmers in Karnataka. Rich in protein, fiber, and essential minerals.",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-md border bg-muted cursor-pointer hover:border-primary">
                  <img
                    src={product.image}
                    alt={`Product view ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex gap-2 mb-2">
                {product.certified && (
                  <Badge className="bg-success text-success-foreground">
                    ✓ Certified Organic
                  </Badge>
                )}
                <Badge variant="outline">FSSAI Approved</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">
                From {product.region} • By {product.farmer}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= product.rating
                        ? "fill-secondary text-secondary"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-primary">₹{product.price}</span>
              <span className="text-xl text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
              <Badge variant="destructive">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
            </div>

            {product.inStock ? (
              <div className="flex items-center gap-2 text-success">
                <div className="h-2 w-2 rounded-full bg-success" />
                <span className="font-medium">In Stock</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-destructive">
                <div className="h-2 w-2 rounded-full bg-destructive" />
                <span className="font-medium">Out of Stock</span>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-medium">Quantity:</label>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="px-4">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button size="lg" className="flex-1">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <Button size="lg" variant="secondary" className="w-full">
                <QrCode className="mr-2 h-5 w-5" />
                Trace this Product
              </Button>
            </div>

            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Free Delivery</div>
                  <div className="text-sm text-muted-foreground">On orders above ₹500</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Quality Guaranteed</div>
                  <div className="text-sm text-muted-foreground">100% organic certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="nutrition">Nutritional Info</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="certification">Certification</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="space-y-4">
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-4">About this product</h3>
              <p className="text-muted-foreground">{product.description}</p>
              <p className="text-muted-foreground mt-4">
                Foxtail millet is a drought-resistant, nutritious grain that has been cultivated in India for thousands of years. 
                It's naturally gluten-free and packed with essential nutrients including protein, fiber, iron, and calcium.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Nutritional Information (per 100g)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">351</div>
                <div className="text-sm text-muted-foreground">Calories</div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">12.3g</div>
                <div className="text-sm text-muted-foreground">Protein</div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">8.5g</div>
                <div className="text-sm text-muted-foreground">Fiber</div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">3.2mg</div>
                <div className="text-sm text-muted-foreground">Iron</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((review) => (
                <div key={review} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-secondary text-secondary" />
                      ))}
                    </div>
                    <span className="font-medium">Excellent quality!</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">
                    Great product, fresh and high quality. The packaging was also excellent.
                  </p>
                  <p className="text-xs text-muted-foreground">- Verified Purchase</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certification" className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Quality Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-6">
                <Badge className="mb-3 bg-success text-success-foreground">✓ Organic Certified</Badge>
                <h4 className="font-semibold mb-2">India Organic Certification</h4>
                <p className="text-sm text-muted-foreground">
                  Certified by accredited agencies under NPOP standards
                </p>
              </div>
              <div className="border rounded-lg p-6">
                <Badge className="mb-3" variant="outline">FSSAI Approved</Badge>
                <h4 className="font-semibold mb-2">Food Safety Certified</h4>
                <p className="text-sm text-muted-foreground">
                  License No: 12345678901234
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
