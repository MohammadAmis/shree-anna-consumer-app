import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImpactMetric from "@/components/ImpactMetric";
import { Users, TrendingUp, Award, Leaf } from "lucide-react";
import aboutHero from "@/assets/about-hero.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={aboutHero} alt="Millet farmers in fields" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50" />
        </div>
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Empowering Rural India through Shree Anna
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connecting farmers, processors, and consumers through transparency and sustainability
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To create a sustainable ecosystem that ensures fair trade for farmers while providing consumers with nutritious, traceable millet products. We empower small farmers and FPOs by connecting them directly with markets, eliminating middlemen, and ensuring better prices for their produce.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To revolutionize India's agricultural landscape by making millets a mainstream choice, promoting nutritional security, and building a transparent supply chain that benefits everyone from farmers to consumers. We envision a future where every millet grain can be traced back to its origin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Chain */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Value Chain</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Farmers & FPOs</h3>
              <p className="text-sm text-muted-foreground">Direct sourcing from certified farmers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">QA Labs</h3>
              <p className="text-sm text-muted-foreground">Rigorous testing and certification</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Processors</h3>
              <p className="text-sm text-muted-foreground">Quality processing and packaging</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Consumers</h3>
              <p className="text-sm text-muted-foreground">Healthy, traceable products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 bg-card">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <ImpactMetric icon={Users} value="10,000+" label="Farmers Connected" />
            <ImpactMetric icon={TrendingUp} value="50+" label="Millet Startups" />
            <ImpactMetric icon={Award} value="100+" label="Products Certified" />
            <ImpactMetric icon={Leaf} value="500+" label="Tons Processed" />
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Partners & Collaborations</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">🏛️ Government Schemes</h3>
              <p className="text-sm text-muted-foreground">Partnering with national millet missions</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">🤝 FPOs</h3>
              <p className="text-sm text-muted-foreground">Supporting farmer producer organizations</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">🚀 Startups</h3>
              <p className="text-sm text-muted-foreground">Empowering millet entrepreneurs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-card">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Leadership</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-16 w-16 text-primary" />
                </div>
                <h3 className="font-semibold">Team Member {i}</h3>
                <p className="text-sm text-muted-foreground">Position</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
