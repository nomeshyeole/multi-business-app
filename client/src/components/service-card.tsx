import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  icon: React.ReactNode;
  badge: string;
}

export default function ServiceCard({ title, description, imageUrl, imageAlt, icon, badge }: ServiceCardProps) {
  return (
    <Card className="service-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      <img 
        src={imageUrl} 
        alt={imageAlt} 
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex items-center mb-3">
          <div className="text-primary text-2xl mr-3">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-secondary">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-accent font-semibold">{badge}</span>
          <button className="text-primary hover:text-blue-700 transition-colors">
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
