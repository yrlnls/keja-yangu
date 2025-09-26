import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Shield, ExternalLink, Copy, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import type { BookingReceipt } from "./BookingModal";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

interface ReceiptCardProps {
  receipt: BookingReceipt;
  onShowQR: (receipt: BookingReceipt) => void;
}

export function ReceiptCard({ receipt, onShowQR }: ReceiptCardProps) {
  const { toast } = useToast();
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    // Generate QR code data URL (simulated)
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = 200;
      canvas.height = 200;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 200, 200);
      ctx.fillStyle = '#000000';
      ctx.font = '12px monospace';
      ctx.fillText('QR Code', 70, 100);
      ctx.fillText(receipt.id, 50, 120);
      setQrDataUrl(canvas.toDataURL());
    }
  }, [receipt.id]);

  const getStatusIcon = () => {
    switch (receipt.status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'expired':
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusColor = () => {
    switch (receipt.status) {
      case 'active':
        return 'default';
      case 'expired':
        return 'secondary';
      default:
        return 'destructive';
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="gradient-card transition-all duration-300 hover:shadow-large">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">{receipt.propertyTitle}</h3>
          </div>
          <Badge variant={getStatusColor() as any} className="flex items-center gap-1">
            {getStatusIcon()}
            {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Amount</p>
            <p className="font-semibold text-primary">KSh {receipt.amount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Duration</p>
            <p className="font-semibold">{formatDate(receipt.startDate)} - {formatDate(receipt.endDate)}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">NFT ID:</span>
            <div className="flex items-center gap-2">
              <code className="text-xs bg-muted px-2 py-1 rounded">{receipt.nftId}</code>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => copyToClipboard(receipt.nftId, 'NFT ID')}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Transaction:</span>
            <div className="flex items-center gap-2">
              <code className="text-xs bg-muted px-2 py-1 rounded">
                {receipt.paymentTx.slice(0, 8)}...{receipt.paymentTx.slice(-6)}
              </code>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => copyToClipboard(receipt.paymentTx, 'Transaction Hash')}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
            onClick={() => onShowQR(receipt)}
          >
            <QrCode className="w-4 h-4 mr-2" />
            Show QR Code
          </Button>
          <Button variant="outline" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            View on Sui
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}