import type { Product } from '../data/products';
import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Send, Plus, Minus, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: { product: Product; quantity: number }[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearAll: () => void;
}

export const InquiryDrawer: React.FC<InquiryDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll
}) => {
  const [selectedSalesLine, setSelectedSalesLine] = useState<'line1' | 'line2'>('line1');
  const [destinationCountry, setDestinationCountry] = useState<string>('');

  if (!isOpen) return null;

  const phoneNumbers = {
    line1: '6289529107326',
    line2: '6281235075748'
  };

  const generateWhatsAppLink = () => {
    let text = `Hello Giri Ismoyo Craft Export Desk (Sanden, Bantul, Yogyakarta),\n\nI would like to request a formal B2B wholesale quotation for the following items:\n\n`;
    items.forEach((item, index) => {
      text += `${index + 1}. [${item.product.sku}] ${item.product.name}\n   - Material: ${item.product.material.split(',')[0]}\n   - Target Order Quantity: ${item.quantity} pcs\n`;
    });
    if (destinationCountry) {
      text += `\nDestination Country / Port: ${destinationCountry}\n`;
    }
    text += `\nPlease advise formal container/LCL quotation, production lead time, and packaging options.\nThank you!`;

    const number = phoneNumbers[selectedSalesLine];
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#132c19] text-[#f9f7f2] border-l border-[#d4af37]/30 shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header — B2B Wholesale Inquiry */}
          <div className="p-6 border-b border-[#d4af37]/20 flex items-center justify-between bg-[#0e2113]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#f7e7a9]">
                  Wholesale Inquiry List
                </h3>
                <p className="text-[11px] text-[#d9c3b3]">
                  {items.length} {items.length === 1 ? 'product' : 'products'} selected for trade quotation
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#d9c3b3] hover:text-white rounded-lg hover:bg-[#1d4226] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body - Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <FileText className="w-12 h-12 text-[#d4af37] mx-auto opacity-40" />
                <h4 className="text-base font-serif text-[#f7e7a9]">Your Inquiry List is Empty</h4>
                <p className="text-xs text-[#d9c3b3] max-w-xs mx-auto leading-relaxed">
                  Browse our natural fiber catalog and click <strong>"Add to Inquiry"</strong> to assemble your commercial request.
                </p>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="bg-[#0f2314] border border-[#d4af37]/25 p-4 flex gap-3 items-center justify-between shadow-sm"
                >
                  <div className="space-y-1 flex-1 min-w-0 pr-2">
                    <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase bg-[#132c19] px-2 py-0.5">
                      {product.sku}
                    </span>
                    <h5 className="text-xs font-serif font-bold text-[#f9f7f2] truncate">
                      {product.name}
                    </h5>
                    <div className="text-[11px] text-[#cbb5a5] truncate">
                      {product.material.split(',')[0]}
                    </div>

                    {/* Quantity Controls for Wholesale Target Volume */}
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-[10px] font-mono text-[#d9c3b3] uppercase">Target Qty:</span>
                      <div className="flex items-center gap-1 bg-[#132c19] rounded-lg border border-[#d4af37]/30 px-1 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(product.id, -10)}
                          className="p-1 rounded text-[#d9c3b3] hover:text-[#d4af37] cursor-pointer"
                          title="-10 pcs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-[#f7e7a9] px-2 min-w-[32px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 10)}
                          className="p-1 rounded text-[#d9c3b3] hover:text-[#d4af37] cursor-pointer"
                          title="+10 pcs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-[10px] font-mono text-[#a8a29e]">pcs</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(product.id)}
                    className="p-2 text-[#cbb5a5] hover:text-red-400 cursor-pointer"
                    title="Remove Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer — B2B Wholesale Flow */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#d4af37]/20 bg-[#0e2113] space-y-4">
              
              {/* Destination Port / Country */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#d9c3b3] mb-1">
                  Destination Country / Port (Optional):
                </label>
                <input
                  type="text"
                  placeholder="e.g. United States (Los Angeles), Hamburg, Tokyo"
                  value={destinationCountry}
                  onChange={(e) => setDestinationCountry(e.target.value)}
                  className="w-full bg-[#132c19] border border-[#d4af37]/30 rounded-xl px-3 py-2 text-xs text-white placeholder-[#875f3a] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                />
              </div>

              {/* Informational Policy Note */}
              <div className="p-3 rounded-xl bg-[#132c19] border border-[#d4af37]/20 text-[10px] text-[#d9c3b3] space-y-1">
                <div className="flex items-center gap-1.5 text-[#d4af37] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Trade Pricing Terms</span>
                </div>
                <p className="leading-relaxed">
                  Official quotations are generated based on order volume, customization, packaging, and incoterms (FOB / CIF).
                </p>
              </div>

              {/* Action Button: REQUEST QUOTE FOR SELECTED ITEMS */}
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#d4af37] hover:bg-[#e2bd4e] text-[#0a170d] font-mono font-bold text-xs uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>REQUEST QUOTE FOR SELECTED ITEMS</span>
              </a>

              <div className="flex justify-between items-center text-[11px] pt-1">
                <button
                  onClick={onClearAll}
                  className="text-[#a8a29e] hover:text-red-400 cursor-pointer"
                >
                  Clear All Items
                </button>
                <span className="font-mono text-[#875f3a]">
                  Direct Export Sales Desk
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
