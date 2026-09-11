import React, { useState } from 'react';
import { Scissors, Sparkles, Clock, Check, ArrowRight } from 'lucide-react';
import { SERVICES_CATALOG } from '../data/salonData';
import { ServiceItem } from '../types';

interface ServicesMenuProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesMenu: React.FC<ServicesMenuProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'hair' | 'aesthetics' | 'nails' | 'lashes'>('all');

  const filteredServices = activeTab === 'all'
    ? SERVICES_CATALOG
    : SERVICES_CATALOG.filter((s) => s.category === activeTab);

  const handleBookService = (serviceName: string) => {
    onSelectService(serviceName);
    const formEl = document.getElementById('contact');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-stone-50/60 border-t border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold tracking-wider uppercase mb-3">
              <Scissors className="w-3.5 h-3.5" />
              Bespoke Treatments
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Services & Price Menu
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-xl">
              Curated by London certified colorists, aesthetic practitioners, and nail artists using organic and premium clinical formulations.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-xl border border-stone-200 shadow-xs self-start md:self-auto">
            {[
              { key: 'all', label: 'All Services' },
              { key: 'hair', label: 'Hair Studio' },
              { key: 'aesthetics', label: 'Aesthetics & Skin' },
              { key: 'nails', label: 'Nails & Spa' },
              { key: 'lashes', label: 'Lashes & Brows' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`bg-white rounded-2xl p-6 border transition-all duration-200 flex flex-col justify-between hover:shadow-md ${
                service.featured
                  ? 'border-amber-400/80 ring-1 ring-amber-200 shadow-xs'
                  : 'border-stone-200'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md">
                    {service.category}
                  </span>
                  {service.featured && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3" /> Client Favorite
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-serif font-bold text-stone-900 leading-snug">
                  {service.name}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold font-serif text-stone-900">
                    ${service.price}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleBookService(service.name)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-amber-600 text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  <span>Book This</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
