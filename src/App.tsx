import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { InquiryDrawer } from "./components/InquiryDrawer";
import { CatalogRequestModal } from "./components/CatalogRequestModal";

import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { GalleryPage } from "./pages/GalleryPage";
import { ExhibitionsPage } from "./pages/ExhibitionsPage";
import { ShopPage } from "./pages/ShopPage";
import { BlogPage } from "./pages/BlogPage";
import { ContactPage } from "./pages/ContactPage";

import type { Product } from "./data/products";

export function App() {
  const [inquiryItems, setInquiryItems] = useState<
    { product: Product; quantity: number }[]
  >([]);
  const [inquiryDrawerOpen, setInquiryDrawerOpen] = useState<boolean>(false);
  const [catalogModalOpen, setCatalogModalOpen] = useState<boolean>(false);

  // Add item to inquiry basket
  const handleAddToInquiry = (product: Product) => {
    setInquiryItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setInquiryDrawerOpen(true);
  };

  // Quantity updates
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setInquiryItems(
      (prev) =>
        prev
          .map((item) => {
            if (item.product.id === productId) {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as { product: Product; quantity: number }[],
    );
  };

  const handleRemoveItem = (productId: string) => {
    setInquiryItems((prev) =>
      prev.filter((item) => item.product.id !== productId),
    );
  };

  const handleClearAll = () => {
    setInquiryItems([]);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#1C1B18] font-sans selection:bg-[#C59D4C] selection:text-[#1E3A2B] relative flex flex-col justify-between">
      {/* 1. Global Multi-Page Header */}
      <Header
        onOpenInquiry={() => setInquiryDrawerOpen(true)}
        onOpenCatalogModal={() => setCatalogModalOpen(true)}
        inquiryCount={inquiryItems.reduce(
          (acc, item) => acc + item.quantity,
          0,
        )}
      />

      {/* 2. 7 Multi-Page Routes */}
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onAddToInquiry={handleAddToInquiry}
                inquiryItems={inquiryItems.map((i) => i.product)}
                onRequestCatalog={() => setCatalogModalOpen(true)}
                onOpenInquiry={() => setInquiryDrawerOpen(true)}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/exhibitions" element={<ExhibitionsPage />} />
          <Route
            path="/shop"
            element={
              <ShopPage
                onAddToInquiry={handleAddToInquiry}
                inquiryItems={inquiryItems.map((i) => i.product)}
                onRequestCatalog={() => setCatalogModalOpen(true)}
              />
            }
          />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* 3. Global Footer */}
      <Footer />

      {/* 4. Global Inquiry Cart Drawer */}
      <InquiryDrawer
        isOpen={inquiryDrawerOpen}
        onClose={() => setInquiryDrawerOpen(false)}
        items={inquiryItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearAll={handleClearAll}
      />

      {/* 5. Wholesale Catalog Request Modal */}
      <CatalogRequestModal
        isOpen={catalogModalOpen}
        onClose={() => setCatalogModalOpen(false)}
      />
    </div>
  );
}

export default App;
