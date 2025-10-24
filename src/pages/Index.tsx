import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {Hero} from "@/components/Hero";
import ProductCard  from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import foxtailImage from "@/assets/product-foxtail.jpg";
import pearlImage from "@/assets/product-pearl.jpg";
import fingerImage from "@/assets/product-finger.jpg";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SlidersHorizontal } from "lucide-react";

interface Product {
  id: string;
  name: string;
  variety: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  certifications: string[];
  region: string;
}

interface FilterState {
  regions: string[];
  certifications: string[];
  priceRange: [number, number];
  sortBy: string;
}

const Index = () => {
  const [showFilters, setShowFilters] = useState(false);
  
  // Initialize filter state
  const [filters, setFilters] = useState<FilterState>({
    regions: [],
    certifications: [],
    priceRange: [0, 1000],
    sortBy: 'popular'
  });

  const featuredProducts: Product[] = [
    {
      id: "1",
      name: "Organic Foxtail Millet - 1kg",
      variety: "Foxtail Millet",
      image: foxtailImage,
      price: 180,
      originalPrice: 250,
      rating: 4.5,
      reviews: 128,
      certifications: ["Organic", "FSSAI"],
      region: "Karnataka",
    },
    {
      id: "2",
      name: "Premium Pearl Millet (Bajra) - 1kg",
      variety: "Premium Bajra",
      image: pearlImage,
      price: 150,
      originalPrice: 200,
      rating: 4.7,
      reviews: 95,
      certifications: ["Organic"],
      region: "Rajasthan",
    },
    {
      id: "3",
      name: "Finger Millet (Ragi) Flour - 500g",
      variety: "Ragi Flour",
      image: fingerImage,
      price: 120,
      originalPrice: 160,
      rating: 4.8,
      reviews: 210,
      certifications: ["Organic", "FSSAI", "Gluten-Free"],
      region: "Tamil Nadu",
    },
    {
      id: "4",
      name: "Little Millet Mix",
      variety: "Samai Blend",
      image: foxtailImage,
      price: 200,
      originalPrice: 280,
      rating: 4.6,
      reviews: 76,
      certifications: ["Organic","APEDA"],
      region: "Maharashtra",
    },
    {
      id: "5",
      name: "Barnyard Millet Mix - 1kg",
      variety: "Sanwa",
      image: pearlImage,
      price: 220,
      originalPrice: 300,
      rating: 4.4,
      reviews: 54,
      certifications: ["Organic", "FSSAI"],
      region: "Karnataka",
    },
    {
      id: "6",
      name: "Kodo Millet Grains - 1kg",
      variety: "Kodra",
      image: fingerImage,
      price: 190,
      originalPrice: 250,
      rating: 4.5,
      reviews: 89,
      certifications: ["Organic","FSSAI","APEDA"],
      region: "Madhya Pradesh",
    },
  ];

  // Get unique regions and certifications for filters
  const allRegions = Array.from(new Set(featuredProducts.map(p => p.region)));
  const allCertifications = Array.from(new Set(featuredProducts.flatMap(p => p.certifications)));

  // Apply filters to products
  const filteredProducts = featuredProducts.filter(product => {
    // Region filter
    if (filters.regions.length > 0 && !filters.regions.includes(product.region)) {
      return false;
    }
    
    // Certification filter
    if (filters.certifications.length > 0 && 
        !filters.certifications.some(cert => product.certifications.includes(cert))) {
      return false;
    }
    
    // Price range filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    
    return true;
  });

  // Sort products based on current sort selection
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'newest':
        // For demo purposes, we'll reverse the order
        return featuredProducts.indexOf(b) - featuredProducts.indexOf(a);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'popular':
      default:
        return b.rating - a.rating; // Sort by rating for popular
    }
  });

  // Handle filter changes
  const handleRegionChange = (region: string) => {
    setFilters(prev => {
      if (prev.regions.includes(region)) {
        return {
          ...prev,
          regions: prev.regions.filter(r => r !== region)
        };
      } else {
        return {
          ...prev,
          regions: [...prev.regions, region]
        };
      }
    });
  };

  const handleCertificationChange = (cert: string) => {
    setFilters(prev => {
      if (prev.certifications.includes(cert)) {
        return {
          ...prev,
          certifications: prev.certifications.filter(c => c !== cert)
        };
      } else {
        return {
          ...prev,
          certifications: [...prev.certifications, cert]
        };
      }
    });
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: range
    }));
  };

  const handleSortChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      sortBy: value
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      regions: [],
      certifications: [],
      priceRange: [0, 1000],
      sortBy: 'popular'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />

        {/* Marketplace Section */}
        <section className="container mx-auto px-4 py-12">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Browse Premium Millets</h2>
              <p className="text-muted-foreground">Discover quality-certified supergrains from across India</p>
            </div>
            <Button
              variant="outline"
              className="lg:hidden gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Filters - Desktop */}
            <aside className="hidden lg:block">
              <ProductFilters 
                regions={allRegions}
                certifications={allCertifications}
                selectedRegions={filters.regions}
                selectedCertifications={filters.certifications}
                priceRange={filters.priceRange}
                onRegionChange={handleRegionChange}
                onCertificationChange={handleCertificationChange}
                onPriceRangeChange={handlePriceRangeChange}
                onReset={resetFilters}
              />
            </aside>

            {/* Filters - Mobile */}
            {showFilters && (
              <aside className="lg:hidden col-span-full">
                <ProductFilters 
                  regions={allRegions}
                  certifications={allCertifications}
                  selectedRegions={filters.regions}
                  selectedCertifications={filters.certifications}
                  priceRange={filters.priceRange}
                  onRegionChange={handleRegionChange}
                  onCertificationChange={handleCertificationChange}
                  onPriceRangeChange={handlePriceRangeChange}
                  onReset={resetFilters}
                />
              </aside>
            )}

            {/* Products Grid */}
            <div className="lg:col-span-3 space-y-6">
              {/* Sorting Tabs */}
              <Tabs value={filters.sortBy} onValueChange={handleSortChange} className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-4">
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="newest">Newest</TabsTrigger>
                  <TabsTrigger value="price-low">Price ↑</TabsTrigger>
                  <TabsTrigger value="price-high">Price ↓</TabsTrigger>
                </TabsList>

                <TabsContent value={filters.sortBy} className="mt-6">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProducts.map((product) => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Load More */}
              <div className="flex justify-center pt-8">
                <Button variant="outline" size="lg">
                  Load More Products
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Banner */}
        <section className="bg-muted/50 py-16 mt-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="space-y-3">
                <div className="text-5xl">🔬</div>
                <h3 className="font-semibold text-lg">Lab Tested Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Every batch tested for purity, moisture, and nutritional content
                </p>
              </div>
              <div className="space-y-3">
                <div className="text-5xl">⛓️</div>
                <h3 className="font-semibold text-lg">Blockchain Verified</h3>
                <p className="text-sm text-muted-foreground">
                  Complete farm-to-table traceability with QR codes
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                    <span className="text-3xl">✓</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold">100% Certified</h3>
                <p className="text-muted-foreground">
                  All products are approved and organically certified for your safety
                </p>
              </div>
              <div className="space-y-3">
                <div className="text-5xl">🤝</div>
                <h3 className="font-semibold text-lg">Fair Trade Certified</h3>
                <p className="text-sm text-muted-foreground">
                  Direct support to 500+ farmer producer organizations
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;