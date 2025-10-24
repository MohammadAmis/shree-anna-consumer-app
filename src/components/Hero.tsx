import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, Award, Truck } from "lucide-react";
import { useState, useEffect } from "react";
import heroImage1 from "@/assets/about-hero.jpg";
import heroImage2 from "@/assets/hero-banner.jpg"; 
import heroImage3 from "@/assets/product-finger.jpg";
import heroImage4 from "@/assets/product-foxtail.jpg";
import heroImage5 from "@/assets/product-pearl.jpg";
import heroImage6 from "@/assets/product-ragi.jpg";
import heroImage7 from "@/assets/recipe-bajra-khichdi.jpg";
import heroImage8 from "@/assets/recipes-hero.jpg";

export const Hero = () => {
  const images = [
    heroImage1,
    heroImage2,
    heroImage3,
    heroImage4,
    heroImage5,
    heroImage6,
    heroImage7,
    heroImage8,
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  return (
    <section className="relative overflow-hidden grain-texture">
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Right Carousel - On small screens it will be at the top */}
          <div 
            className="relative lg:order-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={images[currentImageIndex]}
                alt={`Premium millet product ${currentImageIndex + 1}`}
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            {/* Floating Badge - Only visible on large screens */}
            <div className="absolute -bottom-6 -left-6 bg-card border-2 border-primary rounded-2xl p-6 shadow-xl hidden lg:block">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl">🌾</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Farm Fresh</p>
                  <p className="text-sm text-muted-foreground">Direct Sourcing</p>
                </div>
              </div>
            </div>
          </div>

          {/* Left Content - On small screens it will be at the bottom */}
          <div className="space-y-6 lg:order-1">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary-foreground border border-secondary/30">
                <Award className="h-4 w-4" />
                <span className="text-sm font-medium">India's #1 Millet Marketplace</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground leading-tight">
              Nourish Your Life with
              <span className="text-primary block mt-2">Ancient Supergrains</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl">
              Direct from farmers to your table. Premium quality millets certified for purity, 
              nutrition, and sustainability. Support local farmers while choosing healthier living.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="default" size="lg" className="gap-2">
                <ShoppingBag className="h-5 w-5" />
                Start Shopping
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Search className="h-5 w-5" />
                Explore Products
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-primary">
                  <Award className="h-5 w-5" />
                  <span className="font-semibold text-2xl">100%</span>
                </div>
                <p className="text-xs text-muted-foreground">QA Certified</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-primary">
                  <Truck className="h-5 w-5" />
                  <span className="font-semibold text-2xl">2-3</span>
                </div>
                <p className="text-xs text-muted-foreground">Days Delivery</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-primary">
                  <span className="font-semibold text-2xl">500+</span>
                </div>
                <p className="text-xs text-muted-foreground">Farmers Connected</p>
              </div>
            </div>
            
            {/* Farm Fresh Card - Only visible on small screens */}
            <div className="block lg:hidden mt-8">
              <div className="bg-card border-2 border-primary rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-3xl">🌾</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Farm Fresh</p>
                    <p className="text-sm text-muted-foreground">Direct Sourcing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration - Hide on small screens */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none hidden lg:block">
        <div className="text-[20rem] leading-none text-primary">🌾</div>
      </div>
    </section>
  );
};