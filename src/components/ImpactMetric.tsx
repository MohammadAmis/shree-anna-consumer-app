import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ImpactMetricProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

const ImpactMetric = ({ icon: Icon, value, label }: ImpactMetricProps) => {
  return (
    <Card className="border-2 hover:border-primary transition-colors">
      <CardContent className="pt-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="text-3xl font-bold text-primary mb-2">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
};

export default ImpactMetric;
