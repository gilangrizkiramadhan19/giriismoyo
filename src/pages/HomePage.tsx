import React from "react";
import type { Product } from "../data/products";
import { Hero } from "../components/home/Hero";
import { BoothTags } from "../components/home/BoothTags";
import { WorkshopStory } from "../components/home/WorkshopStory";
import { WorkWithUs } from "../components/home/WorkWithUs";
import { FeaturedProducts } from "../components/home/FeaturedProducts";
import { Closing } from "../components/home/Closing";

export interface HomePageProps {
  onAddToInquiry: (product: Product) => void;
  inquiryItems: Product[];
  onRequestCatalog: () => void;
  onOpenInquiry: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onAddToInquiry,
  inquiryItems,
  onRequestCatalog,
}) => {
  return (
    <div className="bg-[#f3e6d8] text-[#2b1d14] overflow-x-hidden">
      <Hero onRequestCatalog={onRequestCatalog} />
      <BoothTags onAddToInquiry={onAddToInquiry} inquiryItems={inquiryItems} />
      <WorkshopStory />
      <WorkWithUs />
      <FeaturedProducts />
      <Closing onRequestCatalog={onRequestCatalog} />
    </div>
  );
};

export default HomePage;
