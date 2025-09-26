import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Bed, Calendar } from "lucide-react";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  bedrooms: number;
  maxOccupancy: number;
  type: string;
  available: boolean;
}

interface PropertyCardProps {
  property: Property;
  onBook: (property: Property) => void;
}

export function PropertyCard({ property, onBook }: PropertyCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-large hover:scale-[1.02] cursor-pointer gradient-card">
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <Badge variant={property.available ? "default" : "secondary"} className="bg-primary text-primary-foreground shadow-medium">
            {property.available ? "Available" : "Occupied"}
          </Badge>
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="outline" className="bg-white/90 text-foreground border-border">
            {property.type}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              {property.location}
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              {property.bedrooms} bed{property.bedrooms > 1 ? 's' : ''}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              Max {property.maxOccupancy}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="text-2xl font-bold text-primary">
              KSh {property.price.toLocaleString()}
              <span className="text-sm font-normal text-muted-foreground">/month</span>
            </div>
            <Button 
              variant="hero" 
              size="sm"
              onClick={() => onBook(property)}
              disabled={!property.available}
              className="transition-bounce"
            >
              <Calendar className="w-4 h-4 mr-1" />
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}