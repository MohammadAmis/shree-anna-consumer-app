import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import recipesHero from "@/assets/recipes-hero.jpg";
import ragiDosa from "@/assets/recipe-ragi-dosa.jpg";
import bajraKhichdi from "@/assets/recipe-bajra-khichdi.jpg";
import jowarRoti from "@/assets/recipe-jowar-roti.jpg";

const recipes = [
  {
    id: "1",
    name: "Ragi Dosa",
    image: ragiDosa,
    rating: 4.8,
    prepTime: "30 min",
    difficulty: "Easy",
    cuisine: "South Indian",
  },
  {
    id: "2",
    name: "Bajra Khichdi",
    image: bajraKhichdi,
    rating: 4.6,
    prepTime: "45 min",
    difficulty: "Medium",
    cuisine: "North Indian",
  },
  {
    id: "3",
    name: "Jowar Roti",
    image: jowarRoti,
    rating: 4.7,
    prepTime: "20 min",
    difficulty: "Easy",
    cuisine: "North Indian",
  },
  {
    id: "4",
    name: "Foxtail Millet Upma",
    image: bajraKhichdi,
    rating: 4.5,
    prepTime: "25 min",
    difficulty: "Easy",
    cuisine: "South Indian",
  },
  {
    id: "5",
    name: "Pearl Millet Porridge",
    image: ragiDosa,
    rating: 4.4,
    prepTime: "15 min",
    difficulty: "Easy",
    cuisine: "Fusion",
  },
  {
    id: "6",
    name: "Ragi Mudde",
    image: jowarRoti,
    rating: 4.9,
    prepTime: "40 min",
    difficulty: "Medium",
    cuisine: "South Indian",
  },
];

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [milletFilter, setMilletFilter] = useState("all");
  const [cuisineFilter, setCuisineFilter] = useState("all");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={recipesHero} alt="Millet recipes" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/60" />
        </div>
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Discover Delicious Millet Recipes 🍛
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Healthy, traditional, and modern recipes for every meal
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-card border-b">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={milletFilter} onValueChange={setMilletFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Millet Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Millets</SelectItem>
                <SelectItem value="ragi">Ragi</SelectItem>
                <SelectItem value="bajra">Bajra</SelectItem>
                <SelectItem value="jowar">Jowar</SelectItem>
                <SelectItem value="foxtail">Foxtail</SelectItem>
              </SelectContent>
            </Select>
            <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Cuisine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cuisines</SelectItem>
                <SelectItem value="south">South Indian</SelectItem>
                <SelectItem value="north">North Indian</SelectItem>
                <SelectItem value="fusion">Fusion</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} />
            ))}
          </div>
        </div>
      </section>

      {/* Chef's Specials */}
      <section className="py-16 bg-card">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Chef's Specials</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recipes.slice(0, 3).map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Recipes;
