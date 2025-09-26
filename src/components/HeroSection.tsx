import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, QrCode, ChevronRight } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <div 
      className="relative min-h-[600px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 py-20">
        <Badge variant="outline" className="mb-6 bg-white/10 text-white border-white/30 backdrop-blur-sm">
          <Shield className="w-3 h-3 mr-1" />
          Powered by Sui Blockchain
        </Badge>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Rent with <span className="gradient-hero bg-clip-text text-transparent">Confidence</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
          Get tamper-proof NFT receipts for every rental. No more fake bookings, disputes, or lost deposits.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={onGetStarted}
            className="text-lg px-8 py-4 shadow-glow"
          >
            Find Your Perfect Home
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
          >
            <QrCode className="w-5 h-5 mr-2" />
            Verify Receipt
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-2">Blockchain Verified</h3>
            <p className="text-sm text-white/80">Every receipt is an NFT on Sui blockchain</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-2">Instant Verification</h3>
            <p className="text-sm text-white/80">Landlords verify bookings with QR scan</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-2">Zero Fraud</h3>
            <p className="text-sm text-white/80">Tamper-proof receipts eliminate disputes</p>
          </div>
        </div>
      </div>
    </div>
  );
}