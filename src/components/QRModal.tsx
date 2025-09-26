import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, Download, Share, Copy, Shield } from "lucide-react";
import type { BookingReceipt } from "./BookingModal";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface QRModalProps {
  receipt: BookingReceipt | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QRModal({ receipt, isOpen, onClose }: QRModalProps) {
  const { toast } = useToast();
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    if (receipt) {
      // Generate a simple QR code representation
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = 300;
        canvas.height = 300;
        
        // White background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 300, 300);
        
        // Create QR pattern simulation
        ctx.fillStyle = '#000000';
        const blockSize = 10;
        for (let x = 0; x < 30; x++) {
          for (let y = 0; y < 30; y++) {
            if (Math.random() > 0.5) {
              ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
            }
          }
        }
        
        // Add corner markers
        const cornerSize = 7 * blockSize;
        ctx.fillStyle = '#000000';
        // Top-left
        ctx.fillRect(0, 0, cornerSize, cornerSize);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(blockSize, blockSize, cornerSize - 2 * blockSize, cornerSize - 2 * blockSize);
        ctx.fillStyle = '#000000';
        ctx.fillRect(2 * blockSize, 2 * blockSize, cornerSize - 4 * blockSize, cornerSize - 4 * blockSize);
        
        // Top-right
        ctx.fillStyle = '#000000';
        ctx.fillRect(300 - cornerSize, 0, cornerSize, cornerSize);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(300 - cornerSize + blockSize, blockSize, cornerSize - 2 * blockSize, cornerSize - 2 * blockSize);
        ctx.fillStyle = '#000000';
        ctx.fillRect(300 - cornerSize + 2 * blockSize, 2 * blockSize, cornerSize - 4 * blockSize, cornerSize - 4 * blockSize);
        
        // Bottom-left
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 300 - cornerSize, cornerSize, cornerSize);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(blockSize, 300 - cornerSize + blockSize, cornerSize - 2 * blockSize, cornerSize - 2 * blockSize);
        ctx.fillStyle = '#000000';
        ctx.fillRect(2 * blockSize, 300 - cornerSize + 2 * blockSize, cornerSize - 4 * blockSize, cornerSize - 4 * blockSize);
        
        setQrDataUrl(canvas.toDataURL());
      }
    }
  }, [receipt]);

  if (!receipt) return null;

  const shareQR = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Rental Receipt QR Code',
        text: `Verification QR for ${receipt.propertyTitle}`,
        url: receipt.qrCode
      });
    } else {
      navigator.clipboard.writeText(receipt.qrCode);
      toast({
        title: "Link Copied!",
        description: "Verification link copied to clipboard",
      });
    }
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.download = `receipt-${receipt.id}.png`;
    link.href = qrDataUrl;
    link.click();
    
    toast({
      title: "Downloaded!",
      description: "QR code saved to your device",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto gradient-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center">
            <QrCode className="w-5 h-5 text-primary" />
            Rental Receipt QR Code
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card className="gradient-primary">
            <CardContent className="p-4 text-white text-center">
              <h3 className="font-semibold mb-1">{receipt.propertyTitle}</h3>
              <p className="text-sm opacity-90">KSh {receipt.amount.toLocaleString()} • {receipt.status}</p>
            </CardContent>
          </Card>
          
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg shadow-large">
              <img 
                src={qrDataUrl} 
                alt="Receipt QR Code"
                className="w-64 h-64 object-contain"
              />
            </div>
          </div>
          
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-success" />
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                Blockchain Verified
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Landlords can scan this QR to verify your booking
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Verification URL:</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs bg-muted px-3 py-2 rounded truncate">
                {receipt.qrCode}
              </code>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(receipt.qrCode);
                  toast({ title: "Copied!", description: "Verification URL copied" });
                }}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={downloadQR}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="default" className="flex-1" onClick={shareQR}>
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}