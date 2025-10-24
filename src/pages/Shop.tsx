import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopCard from "@/components/ShopCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Map } from "lucide-react";

const shops = [
  {
    id: "1",
    name: "Dharwad FPO",
    description: "Direct from farmers in Karnataka. Organic certified millets with traditional farming methods.",
    region: "Karnataka",
    rating: 4.8,
    certifications: ["Organic", "FSSAI"],
  },
  {
    id: "2",
    name: "Maharashtra Millet Co.",
    description: "Premium quality jowar and bajra from Maharashtra's heartland. Supporting 500+ farmers.",
    region: "Maharashtra",
    rating: 4.7,
    certifications: ["FSSAI", "ISO"],
  },
  {
    id: "3",
    name: "Tamil Nadu Grains",
    description: "Ragi and foxtail millet specialists. Family-owned business for 3 generations.",
    region: "Tamil Nadu",
    rating: 4.9,
    certifications: ["Organic", "FSSAI", "Fair Trade"],
  },
  {
    id: "4",
    name: "Rajasthan Millets",
    description: "Drought-resistant millet varieties from Rajasthan. Empowering desert farmers.",
    region: "Rajasthan",
    rating: 4.6,
    certifications: ["FSSAI"],
  },
  {
    id: "5",
    name: "Andhra Organics",
    description: "Certified organic millet products. From farm to your table in 48 hours.",
    region: "Andhra Pradesh",
    rating: 4.8,
    certifications: ["Organic", "FSSAI"],
  },
  {
    id: "6",
    name: "Gujarat Grains Hub",
    description: "Premium processed millet products. Supporting tribal farming communities.",
    region: "Gujarat",
    rating: 4.5,
    certifications: ["FSSAI", "ISO"],
  },
];

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [showMapView, setShowMapView] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Buy Directly from India's Millet Entrepreneurs 🌾
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with verified sellers, FPOs, and startups
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-card border-b">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search shops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="md:w-48">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="karnataka">Karnataka</SelectItem>
                <SelectItem value="maharashtra">Maharashtra</SelectItem>
                <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                <SelectItem value="rajasthan">Rajasthan</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Checkbox id="organic" />
              <label htmlFor="organic" className="text-sm font-medium">
                Organic Only
              </label>
            </div>
            <Button
              variant={showMapView ? "default" : "outline"}
              onClick={() => setShowMapView(!showMapView)}
            >
              <Map className="h-4 w-4 mr-2" />
              Map View
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Sellers */}
      <section className="py-12 bg-secondary/5">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">Featured Sellers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {shops.slice(0, 3).map((shop) => (
              <ShopCard key={shop.id} {...shop} />
            ))}
          </div>
        </div>
      </section>

      {/* All Shops */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">All Shops</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {shops.map((shop) => (
              <ShopCard key={shop.id} {...shop} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Want to sell your millet products?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our marketplace and connect with thousands of customers across India
          </p>
          <Button size="lg">Join as a Seller</Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
