import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Download, Share2, Package, Truck, MapPin } from "lucide-react";
import foxtailImage from "@/assets/product-foxtail.jpg";
import pearlImage from "@/assets/product-pearl.jpg";
import fingerImage from "@/assets/product-finger.jpg";
import ProductCard from "@/components/ProductCard";

const OrderConfirmation = () => {
  const orderId = "SHR-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const orderDate = new Date().toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  const orderItems = [
    {
      id: "1",
      name: "Organic Foxtail Millet - 1kg",
      image: foxtailImage,
      price: 180,
      quantity: 2,
    },
  ];

  const subtotal = 360;
  const shipping = 0;
  const total = 360;

  const recommendedProducts = [
    {
      id: "2",
      name: "Organic Pearl Millet - 1kg",
      image: pearlImage,
      price: 150,
      originalPrice: 180,
      rating: 4.7,
      reviews: 89,
      certified: true,
      region: "Rajasthan",
    },
    {
      id: "3",
      name: "Organic Finger Millet (Ragi) - 1kg",
      image: fingerImage,
      price: 160,
      rating: 4.9,
      reviews: 156,
      certified: true,
      region: "Karnataka",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Success Banner */}
        <div className="max-w-4xl mx-auto mb-8 animate-scale-in">
          <Card className="border-2 border-primary bg-primary/5">
            <CardContent className="p-8 text-center">
              <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">🎉 Order Confirmed!</h1>
              <p className="text-muted-foreground mb-4">
                Thank you for supporting India's millet farmers
              </p>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Order ID: {orderId}
              </Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        <p className="font-semibold text-primary mt-1">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-success font-medium">FREE</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total Paid</span>
                  <span className="text-primary">₹{total}</span>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Timeline */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Delivery Status</h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div className="h-16 w-0.5 bg-primary" />
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="font-semibold">Order Confirmed</h3>
                      <p className="text-sm text-muted-foreground">{orderDate}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="h-16 w-0.5 bg-muted" />
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="font-semibold text-muted-foreground">Packing in Progress</h3>
                      <p className="text-sm text-muted-foreground">Expected: Tomorrow</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <Truck className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="h-16 w-0.5 bg-muted" />
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="font-semibold text-muted-foreground">Out for Delivery</h3>
                      <p className="text-sm text-muted-foreground">Expected: In 3-4 days</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="font-semibold text-muted-foreground">Delivered</h3>
                      <p className="text-sm text-muted-foreground">Expected: {estimatedDelivery}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
                <div className="text-sm space-y-1">
                  <p className="font-medium">John Doe</p>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                  <p className="text-muted-foreground">123, MG Road, Near City Mall</p>
                  <p className="text-muted-foreground">Bangalore, Karnataka - 560001</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardContent className="p-6 space-y-3">
                <Button className="w-full" size="lg">
                  Track Order
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share via WhatsApp
                </Button>

                <Separator className="my-4" />

                <Link to="/">
                  <Button variant="secondary" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">🌾 Farm to Fork</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Your order includes traceability ID for complete transparency
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View Traceability
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="max-w-6xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-6">Explore More Millet Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
