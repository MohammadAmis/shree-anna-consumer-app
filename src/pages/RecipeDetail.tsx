import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, ChefHat, Users, ShoppingCart, Heart, Share2, Printer } from "lucide-react";
import { useState } from "react";
import ragiDosa from "@/assets/recipe-ragi-dosa.jpg";
import bajraKhichdi from "@/assets/recipe-bajra-khichdi.jpg";
import jowarRoti from "@/assets/recipe-jowar-roti.jpg";

const recipes = {
  "1": {
    name: "Ragi Dosa",
    image: ragiDosa,
    rating: 4.8,
    reviews: 156,
    prepTime: "30 min",
    cookTime: "20 min",
    servings: 4,
    difficulty: "Easy",
    cuisine: "South Indian",
    description: "A nutritious and delicious breakfast option made with finger millet. Packed with calcium and iron, these dosas are crispy on the outside and soft inside.",
    ingredients: [
      { name: "Ragi flour", quantity: "1 cup", productId: "3" },
      { name: "Rice flour", quantity: "1/4 cup" },
      { name: "Urad dal", quantity: "1/4 cup" },
      { name: "Fenugreek seeds", quantity: "1 tsp" },
      { name: "Salt", quantity: "to taste" },
      { name: "Water", quantity: "as needed" },
      { name: "Oil", quantity: "for cooking" },
    ],
    instructions: [
      "Soak urad dal and fenugreek seeds together for 4-6 hours.",
      "Grind the soaked dal and fenugreek to a smooth batter.",
      "Mix ragi flour and rice flour in a bowl.",
      "Add the ground batter to the flour mixture and mix well.",
      "Add salt and water to make a dosa batter consistency.",
      "Let it ferment for 6-8 hours or overnight.",
      "Heat a dosa pan and spread oil.",
      "Pour a ladleful of batter and spread in circular motion.",
      "Cook on medium heat until edges turn golden and crispy.",
      "Flip and cook for another minute.",
      "Serve hot with chutney and sambar.",
    ],
    nutrition: {
      calories: 180,
      protein: "6g",
      carbs: "32g",
      fiber: "4g",
      iron: "2.5mg",
      calcium: "180mg",
    },
    tips: [
      "For crispier dosas, add a tablespoon of rice flour to the batter",
      "The batter can be stored in the refrigerator for up to 3 days",
      "You can add finely chopped onions and green chilies for variation",
    ],
  },
  "2": {
    name: "Bajra Khichdi",
    image: bajraKhichdi,
    rating: 4.6,
    reviews: 98,
    prepTime: "15 min",
    cookTime: "30 min",
    servings: 4,
    difficulty: "Medium",
    cuisine: "North Indian",
    description: "A wholesome one-pot meal made with pearl millet and lentils. Perfect comfort food that's nutritious and easy to digest.",
    ingredients: [
      { name: "Bajra (Pearl Millet)", quantity: "1 cup", productId: "2" },
      { name: "Moong dal", quantity: "1/2 cup" },
      { name: "Mixed vegetables", quantity: "1 cup" },
      { name: "Onion", quantity: "1, chopped" },
      { name: "Tomato", quantity: "1, chopped" },
      { name: "Ginger-garlic paste", quantity: "1 tbsp" },
      { name: "Cumin seeds", quantity: "1 tsp" },
      { name: "Turmeric powder", quantity: "1/2 tsp" },
      { name: "Salt", quantity: "to taste" },
      { name: "Ghee", quantity: "2 tbsp" },
    ],
    instructions: [
      "Wash and soak bajra for 30 minutes. Drain and set aside.",
      "Wash moong dal thoroughly.",
      "Heat ghee in a pressure cooker.",
      "Add cumin seeds and let them splutter.",
      "Add onions and sauté until golden brown.",
      "Add ginger-garlic paste and sauté for a minute.",
      "Add tomatoes and cook until soft.",
      "Add vegetables, bajra, moong dal, turmeric, and salt.",
      "Add 3 cups of water and mix well.",
      "Pressure cook for 4-5 whistles or until bajra is soft.",
      "Let the pressure release naturally.",
      "Garnish with coriander and serve hot with yogurt or pickle.",
    ],
    nutrition: {
      calories: 280,
      protein: "12g",
      carbs: "48g",
      fiber: "8g",
      iron: "3.2mg",
      calcium: "60mg",
    },
    tips: [
      "Soaking bajra reduces cooking time significantly",
      "You can use any seasonal vegetables for variation",
      "Add a squeeze of lemon before serving for extra flavor",
    ],
  },
  "3": {
    name: "Jowar Roti",
    image: jowarRoti,
    rating: 4.7,
    reviews: 134,
    prepTime: "20 min",
    cookTime: "20 min",
    servings: 6,
    difficulty: "Easy",
    cuisine: "North Indian",
    description: "Traditional Indian flatbread made from sorghum flour. Gluten-free and perfect to pair with any curry or dal.",
    ingredients: [
      { name: "Jowar flour", quantity: "2 cups", productId: "4" },
      { name: "Warm water", quantity: "as needed" },
      { name: "Salt", quantity: "1/2 tsp" },
      { name: "Oil", quantity: "1 tsp" },
    ],
    instructions: [
      "In a mixing bowl, add jowar flour and salt.",
      "Add warm water gradually and knead to make a soft dough.",
      "Add oil and knead again for 2-3 minutes.",
      "Cover and let it rest for 10 minutes.",
      "Divide the dough into equal portions.",
      "Take a portion and flatten it on your palm.",
      "Using a rolling board, roll into a circular shape.",
      "Heat a tawa on medium-high heat.",
      "Place the roti on the hot tawa.",
      "Cook for 30 seconds, flip and cook the other side.",
      "Apply ghee and serve hot.",
    ],
    nutrition: {
      calories: 160,
      protein: "5g",
      carbs: "35g",
      fiber: "5g",
      iron: "2mg",
      calcium: "40mg",
    },
    tips: [
      "Use warm water for softer rotis",
      "Don't over-knead the dough as jowar flour is gluten-free",
      "Roll between two plastic sheets for easier handling",
    ],
  },
};

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = recipes[id as keyof typeof recipes];
  const [savedRecipe, setSavedRecipe] = useState(false);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold">Recipe not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-8 bg-card">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="animate-fade-in">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Recipe Info */}
            <div className="animate-fade-in">
              <Badge className="mb-2">{recipe.cuisine}</Badge>
              <h1 className="text-4xl font-bold mb-4">{recipe.name}</h1>
              <p className="text-muted-foreground mb-6">{recipe.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Prep Time</div>
                    <div className="font-medium">{recipe.prepTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Cook Time</div>
                    <div className="font-medium">{recipe.cookTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Servings</div>
                    <div className="font-medium">{recipe.servings}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Difficulty</div>
                    <div className="font-medium">{recipe.difficulty}</div>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-secondary text-secondary" />
                  <span className="text-xl font-bold">{recipe.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({recipe.reviews} reviews)</span>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant={savedRecipe ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setSavedRecipe(!savedRecipe)}
                >
                  <Heart className={`h-4 w-4 mr-2 ${savedRecipe ? "fill-current" : ""}`} />
                  {savedRecipe ? "Saved" : "Save Recipe"}
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline">
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Ingredients Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Ingredients</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/cart">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Buy All
                      </Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start justify-between text-sm">
                        <span>
                          {ingredient.productId ? (
                            <Link
                              to={`/product/${ingredient.productId}`}
                              className="text-primary hover:underline"
                            >
                              {ingredient.name}
                            </Link>
                          ) : (
                            ingredient.name
                          )}
                        </span>
                        <span className="text-muted-foreground font-medium ml-2">
                          {ingredient.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Instructions & Details */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="instructions" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="instructions">Instructions</TabsTrigger>
                  <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                  <TabsTrigger value="tips">Tips</TabsTrigger>
                </TabsList>

                <TabsContent value="instructions" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Step-by-Step Instructions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-4">
                        {recipe.instructions.map((step, index) => (
                          <li key={index} className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                              {index + 1}
                            </div>
                            <p className="flex-1 pt-1 text-muted-foreground">{step}</p>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="nutrition" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Nutritional Information (Per Serving)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(recipe.nutrition).map(([key, value]) => (
                          <div key={key} className="flex justify-between p-4 bg-muted/50 rounded-lg">
                            <span className="font-medium capitalize">{key}</span>
                            <span className="text-primary font-bold">{value}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        * Nutritional values are approximate and may vary based on specific ingredients used
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="tips" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Chef's Tips & Tricks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {recipe.tips.map((tip, index) => (
                          <li key={index} className="flex gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-xs font-bold">
                              ✓
                            </div>
                            <p className="flex-1 text-muted-foreground">{tip}</p>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RecipeDetail;
