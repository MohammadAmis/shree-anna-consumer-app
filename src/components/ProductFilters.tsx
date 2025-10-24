import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ProductFiltersProps {
  regions?: string[];
  certifications?: string[];
  varieties?: string[];
  selectedRegions: string[];
  selectedCertifications: string[];
  selectedVarieties: string[];
  priceRange: [number, number];
  onRegionChange: (region: string) => void;
  onCertificationChange: (cert: string) => void;
  onVarietyChange: (variety: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onReset: () => void;
}

const ProductFilters = ({
  regions = [],
  certifications = [],
  varieties = [],
  selectedRegions,
  selectedCertifications,
  selectedVarieties,
  priceRange,
  onRegionChange,
  onCertificationChange,
  onVarietyChange,
  onPriceRangeChange,
  onReset
}: ProductFiltersProps) => {
  return (
    <div className="space-y-6 p-6 bg-card rounded-lg border">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button variant="ghost" size="sm" className="h-8 text-muted-foreground" onClick={onReset}>
          Clear All
        </Button>
      </div>

      <Separator />

      {/* Millet Type */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Millet Type</h4>
        <div className="space-y-2">
          {varieties.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox 
                id={`type-${type}`} 
                checked={selectedVarieties.includes(type)}
                onCheckedChange={() => onVarietyChange(type)}
              />
              <Label htmlFor={`type-${type}`} className="text-sm font-normal cursor-pointer">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Certifications */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Certifications</h4>
        <div className="space-y-2">
          {certifications.map((cert) => (
            <div key={cert} className="flex items-center space-x-2">
              <Checkbox 
                id={`cert-${cert}`} 
                checked={selectedCertifications.includes(cert)}
                onCheckedChange={() => onCertificationChange(cert)}
              />
              <Label htmlFor={`cert-${cert}`} className="text-sm font-normal cursor-pointer">
                {cert}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Region */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Region</h4>
        <div className="space-y-2">
          {regions.map((region) => (
            <div key={region} className="flex items-center space-x-2">
              <Checkbox 
                id={`region-${region}`} 
                checked={selectedRegions.includes(region)}
                onCheckedChange={() => onRegionChange(region)}
              />
              <Label htmlFor={`region-${region}`} className="text-sm font-normal cursor-pointer">
                {region}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-medium text-sm">Price Range (₹/kg)</h4>
        <div className="px-2">
          <Slider 
            value={priceRange} 
            onValueChange={onPriceRangeChange}
            max={500} 
            min={0}
            step={10} 
          />
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;