import React, { useState } from 'react';
import {
  Sparkles,
  Phone,
  Clock,
  Menu,
  X,
  MapPin,
  Calendar,
  Camera,
  Award,
  Navigation,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/salonData';
import { getLondonSalonStatus } from '../utils/hoursHelper';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const status = getLondonSalonStatus();

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Business Hours', href: '#hours' },
    { label: 'Interactive Map', href: '#map-location' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-stone-900 text-stone-300 text-[11px] sm:text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                status.isOpen ? 'bg-emerald-400' : 'bg-rose-400'
              }`}
            />
            <span className="font-medium text-white">{status.statusText}</span>
            <span className="text-stone-500 hidden sm:inline">•</span>
            <span className="text-stone-400 hidden sm:inline">{status.nextEventText}</span>
          </div>

          <div className="flex items-center gap-4 text-stone-300">
            <span className="hidden md:inline text-stone-400">Page’s Walk, London SE1 4SB</span>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="hover:text-amber-300 transition-colors flex items-center gap-1 font-medium text-white"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-stone-900 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-xs group-hover:scale-105 transition-transform">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="font-serif font-bold text-xl sm:text-2xl text-stone-900 tracking-wider">
                LUXSTUDIO
              </span>
              <span className="block text-[9px] font-semibold tracking-widest text-amber-700 uppercase -mt-1">
                London • SE1
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-stone-600 hover:text-amber-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#map-location"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-stone-700 text-xs font-medium hover:bg-stone-100 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>Directions</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book Treatment
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="#contact"
              className="sm:hidden px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-semibold"
            >
              Book
            </a>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="p-3 bg-stone-50 rounded-xl mb-3 flex items-center justify-between text-xs">
            <span className="font-semibold text-stone-800">Status: {status.statusText}</span>
            <span className="text-stone-500">{status.todayHours}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-stone-50 text-stone-800 text-sm font-medium hover:bg-amber-50 hover:text-amber-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-stone-100 text-stone-800 font-medium text-xs flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4 text-amber-600" />
              Open in Google Maps
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-stone-900 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
