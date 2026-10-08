import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { ShoppingBag, Search, Menu, X, PhoneCall } from 'lucide-react';

interface HeaderProps {
  onOpenInquiry: () => void;
  onOpenCatalogModal: () => void;
  inquiryCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenInquiry,
  onOpenCatalogModal,
  inquiryCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT', path: '/about' },
    { label: 'GALLERY', path: '/gallery' },
    { label: 'EXHIBITIONS', path: '/exhibitions' },
    { label: 'SHOP', path: '/shop' },
    { label: 'BLOG', path: '/blog' },
    { label: 'CONTACT', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#1E3A2B]/98 backdrop-blur-md border-b border-[#F7F4EF]/15 py-3 shadow-md'
          : 'bg-[#1E3A2B] py-3.5 border-b border-[#F7F4EF]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* 1. Transparent Brand Logo (No white box, max-h-12 / 48px, object-contain) */}
        <Link
          to="/"
          className="flex items-center group shrink-0 transition-transform duration-300 hover:opacity-90"
        >
          <Logo size={isScrolled ? 'sm' : 'md'} />
        </Link>

        {/* 2. Desktop Navigation Menu (7 Pages - Palemcraft multi-page layout) */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-sans tracking-wider uppercase">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative py-1.5 transition-colors duration-200 font-medium ${
                  isActive
                    ? 'text-[#f7e7a9] font-semibold'
                    : 'text-[#e8decb] hover:text-[#d4af37]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#d4af37]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* 3. Header Action Utilities */}
        <div className="flex items-center space-x-3">
          
          {/* Inquiry Cart Bag Drawer Trigger */}
          <button
            onClick={onOpenInquiry}
            className="relative p-2.5 rounded-full text-[#e8decb] hover:text-[#d4af37] hover:bg-[#0f2314]/80 transition-all"
            title="Inquiry Basket"
            aria-label="Inquiry Basket"
          >
            <ShoppingBag className="w-5 h-5" />
            {inquiryCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#d4af37] text-[#0a170d] text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center border-2 border-[#132c19] shadow-sm">
                {inquiryCount}
              </span>
            )}
          </button>

          {/* Quick Wholesale Catalog Button */}
          <button
            onClick={onOpenCatalogModal}
            className="hidden sm:inline-flex items-center px-4 py-2 border border-[#C59D4C]/60 bg-[#C59D4C]/15 hover:bg-[#C59D4C] text-[#F7E7A9] hover:text-[#1E3A2B] font-sans text-xs tracking-wider transition-colors font-medium cursor-pointer"
          >
            <span>Shop & Inquiry</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#e8decb] hover:text-[#d4af37] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#132c19]/98 backdrop-blur-2xl border-b border-[#d4af37]/30 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 shadow-2xl">
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-[#d4af37] tracking-widest uppercase mb-2">
              Menu Navigation
            </div>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block py-2.5 px-3 rounded-xl text-sm font-sans tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#1f482a] text-[#f7e7a9] font-bold border-l-2 border-[#d4af37]'
                      : 'text-[#e8decb] hover:text-[#d4af37] hover:bg-[#1a3b22]/50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="pt-4 border-t border-[#d4af37]/20 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCatalogModal();
              }}
              className="w-full bg-[#d4af37] text-[#0a170d] font-mono text-xs py-3 flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <span>Request Wholesale Catalog</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
