import React, { useState } from "react";
import {
  X,
  MessageSquare,
  FileText,
  CheckCircle2,
} from "lucide-react";

const WHATSAPP_NUMBER = "6289529107326";

interface CatalogRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CatalogRequestModal: React.FC<CatalogRequestModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    phone: "",
    interest: "Wholesale Baskets & Mirrors",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    const lines = [
      "Hello Giri Ismoyo Craft,",
      "I would like to request the wholesale catalog.",
      `Name: ${formData.name.trim()}`,
      `Business Email: ${formData.email.trim()}`,
    ];
    if (formData.company.trim()) lines.push(`Company / Brand: ${formData.company.trim()}`);
    if (formData.country.trim()) lines.push(`Country / Destination: ${formData.country.trim()}`);
    if (formData.phone.trim()) lines.push(`WhatsApp / Phone: ${formData.phone.trim()}`);

    const message = lines.join("\n");
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#132c19] border border-[#d4af37]/40 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#d9c3b3] hover:text-white border border-[#d4af37]/30 bg-[#1d4226]"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
            <h3 className="text-2xl font-editorial font-normal text-[#f7e7a9]">
              Catalog Request Sent via WhatsApp!
            </h3>
            <p className="text-xs text-[#d9c3b3] mt-2 max-w-sm mx-auto">
              Your wholesale catalog request was prepared for WhatsApp. Our
              export team in Sanden, Bantul will also email you the full
              wholesale sheet.
            </p>
            <div className="mt-4 pt-4 border-t border-[#d4af37]/20 text-xs text-[#d4af37]">
              Or view online at{" "}
              <a
                href="https://lynk.id/giriismaya"
                target="_blank"
                rel="noreferrer"
                className="underline font-bold"
              >
                lynk.id/giriismaya
              </a>
            </div>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 bg-[#d4af37] text-[#0a170d] font-mono text-xs uppercase tracking-wider font-bold"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37]">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-editorial font-normal text-[#f7e7a9]">
                  Request Wholesale Catalog
                </h3>
                <p className="text-xs text-[#d9c3b3]">
                  Giri Ismoyo Craft • Sanden, Bantul, Yogyakarta
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[#d9c3b3] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Eleanor Vance"
                  className="w-full bg-[#1d4226] border border-[#d4af37]/30 rounded-xl px-4 py-2.5 text-xs text-[#f9f7f2] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#d9c3b3] mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="name@company.com"
                    className="w-full bg-[#1d4226] border border-[#d4af37]/30 rounded-xl px-4 py-2.5 text-xs text-[#f9f7f2] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#d9c3b3] mb-1">
                    Company / Brand
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="Botanical Home Inc."
                    className="w-full bg-[#1d4226] border border-[#d4af37]/30 rounded-xl px-4 py-2.5 text-xs text-[#f9f7f2] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#d9c3b3] mb-1">
                    Country / Destination
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    placeholder="e.g. Netherlands / USA"
                    className="w-full bg-[#1d4226] border border-[#d4af37]/30 rounded-xl px-4 py-2.5 text-xs text-[#f9f7f2] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#d9c3b3] mb-1">
                    WhatsApp / Phone
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+62 85100162451"
                    className="w-full bg-[#1d4226] border border-[#d4af37]/30 rounded-xl px-4 py-2.5 text-xs text-[#f9f7f2] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 bg-[#d4af37] text-[#0a170d] font-mono text-xs uppercase tracking-wider hover:bg-[#e6c670] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Request Catalog via WhatsApp</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
