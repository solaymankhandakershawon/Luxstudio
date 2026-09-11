import React from 'react';
import {
  Sparkles,
  MapPin,
  Star,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  Navigation,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/salonData';
import { getLondonSalonStatus } from '../utils/hoursHelper';

export const Hero: React.FC = () => {
  const status = getLondonSalonStatus();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-100/80 via-stone-50 to-white pt-10 pb-18 lg:pt-16 lg:pb-24">
      {/* Subtle architectural background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-300/80 text-xs font-medium text-stone-800 shadow-xs">
              <span className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="ml-1 font-bold text-stone-900">4.9</span>
              </span>
              <span className="text-stone-300">•</span>
              <span className="text-stone-600">138+ Verified Google Reviews</span>
              <span className="text-stone-300 hidden sm:inline">•</span>
              <span className="text-amber-800 font-semibold hidden sm:inline">Bermondsey, London</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.15]">
              Bespoke Beauty & <br className="hidden sm:inline" />
              <span className="italic font-normal font-serif text-amber-800">Hair Artistry</span> in London
            </h1>

            {/* Description */}
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Welcome to <strong>Luxstudio</strong> — your tranquil sanctuary on Page’s Walk, Bermondsey. We blend couture hair coloring, clinical dermal aesthetics, Russian volume lashes, and luxury nail care.
            </p>

            {/* Key Quick Info Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-stone-600 pt-1">
              <div className="flex items-center gap-1.5 bg-stone-100/80 px-3 py-1.5 rounded-lg border border-stone-200">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>Page’s Walk, SE1 4SB</span>
              </div>
              <div className="flex items-center gap-1.5 bg-stone-100/80 px-3 py-1.5 rounded-lg border border-stone-200">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span className="font-medium text-stone-800">{status.statusText}</span>
                <span>({status.todayHours})</span>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#map-location"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-semibold text-sm border border-stone-300 transition-all shadow-xs"
              >
                <Navigation className="w-4 h-4 text-amber-600" />
                <span>View Map & Directions</span>
              </a>

              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-stone-700 font-medium text-sm transition-all"
              >
                <span>Browse Menu</span>
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-stone-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Cruelty-Free & Medical Grade</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Award-Nominated London Artists</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Complimentary Drinks & Consult</span>
              </div>
            </div>
          </div>

          {/* Right Visual Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative background aura */}
              <div className="absolute -top-6 -right-6 w-64 h-64 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

              {/* Main Image Box */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-900">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=85"
                  alt="Luxstudio London Salon Interior"
                  className="w-full h-[420px] sm:h-[480px] object-cover object-center transform hover:scale-102 transition-transform duration-700"
                />

                {/* Floating Glassmorphic Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-stone-950/80 backdrop-blur-md border border-stone-700/60 text-white flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                      Bermondsey Village
                    </div>
                    <div className="text-base font-serif font-bold">LUXSTUDIO</div>
                    <div className="text-xs text-stone-300">Page’s Walk, London SE1 4SB</div>
                  </div>

                  <a
                    href={BUSINESS_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white transition-colors"
                    title="Open in Google Maps"
                  >
                    <Navigation className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Floating Review Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-stone-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-base">
                  ★
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Top Rated Salon</div>
                  <div className="text-[11px] text-stone-500">London Borough of Southwark</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
