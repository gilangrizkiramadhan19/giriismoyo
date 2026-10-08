import React, { useState } from 'react';
import { MapPin, PhoneCall, Mail, Clock, Send, CheckCircle2, MessageSquare, Globe, Building } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    inquiryType: 'Wholesale / Container Order',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20 bg-[#132c19] text-[#f9f7f2]">
      
      {/* Header Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto border-b border-[#d4af37]/20">
        <div className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em] mb-4">
          CENTRAL WORKSHOP &amp; GLOBAL SALES DESK
        </div>

        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#f9f7f2] mb-3">
          Contact Giri Ismoyo Craft
        </h1>

        <p className="text-sm text-[#d0bbae] max-w-2xl mx-auto font-light leading-relaxed">
          Whether you are looking to initiate a custom OEM sample, request a 40ft container quotation, or visit our artisan workshop in Sanden, Bantul—we welcome your partnership.
        </p>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info & Location */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Sanden Workshop Card */}
            <div className="bg-[#0f2314] border border-[#d4af37]/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#d4af37] block mb-1">
                  Central Manufacturing Facility
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#f7e7a9]">
                  Sanden Workshop & Solar Yard
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#ebdcd0]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Official Address:</strong>
                    <span>Sanden, Bantul Regency, Special Region of Yogyakarta 55763, Indonesia</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneCall className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">WhatsApp International Sales:</strong>
                    <a
                      href="https://wa.me/6289529107326?text=Hello%20Giri%20Ismoyo,%20I%20would%20like%20to%20discuss%20an%20export%20inquiry."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#d4af37] hover:underline"
                    >
                      +62 89529107326
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Export Desk Email:</strong>
                    <a href="mailto:giriismoyoid@gmail.com" className="text-[#d4af37] hover:underline">
                      giriismoyoid@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Operating Hours:</strong>
                    <span>Monday – Saturday : 08:00 – 17:00 WIB (UTC+7)</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <div className="pt-2">
                <a
                  href="https://wa.me/6289529107326?text=Hello%20Giri%20Ismoyo,%20I%20am%20interested%20in%20visiting%20your%20workshop%20or%20ordering%20wholesale."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#FAF9F6] text-[#1A1A1A] hover:bg-[#ECE6DC] font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Sales</span>
                </a>
              </div>
            </div>

            {/* Airport Transfer Note */}
            <div className="bg-[#132c19] border border-[#d4af37]/20 p-5 text-xs text-[#d0bbae]">
              <strong className="text-[#f7e7a9] block mb-1 font-mono uppercase tracking-wider text-[11px]">Visiting from Abroad?</strong>
              We provide complimentary direct ground transfer from Yogyakarta International Airport (YIA) to our Sanden workshop for accredited international buyers and interior designers.
            </div>

          </div>

          {/* Right Column: Wholesale Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0f2314] border border-[#d4af37]/30 p-6 sm:p-10 shadow-2xl">
              
              <div className="mb-8">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#d4af37] block mb-1">
                  Online Inquiry Form
                </span>
                <h2 className="text-2xl font-editorial font-normal text-[#f7e7a9]">
                  Send a Wholesale or Custom OEM Inquiry
                </h2>
                <p className="text-xs text-[#d0bbae] mt-1">
                  Our export commercial department will respond with formal catalog sheets and specifications within 24 business hours.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4 bg-[#132c19]/60 border border-[#d4af37]/40 p-8 animate-in fade-in">
                  <CheckCircle2 className="w-12 h-12 text-[#d4af37] mx-auto" />
                  <h3 className="text-xl font-editorial font-normal text-[#f7e7a9]">
                    Inquiry Received Successfully
                  </h3>
                  <p className="text-xs text-[#ebdcd0] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Our export specialist has been notified and will email you back at <strong>{formData.email}</strong> with full container specifications.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 bg-[#d4af37] text-[#0a170d] text-xs font-mono uppercase tracking-wider font-bold"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#ebdcd0] mb-1 font-medium">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Johnathan Vance"
                        className="w-full bg-[#132c19] border border-[#d4af37]/30 rounded-xl px-4 py-3 text-white placeholder-[#8a7258] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#ebdcd0] mb-1 font-medium">Corporate Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full bg-[#132c19] border border-[#d4af37]/30 rounded-xl px-4 py-3 text-white placeholder-[#8a7258] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#ebdcd0] mb-1 font-medium">Company Name</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Design Studio or Retail Brand"
                        className="w-full bg-[#132c19] border border-[#d4af37]/30 rounded-xl px-4 py-3 text-white placeholder-[#8a7258] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#ebdcd0] mb-1 font-medium">Destination Country *</label>
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="e.g. United States, Germany, Japan"
                        className="w-full bg-[#132c19] border border-[#d4af37]/30 rounded-xl px-4 py-3 text-white placeholder-[#8a7258] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#ebdcd0] mb-1 font-medium">Inquiry Nature</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-[#132c19] border border-[#d4af37]/30 rounded-xl px-4 py-3 text-[#f9f7f2] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                    >
                      <option value="Wholesale / Container Order">Wholesale / Container Order (FCL / LCL)</option>
                      <option value="Custom OEM Design">Custom OEM Design / Sample Prototyping</option>
                      <option value="Interior Architecture Project">Interior Architecture / Hospitality Project</option>
                      <option value="Workshop Visit Appointment">Artisan Workshop Visit in Sanden, Bantul</option>
                      <option value="General Questions">General Questions & Retail Inquiries</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#ebdcd0] mb-1 font-medium">Project Specifications & Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please include product SKU codes, target volumes, custom dimension requests, or timeline..."
                      className="w-full bg-[#132c19] border border-[#d4af37]/30 rounded-xl px-4 py-3 text-white placeholder-[#8a7258] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#d4af37] text-[#0a170d] font-mono text-xs uppercase tracking-widest hover:bg-[#e6c670] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmit Commercial Inquiry</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
