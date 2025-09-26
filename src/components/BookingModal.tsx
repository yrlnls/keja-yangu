import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CreditCard, Shield, Wallet, CheckCircle } from "lucide-react";
import type { Property } from "./PropertyCard";

interface BookingModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete: (receipt: BookingReceipt) => void;
}

export interface BookingReceipt {
  id: string;
  propertyId: string;
  propertyTitle: string;
  tenantWallet: string;
  landlordWallet: string;
  amount: number;
  startDate: string;
  endDate: string;
  paymentTx: string;
  nftId: string;
  qrCode: string;
  timestamp: string;
  status: 'active' | 'expired' | 'verified';
}

export function BookingModal({ property, isOpen, onClose, onBookingComplete }: BookingModalProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'complete'>('details');
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    tenantWallet: '0x1a2b3c4d5e6f7890123456789abcdef',
    tenantName: '',
    tenantEmail: '',
    tenantPhone: '',
  });

  const handlePayment = async () => {
    if (!property) return;
    
    setStep('processing');
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate receipt
    const receiptId = `receipt_${Date.now()}`;
    const nftId = `nft_${Math.random().toString(36).substr(2, 9)}`;
    const receipt: BookingReceipt = {
      id: receiptId,
      propertyId: property.id,
      propertyTitle: property.title,
      tenantWallet: formData.tenantWallet,
      landlordWallet: '0x9876543210fedcba0987654321abcdef',
      amount: property.price,
      startDate: formData.startDate,
      endDate: formData.endDate,
      paymentTx: `0x${Math.random().toString(16).substr(2, 64)}`,
      nftId,
      qrCode: `https://kejayangu.com/verify/${receiptId}`,
      timestamp: new Date().toISOString(),
      status: 'active'
    };
    
    setStep('complete');
    onBookingComplete(receipt);
  };

  if (!property) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto gradient-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Book {property.title}
          </DialogTitle>
        </DialogHeader>
        
        {step === 'details' && (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{property.title}</h3>
                    <p className="text-sm text-muted-foreground">{property.location}</p>
                  </div>
                  <Badge variant="default" className="bg-primary text-primary-foreground">
                    KSh {property.price.toLocaleString()}/month
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="tenantName">Full Name</Label>
                <Input
                  id="tenantName"
                  value={formData.tenantName}
                  onChange={(e) => setFormData({...formData, tenantName: e.target.value})}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <Label htmlFor="tenantEmail">Email</Label>
                <Input
                  id="tenantEmail"
                  type="email"
                  value={formData.tenantEmail}
                  onChange={(e) => setFormData({...formData, tenantEmail: e.target.value})}
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <Label htmlFor="tenantPhone">Phone Number</Label>
                <Input
                  id="tenantPhone"
                  value={formData.tenantPhone}
                  onChange={(e) => setFormData({...formData, tenantPhone: e.target.value})}
                  placeholder="+254 700 000 000"
                />
              </div>
              
              <div>
                <Label htmlFor="tenantWallet">Sui Wallet Address</Label>
                <Input
                  id="tenantWallet"
                  value={formData.tenantWallet}
                  onChange={(e) => setFormData({...formData, tenantWallet: e.target.value})}
                  className="font-mono text-xs"
                />
              </div>
            </div>
            
            <Button 
              variant="hero" 
              className="w-full" 
              onClick={() => setStep('payment')}
              disabled={!formData.startDate || !formData.endDate || !formData.tenantName}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Continue to Payment
            </Button>
          </div>
        )}
        
        {step === 'payment' && (
          <div className="space-y-4">
            <Card className="gradient-primary">
              <CardContent className="p-4 text-white">
                <div className="text-center">
                  <h3 className="font-semibold mb-2">Payment Summary</h3>
                  <div className="text-2xl font-bold">KSh {property.price.toLocaleString()}</div>
                  <p className="text-sm opacity-90">Monthly Rent</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Wallet className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment Method</p>
                  <p className="text-xs text-muted-foreground">Sui Testnet (Test Tokens)</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg border border-success/20">
                <Shield className="w-5 h-5 text-success" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-success">Blockchain Protected</p>
                  <p className="text-xs text-muted-foreground">Receipt minted as NFT on Sui</p>
                </div>
              </div>
            </div>
            
            <Button 
              variant="success" 
              className="w-full" 
              onClick={handlePayment}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Pay & Generate NFT Receipt
            </Button>
          </div>
        )}
        
        {step === 'processing' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center animate-pulse">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Processing Payment...</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Minting your NFT receipt on Sui blockchain
            </p>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full w-3/4 transition-all duration-1000"></div>
            </div>
          </div>
        )}
        
        {step === 'complete' && (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-verify flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-success mb-2">Booking Confirmed!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your NFT receipt has been minted and sent to your wallet
            </p>
            <Button variant="success" className="w-full" onClick={onClose}>
              View My Receipts
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}