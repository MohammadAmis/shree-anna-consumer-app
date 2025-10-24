import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, QrCode, CheckCircle, Download, Share2, Leaf, Award, Truck, ShoppingBag } from "lucide-react";
import traceabilityHero from "@/assets/traceability-hero.jpg";

const Traceability = () => {
  const [batchId, setBatchId] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (batchId) {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={traceabilityHero} alt="Traceability" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background/70" />
        </div>
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Trace Your Millet's Journey 🌱
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From Farm to Fork — Complete transparency powered by blockchain
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-card">
        <div className="container max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Enter Batch ID or Scan QR Code</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter Batch ID (e.g., MLT2025-KA-001)"
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={handleSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  Trace
                </Button>
                <Button variant="outline">
                  <QrCode className="h-4 w-4 mr-2" />
                  Scan QR
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      {showResults && (
        <>
          {/* Blockchain Verification Badge */}
          <section className="py-8 bg-success/5">
            <div className="container max-w-3xl text-center">
              <Badge className="text-lg px-6 py-2 bg-success text-success-foreground">
                <CheckCircle className="h-5 w-5 mr-2" />
                Verified via Blockchain
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">
                This product's journey has been verified and secured on the blockchain
              </p>
            </div>
          </section>

          {/* Timeline */}
          <section className="py-16">
            <div className="container max-w-4xl">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Product Journey Timeline</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Timeline Steps */}
              <div className="space-y-8">
                {/* Farm */}
                <Card className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Leaf className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="flex items-center justify-between">
                          <span>Farm Details</span>
                          <Badge>Step 1</Badge>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">15 Jan 2025</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pl-20">
                    <div className="space-y-2 text-sm">
                      <p><strong>Farmer:</strong> Rajesh Kumar</p>
                      <p><strong>FPO:</strong> Dharwad Millet Farmers Association</p>
                      <p><strong>Location:</strong> Dharwad, Karnataka</p>
                      <p><strong>Harvest Date:</strong> 10 Jan 2025</p>
                      <p><strong>Millet Type:</strong> Organic Foxtail Millet</p>
                      <p><strong>Quantity:</strong> 500 kg</p>
                    </div>
                  </CardContent>
                </Card>

                {/* QA Lab */}
                <Card className="border-l-4 border-l-accent">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <Award className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="flex items-center justify-between">
                          <span>Quality Assurance</span>
                          <Badge variant="secondary">Step 2</Badge>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">18 Jan 2025</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pl-20">
                    <div className="space-y-2 text-sm">
                      <p><strong>Lab:</strong> Karnataka Agricultural Testing Lab</p>
                      <p><strong>Test Date:</strong> 17 Jan 2025</p>
                      <p><strong>Certifications:</strong> FSSAI, Organic India</p>
                      <p><strong>Test Results:</strong> Passed all quality parameters</p>
                      <p><strong>Report ID:</strong> QA-2025-001-KA</p>
                      <Button variant="link" className="p-0 h-auto text-accent">
                        Download Lab Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Logistics */}
                <Card className="border-l-4 border-l-secondary">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                        <Truck className="h-6 w-6 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="flex items-center justify-between">
                          <span>Transportation</span>
                          <Badge variant="secondary">Step 3</Badge>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">20 Jan 2025</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pl-20">
                    <div className="space-y-2 text-sm">
                      <p><strong>Warehouse:</strong> Bangalore Central Warehouse</p>
                      <p><strong>Transporter:</strong> SafeGrain Logistics</p>
                      <p><strong>Storage Conditions:</strong> Temperature controlled</p>
                      <p><strong>Transit Duration:</strong> 2 days</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Buyer/Processor */}
                <Card className="border-l-4 border-l-success">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                        <ShoppingBag className="h-6 w-6 text-success" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="flex items-center justify-between">
                          <span>Processed & Packaged</span>
                          <Badge className="bg-success text-success-foreground">Step 4</Badge>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">25 Jan 2025</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pl-20">
                    <div className="space-y-2 text-sm">
                      <p><strong>Processor:</strong> Healthy Grains India Pvt Ltd</p>
                      <p><strong>Processing Date:</strong> 23 Jan 2025</p>
                      <p><strong>Package Size:</strong> 1 kg retail pack</p>
                      <p><strong>Batch ID:</strong> MLT2025-KA-001</p>
                      <p><strong>Best Before:</strong> 25 July 2025</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="py-16 bg-card">
            <div className="container max-w-4xl">
              <h2 className="text-2xl font-bold mb-6">Origin Location</h2>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">Map View</p>
                  <p className="text-sm">📍 Dharwad, Karnataka, India</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Educational Section */}
      <section className="py-16 bg-primary/5">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Why Traceability Matters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>🔍 <strong>Transparency:</strong> Know exactly where your food comes from</p>
                <p>✅ <strong>Quality Assurance:</strong> Verified testing at every stage</p>
                <p>🤝 <strong>Fair Trade:</strong> Support farmers directly</p>
                <p>🛡️ <strong>Food Safety:</strong> Quick recalls if needed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>How Blockchain Ensures Trust</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>🔐 <strong>Immutable Records:</strong> Data cannot be altered</p>
                <p>⏱️ <strong>Real-time Updates:</strong> Track at every checkpoint</p>
                <p>🔗 <strong>Decentralized:</strong> No single point of failure</p>
                <p>📊 <strong>Audit Trail:</strong> Complete history available</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Traceability;
