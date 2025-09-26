import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { PropertyCard, type Property } from "@/components/PropertyCard";
import { BookingModal, type BookingReceipt } from "@/components/BookingModal";
import { ReceiptCard } from "@/components/ReceiptCard";
import { QRModal } from "@/components/QRModal";
import { VerificationPage } from "@/components/VerificationPage";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Receipt, Shield } from "lucide-react";

// Import property images
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const mockProperties: Property[] = [
  {
    id: "prop_1",
    title: "Modern 2BR Apartment in Westlands",
    location: "Westlands, Nairobi",
    price: 45000,
    image: property1,
    bedrooms: 2,
    maxOccupancy: 4,
    type: "Apartment",
    available: true,
  },
  {
    id: "prop_2",
    title: "Cozy Studio in Kilimani",
    location: "Kilimani, Nairobi",
    price: 25000,
    image: property2,
    bedrooms: 1,
    maxOccupancy: 2,
    type: "Studio",
    available: true,
  },
  {
    id: "prop_3",
    title: "Spacious 3BR in Karen",
    location: "Karen, Nairobi",
    price: 75000,
    image: property3,
    bedrooms: 3,
    maxOccupancy: 6,
    type: "House",
    available: false,
  },
];

export default function KejaYangu() {
  const [currentView, setCurrentView] = useState<'hero' | 'properties' | 'booking' | 'receipts' | 'verify'>('hero');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<BookingReceipt | null>(null);
  const [receipts, setReceipts] = useState<BookingReceipt[]>([]);

  const handleViewChange = (view: 'properties' | 'booking' | 'receipts' | 'verify') => {
    if (view === 'properties') {
      setCurrentView('properties');
    } else {
      setCurrentView(view);
    }
  };

  const handleGetStarted = () => {
    setCurrentView('properties');
  };

  const handleBook = (property: Property) => {
    setSelectedProperty(property);
    setIsBookingModalOpen(true);
  };

  const handleBookingComplete = (receipt: BookingReceipt) => {
    setReceipts([receipt, ...receipts]);
    setIsBookingModalOpen(false);
    setCurrentView('receipts');
  };

  const handleShowQR = (receipt: BookingReceipt) => {
    setSelectedReceipt(receipt);
    setIsQRModalOpen(true);
  };

  if (currentView === 'hero') {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          currentView="properties" 
          onViewChange={handleViewChange}
        />
        <HeroSection onGetStarted={handleGetStarted} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentView={currentView} 
        onViewChange={handleViewChange}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'properties' && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Find Your Perfect Home
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Every booking comes with a blockchain-verified NFT receipt
              </p>
              <div className="flex justify-center gap-4 mb-8">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  <Shield className="w-3 h-3 mr-1" />
                  {mockProperties.filter(p => p.available).length} Available Properties
                </Badge>
                <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/30">
                  <Receipt className="w-3 h-3 mr-1" />
                  {receipts.length} Active Receipts
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onBook={handleBook}
                />
              ))}
            </div>
          </div>
        )}

        {currentView === 'receipts' && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                My Rental Receipts
              </h1>
              <p className="text-lg text-muted-foreground">
                Your blockchain-verified booking receipts
              </p>
            </div>
            
            {receipts.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <Receipt className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Receipts Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Your rental receipts will appear here after booking
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {receipts.map((receipt) => (
                  <ReceiptCard
                    key={receipt.id}
                    receipt={receipt}
                    onShowQR={handleShowQR}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {currentView === 'verify' && (
          <VerificationPage receipts={receipts} />
        )}
      </main>

      <BookingModal
        property={selectedProperty}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingComplete={handleBookingComplete}
      />

      <QRModal
        receipt={selectedReceipt}
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />
    </div>
  );
}