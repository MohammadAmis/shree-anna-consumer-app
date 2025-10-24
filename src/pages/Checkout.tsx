import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, CreditCard, Wallet, Building2, QrCode, Tag } from "lucide-react";
import foxtailImage from "@/assets/product-foxtail.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryType, setDeliveryType] = useState("home");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [couponCode, setCouponCode] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to checkout");
      navigate("/auth");
    }
  }, [user, navigate]);

  const cartItems = [
    {
      id: "1",
      name: "Organic Foxtail Millet - 1kg",
      image: foxtailImage,
      price: 180,
      quantity: 2,
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 40;
  const discount = 0;
  const total = subtotal + shipping - discount;

  const handlePlaceOrder = async () => {
    if (!user) return;

    try {
      const orderNumber = "SHR-" + Math.random().toString(36).substr(2, 9).toUpperCase();
      const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          order_number: orderNumber,
          status: "confirmed",
          total_amount: total,
          shipping_address: formData,
          payment_method: paymentMethod,
          estimated_delivery: estimatedDelivery,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_name: item.name,
        product_image: item.image,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      toast.success("Order placed successfully!");
      navigate("/order-confirmation");
    } catch (error: any) {
      console.error("Error creating order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                1
              </div>
              <span className="ml-2 text-sm hidden md:inline">Delivery</span>
            </div>
            <div className={`h-0.5 w-12 md:w-24 ${currentStep >= 2 ? 'bg-primary' : 'bg-muted'}`} />
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                2
              </div>
              <span className="ml-2 text-sm hidden md:inline">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <Card className="animate-fade-in">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Delivery Address</h2>
                  
                  <RadioGroup value={deliveryType} onValueChange={setDeliveryType} className="mb-6">
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                      <RadioGroupItem value="home" id="home" />
                      <Label htmlFor="home" className="cursor-pointer flex-1">
                        Deliver to my address
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="cursor-pointer flex-1">
                        📍 Deliver to My Village Pickup Point
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input 
                          id="name" 
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="mobile">Mobile Number *</Label>
                        <Input 
                          id="mobile" 
                          placeholder="+91 XXXXX XXXXX" 
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address1">Address Line 1 *</Label>
                      <Input 
                        id="address1" 
                        placeholder="House No., Street Name"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="landmark">Landmark</Label>
                      <Input 
                        id="landmark" 
                        placeholder="Near..."
                        value={formData.landmark}
                        onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input 
                          id="city" 
                          placeholder="City"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input 
                          id="state" 
                          placeholder="State"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input 
                          id="pincode" 
                          placeholder="000000"
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        />
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <MapPin className="mr-2 h-4 w-4" />
                      Use Current Location
                    </Button>
                  </div>

                  <Button 
                    className="w-full mt-6" 
                    size="lg"
                    onClick={() => setCurrentStep(2)}
                  >
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card className="animate-fade-in">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Select Payment Method</h2>
                  
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                    <div className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary">
                      <RadioGroupItem value="upi" id="upi" />
                      <QrCode className="h-5 w-5 text-muted-foreground" />
                      <Label htmlFor="upi" className="cursor-pointer flex-1">
                        <div className="font-semibold">UPI</div>
                        <div className="text-sm text-muted-foreground">Pay via Google Pay, PhonePe, Paytm</div>
                      </Label>
                      <Badge variant="secondary">Preferred</Badge>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary">
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <Label htmlFor="card" className="cursor-pointer flex-1">
                        <div className="font-semibold">Credit/Debit Card</div>
                        <div className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <Label htmlFor="netbanking" className="cursor-pointer flex-1">
                        <div className="font-semibold">Net Banking</div>
                        <div className="text-sm text-muted-foreground">All Indian banks</div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary">
                      <RadioGroupItem value="wallet" id="wallet" />
                      <Wallet className="h-5 w-5 text-muted-foreground" />
                      <Label htmlFor="wallet" className="cursor-pointer flex-1">
                        <div className="font-semibold">Wallets</div>
                        <div className="text-sm text-muted-foreground">Paytm, PhonePe, Amazon Pay</div>
                      </Label>
                    </div>
                  </RadioGroup>

                  <Separator className="my-6" />

                  <div>
                    <Label htmlFor="voucher">Government Discount Voucher</Label>
                    <div className="flex gap-2 mt-2">
                      <Input id="voucher" placeholder="Enter voucher code" />
                      <Button variant="outline">Apply</Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      🏛️ Enter PMFBY or state scheme voucher code
                    </p>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setCurrentStep(1)}
                    >
                      Back
                    </Button>
                    <Button 
                      className="flex-1" 
                      size="lg"
                      onClick={handlePlaceOrder}
                    >
                      Pay Securely ₹{total}
                    </Button>
                  </div>

                  <p className="text-center text-xs text-muted-foreground mt-4">
                    Payments powered by Escrow | Secure by NPCI
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold text-primary">₹{item.price * item.quantity}</p>
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
                    <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">₹{total}</span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Apply coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button variant="outline" size="icon">
                      <Tag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
