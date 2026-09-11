import React from 'react';
import { Sparkles, MapPin, Phone, Mail, Clock, ExternalLink, Heart } from 'lucide-react';
import { BUSINESS_INFO, BUSINESS_HOURS } from '../data/salonData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-24 lg:pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-xl text-white tracking-wider">
                LUXSTUDIO
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Premier beauty salon and aesthetic wellness sanctuary situated on Page’s Walk, Bermondsey, London. Dedicated to artistry, hair health, and rejuvenating skin treatments.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <span>★ 4.9 on Google Maps</span>
              <span className="text-stone-600">•</span>
              <span>138+ Client Reviews</span>
            </div>
          </div>

          {/* Col 2: Studio Location */}
          <div className="space-y-3 text-xs sm:text-sm">
            <h4 className="font-serif font-bold text-white uppercase tracking-wider text-xs">
              Location & Transport
            </h4>
            <div className="space-y-2 text-stone-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {BUSINESS_INFO.address.street}, <br />
                  Bermondsey Village, Southwark, <br />
                  London {BUSINESS_INFO.address.postcode}
                </span>
              </p>
              <div className="pt-2">
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold"
                >
                  <span>Open Google Maps Pin</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Hours Summary */}
          <div className="space-y-3 text-xs sm:text-sm">
            <h4 className="font-serif font-bold text-white uppercase tracking-wider text-xs">
              Opening Times
            </h4>
            <ul className="space-y-1.5 text-stone-400">
              <li className="flex justify-between">
                <span>Mon – Wed:</span>
                <span className="text-stone-200">9:00 AM – 7:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Thu – Fri:</span>
                <span className="text-stone-200">9:00 AM – 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-stone-200">9:00 AM – 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-stone-200">10:00 AM – 4:30 PM</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Contact */}
          <div className="space-y-3 text-xs sm:text-sm">
            <h4 className="font-serif font-bold text-white uppercase tracking-wider text-xs">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-stone-400">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-white transition-colors">
                  {BUSINESS_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white transition-colors break-all">
                  {BUSINESS_INFO.email}
                </a>
              </p>
            </div>
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-block px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors"
              >
                Book Appointment
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} Luxstudio London. All rights reserved. Registered in England & Wales.
          </div>
          <div className="flex items-center gap-4">
            <a href="#map-location" className="hover:text-stone-400 transition-colors">
              Interactive Map
            </a>
            <a href="#hours" className="hover:text-stone-400 transition-colors">
              Business Hours
            </a>
            <a href="#reviews" className="hover:text-stone-400 transition-colors">
              Reviews
            </a>
            <a href="#gallery" className="hover:text-stone-400 transition-colors">
              Gallery
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
