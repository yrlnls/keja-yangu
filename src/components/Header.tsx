import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Shield, QrCode, User } from "lucide-react";

interface HeaderProps {
  currentView: 'properties' | 'booking' | 'receipts' | 'verify';
  onViewChange: (view: 'properties' | 'booking' | 'receipts' | 'verify') => void;
  userType?: 'tenant' | 'landlord';
}

export function Header({ currentView, onViewChange, userType = 'tenant' }: HeaderProps) {
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-hero rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">KejaYangu</h1>
              <p className="text-xs text-muted-foreground">Blockchain-Verified Rentals</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-2">
            <Button
              variant={currentView === 'properties' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('properties')}
            >
              <Home className="w-4 h-4 mr-2" />
              Properties
            </Button>
            
            {userType === 'tenant' && (
              <Button
                variant={currentView === 'receipts' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewChange('receipts')}
              >
                <Shield className="w-4 h-4 mr-2" />
                My Receipts
              </Button>
            )}
            
            <Button
              variant={currentView === 'verify' ? 'premium' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('verify')}
            >
              <QrCode className="w-4 h-4 mr-2" />
              Verify Receipt
            </Button>
          </nav>
          
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              <Shield className="w-3 h-3 mr-1" />
              Sui Testnet
            </Badge>
            <Button variant="outline" size="sm">
              <User className="w-4 h-4 mr-2" />
              {userType === 'tenant' ? 'Tenant' : 'Landlord'}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 flex space-x-2 overflow-x-auto">
          <Button
            variant={currentView === 'properties' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('properties')}
          >
            Properties
          </Button>
          {userType === 'tenant' && (
            <Button
              variant={currentView === 'receipts' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('receipts')}
            >
              Receipts
            </Button>
          )}
          <Button
            variant={currentView === 'verify' ? 'premium' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('verify')}
          >
            Verify
          </Button>
        </div>
      </div>
    </header>
  );
}