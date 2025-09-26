import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { QrCode, Shield, CheckCircle, XCircle, Search, Camera, MapPin, Calendar, User, Wallet } from "lucide-react";
import type { BookingReceipt } from "./BookingModal";

interface VerificationPageProps {
  receipts: BookingReceipt[];
}

export function VerificationPage({ receipts }: VerificationPageProps) {
  const [verificationId, setVerificationId] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    receipt: BookingReceipt | null;
    status: 'pending' | 'valid' | 'invalid' | 'expired';
  }>({ receipt: null, status: 'pending' });
  const [isScanning, setIsScanning] = useState(false);

  const handleVerification = () => {
    const receipt = receipts.find(r => 
      r.id === verificationId || 
      r.nftId === verificationId || 
      r.qrCode.includes(verificationId)
    );
    
    if (receipt) {
      const currentDate = new Date();
      const endDate = new Date(receipt.endDate);
      const status = currentDate > endDate ? 'expired' : 'valid';
      
      setVerificationResult({ receipt, status });
    } else {
      setVerificationResult({ receipt: null, status: 'invalid' });
    }
  };

  const startQRScan = () => {
    setIsScanning(true);
    // Simulate QR scan
    setTimeout(() => {
      const randomReceipt = receipts[Math.floor(Math.random() * receipts.length)];
      if (randomReceipt) {
        setVerificationId(randomReceipt.id);
        setVerificationResult({ receipt: randomReceipt, status: 'valid' });
      }
      setIsScanning(false);
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Verify Rental Receipt</h1>
        <p className="text-muted-foreground">
          Scan QR code or enter receipt details to verify booking authenticity
        </p>
      </div>
      
      <Card className="gradient-card">
        <CardHeader>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <QrCode className="w-5 h-5 text-primary" />
            Verification Methods
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="hero"
              className="h-20 flex-col gap-2"
              onClick={startQRScan}
              disabled={isScanning}
            >
              <Camera className="w-6 h-6" />
              {isScanning ? 'Scanning...' : 'Scan QR Code'}
            </Button>
            
            <div className="space-y-2">
              <Label htmlFor="manualId">Manual Entry</Label>
              <div className="flex gap-2">
                <Input
                  id="manualId"
                  placeholder="Receipt ID or NFT ID"
                  value={verificationId}
                  onChange={(e) => setVerificationId(e.target.value)}
                />
                <Button variant="default" onClick={handleVerification}>
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {verificationResult.status !== 'pending' && (
        <Card className={`${
          verificationResult.status === 'valid' 
            ? 'border-success bg-success/5' 
            : verificationResult.status === 'expired'
            ? 'border-warning bg-warning/5'
            : 'border-destructive bg-destructive/5'
        }`}>
          <CardHeader>
            <div className="flex items-center gap-3">
              {verificationResult.status === 'valid' ? (
                <CheckCircle className="w-6 h-6 text-success" />
              ) : verificationResult.status === 'expired' ? (
                <CheckCircle className="w-6 h-6 text-warning" />
              ) : (
                <XCircle className="w-6 h-6 text-destructive" />
              )}
              
              <div>
                <h3 className="font-semibold">
                  {verificationResult.status === 'valid' && 'Verified Receipt'}
                  {verificationResult.status === 'expired' && 'Expired Receipt'}
                  {verificationResult.status === 'invalid' && 'Invalid Receipt'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {verificationResult.status === 'valid' && 'This receipt is authentic and active'}
                  {verificationResult.status === 'expired' && 'This receipt was valid but has expired'}
                  {verificationResult.status === 'invalid' && 'No matching receipt found'}
                </p>
              </div>
              
              <Badge 
                variant={
                  verificationResult.status === 'valid' ? 'default' : 
                  verificationResult.status === 'expired' ? 'secondary' : 
                  'destructive'
                }
                className={
                  verificationResult.status === 'valid' 
                    ? 'bg-success text-success-foreground' 
                    : verificationResult.status === 'expired'
                    ? 'bg-warning text-warning-foreground'
                    : ''
                }
              >
                {verificationResult.status.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          
          {verificationResult.receipt && (
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{verificationResult.receipt.propertyTitle}</p>
                      <p className="text-sm text-muted-foreground">Property</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium font-mono text-sm">
                        {verificationResult.receipt.tenantWallet.slice(0, 8)}...{verificationResult.receipt.tenantWallet.slice(-6)}
                      </p>
                      <p className="text-sm text-muted-foreground">Tenant Wallet</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-primary">KSh {verificationResult.receipt.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Monthly Rent</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {formatDate(verificationResult.receipt.startDate)} - {formatDate(verificationResult.receipt.endDate)}
                      </p>
                      <p className="text-sm text-muted-foreground">Rental Period</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium font-mono text-sm">{verificationResult.receipt.nftId}</p>
                      <p className="text-sm text-muted-foreground">NFT ID</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{formatDate(verificationResult.receipt.timestamp)}</p>
                      <p className="text-sm text-muted-foreground">Minted On</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  <strong>Transaction Hash:</strong> {verificationResult.receipt.paymentTx}
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      )}
      
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-primary mb-1">How Verification Works</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Each booking generates a unique NFT receipt on Sui blockchain</li>
                <li>• QR codes contain tamper-proof verification links</li>
                <li>• All receipt data is cryptographically secured</li>
                <li>• Expired or invalid receipts are clearly marked</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}