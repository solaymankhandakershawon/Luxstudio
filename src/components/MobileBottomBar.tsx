import React from 'react';
import { Phone, MapPin, Clock, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../data/salonData';

export const MobileBottomBar: React.FC = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3 py-2 shadow-2xl flex items-center justify-between gap-1">
      {/* Call */}
      <a
        href={`tel:${BUSINESS_INFO.phoneRaw}`}
        className="flex-1 flex flex-col items-center justify-center py-1 rounded-lg text-stone-700 hover:bg-stone-50 transition-colors"
      >
        <Phone className="w-4 h-4 text-stone-700" />
        <span className="text-[10px] font-medium mt-0.5">Call</span>
      </a>

      {/* Map */}
      <a
        href="#map-location"
        className="flex-1 flex flex-col items-center justify-center py-1 rounded-lg text-stone-700 hover:bg-stone-50 transition-colors"
      >
        <MapPin className="w-4 h-4 text-amber-600" />
        <span className="text-[10px] font-medium mt-0.5">Map</span>
      </a>

      {/* Hours */}
      <a
        href="#hours"
        className="flex-1 flex flex-col items-center justify-center py-1 rounded-lg text-stone-700 hover:bg-stone-50 transition-colors"
      >
        <Clock className="w-4 h-4 text-stone-700" />
        <span className="text-[10px] font-medium mt-0.5">Hours</span>
      </a>

      {/* Book Primary */}
      <a
        href="#contact"
        className="flex-2 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-xs transition-colors"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Book Now</span>
      </a>
    </div>
  );
};
