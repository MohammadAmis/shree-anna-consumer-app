import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingCart, User, Globe, Menu, LogOut, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [language, setLanguage] = useState("English");
  const { user, signOut } = useAuth();
  const location = useLocation();
  
  // Determine active link based on current path
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary">🌾 Shree Anna</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary relative ${
                isActive("/") ? "text-primary font-semibold" : "text-foreground"
              }`}
            >
              Home
              {isActive("/") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
              )}
            </Link>
            <Link 
              to="/shop" 
              className={`text-sm font-medium transition-colors hover:text-primary relative ${
                isActive("/shop") ? "text-primary font-semibold" : "text-foreground"
              }`}
            >
              Shop
              {isActive("/shop") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
              )}
            </Link>
            <Link 
              to="/recipes" 
              className={`text-sm font-medium transition-colors hover:text-primary relative ${
                isActive("/recipes") ? "text-primary font-semibold" : "text-foreground"
              }`}
            >
              Recipes
              {isActive("/recipes") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
              )}
            </Link>
            <Link 
              to="/traceability" 
              className={`text-sm font-medium transition-colors hover:text-primary relative ${
                isActive("/traceability") ? "text-primary font-semibold" : "text-foreground"
              }`}
            >
              Traceability
              {isActive("/traceability") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
              )}
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-primary relative ${
                isActive("/about") ? "text-primary font-semibold" : "text-foreground"
              }`}
            >
              About
              {isActive("/about") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
              )}
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for millet products..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("English")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("हिंदी")}>
                  हिंदी
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("తెలుగు")}>
                  తెలుగు
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("தமிழ்")}>
                  தமிழ்
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  0
                </span>
              </Button>
            </Link>

            {/* User Account */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/my-orders" className="flex items-center cursor-pointer">
                      <Package className="mr-2 h-4 w-4" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link 
                    to="/" 
                    className={`text-lg font-medium hover:text-primary relative ${
                      isActive("/") ? "text-primary font-semibold" : "text-foreground"
                    }`}
                  >
                    Home
                    {isActive("/") && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                    )}
                  </Link>
                  <Link 
                    to="/shop" 
                    className={`text-lg font-medium hover:text-primary relative ${
                      isActive("/shop") ? "text-primary font-semibold" : "text-foreground"
                    }`}
                  >
                    Shop
                    {isActive("/shop") && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                    )}
                  </Link>
                  <Link 
                    to="/recipes" 
                    className={`text-lg font-medium hover:text-primary relative ${
                      isActive("/recipes") ? "text-primary font-semibold" : "text-foreground"
                    }`}
                  >
                    Recipes
                    {isActive("/recipes") && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                    )}
                  </Link>
                  <Link 
                    to="/traceability" 
                    className={`text-lg font-medium hover:text-primary relative ${
                      isActive("/traceability") ? "text-primary font-semibold" : "text-foreground"
                    }`}
                  >
                    Traceability
                    {isActive("/traceability") && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                    )}
                  </Link>
                  <Link 
                    to="/about" 
                    className={`text-lg font-medium hover:text-primary relative ${
                      isActive("/about") ? "text-primary font-semibold" : "text-foreground"
                    }`}
                  >
                    About
                    {isActive("/about") && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                    )}
                  </Link>
                  {user && (
                    <Link 
                      to="/my-orders" 
                      className={`text-lg font-medium hover:text-primary relative ${
                        isActive("/my-orders") ? "text-primary font-semibold" : "text-foreground"
                      }`}
                    >
                      My Orders
                      {isActive("/my-orders") && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                      )}
                    </Link>
                  )}
                  <div className="pt-4 border-t">
                    <div className="text-sm font-medium mb-2">Language</div>
                    <div className="flex flex-col space-y-2">
                      <Button 
                        variant={language === "English" ? "secondary" : "ghost"} 
                        className="justify-start" 
                        onClick={() => setLanguage("English")}
                      >
                        English
                      </Button>
                      <Button 
                        variant={language === "हिंदी" ? "secondary" : "ghost"} 
                        className="justify-start" 
                        onClick={() => setLanguage("हिंदी")}
                      >
                        हिंदी
                      </Button>
                      <Button 
                        variant={language === "తెలుగు" ? "secondary" : "ghost"} 
                        className="justify-start" 
                        onClick={() => setLanguage("తెలుగు")}
                      >
                        తెలుగు
                      </Button>
                      <Button 
                        variant={language === "தமிழ்" ? "secondary" : "ghost"} 
                        className="justify-start" 
                        onClick={() => setLanguage("தமிழ்")}
                      >
                        தமிழ்
                      </Button>
                    </div>
                  </div>
                  {user && (
                    <div className="pt-4 border-t">
                      <Button variant="ghost" className="justify-start w-full text-destructive" onClick={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for millet products..."
              className="pl-10"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;