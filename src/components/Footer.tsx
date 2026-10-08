import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Mail, MapPin, Phone, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="footer-section" className="bg-[#071009] text-[#f9f7f2] border-t border-[#d4af37]/20 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#d4af37]/15">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <Logo size="md" />
            </Link>
            <p className="text-xs text-[#d9c3b3] font-sans leading-relaxed max-w-sm">
              <strong className="text-[#f7e7a9]">Giri Ismoyo Craft</strong> is an Indonesian natural fiber handicraft manufacturer founded in 2018 by <strong className="text-[#f7e7a9]">Sunu Agung</strong> in Sanden, Bantul, Yogyakarta. We produce eco-friendly home decor, woven baskets, wall art, lampshades, and furniture from renewable banana stems, water hyacinth, seagrass, and mendong.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs">
              <a
                href="https://lynk.id/giriismaya"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-[#132c19] border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a170d] transition-colors flex items-center gap-1.5 font-mono text-[11px]"
              >
                <span>Lynk.id Official Catalog</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Site Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#d4af37] mb-4">
              Explore Pages
            </h4>
            <ul className="space-y-2 text-xs text-[#d9c3b3]">
              <li><Link to="/" className="hover:text-[#d4af37] transition-colors">Home Landing</Link></li>
              <li><Link to="/about" className="hover:text-[#d4af37] transition-colors">About Us & Founder</Link></li>
              <li><Link to="/gallery" className="hover:text-[#d4af37] transition-colors">Photo Gallery</Link></li>
              <li><Link to="/exhibitions" className="hover:text-[#d4af37] transition-colors">Exhibitions & Fairs</Link></li>
              <li><Link to="/shop" className="hover:text-[#d4af37] transition-colors">Shop</Link></li>
              <li><Link to="/blog" className="hover:text-[#d4af37] transition-colors">Artisan Blog</Link></li>
              <li><Link to="/contact" className="hover:text-[#d4af37] transition-colors">Contact Workshop</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#d4af37] mb-4">
              Workshop & Office
            </h4>
            <ul className="space-y-3 text-xs text-[#d9c3b3]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>Kalijurang DK 06 RT 20, Srigading, Sanden, Bantul, Yogyakarta, Indonesia, 55763</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href="mailto:giriismoyoid@gmail.com" className="hover:underline text-[#f7e7a9]">giriismoyoid@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>+62 85100162451</span>
              </li>
            </ul>
          </div>

          {/* Certification Seals */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#d4af37] mb-4">
              Credentials
            </h4>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-[#132c19] border border-[#d4af37]/20 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span className="text-[11px] text-[#f7e7a9] font-medium">Anti-Fungal Quality Control</span>
              </div>
              <div className="p-3 rounded-xl bg-[#132c19] border border-[#d4af37]/20 flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#d4af37]" />
                <span className="text-[11px] text-[#f7e7a9] font-medium">Bantul Artisan Empowerment</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#a38776]">
          <div>
            © {new Date().getFullYear()} Giri Ismoyo Craft. Founded by Sunu Agung. Sanden, Bantul, Yogyakarta.
          </div>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-[#d4af37]">Company Profile</Link>
            <Link to="/shop" className="hover:text-[#d4af37]">Shop</Link>
            <Link to="/contact" className="hover:text-[#d4af37]">Contact Founder</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
