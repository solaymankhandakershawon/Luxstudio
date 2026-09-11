import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesMenu } from './components/ServicesMenu';
import { InteractiveMap } from './components/InteractiveMap';
import { BusinessHours } from './components/BusinessHours';
import { CustomerReviews } from './components/CustomerReviews';
import { PhotoGallery } from './components/PhotoGallery';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>('');

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900 flex flex-col">
      {/* Header with real-time status & navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Services & Pricing Menu */}
        <ServicesMenu onSelectService={handleSelectService} />

        {/* Business Hours & Live Schedule */}
        <BusinessHours />

        {/* Interactive Map & Transport Guide */}
        <InteractiveMap />

        {/* Photo Gallery with Lightbox */}
        <PhotoGallery />

        {/* Customer Reviews & Feedback */}
        <CustomerReviews />

        {/* Easy Contact & Booking Form */}
        <ContactForm preselectedService={selectedService} />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Mobile Bottom Quick Action Bar */}
      <MobileBottomBar />
    </div>
  );
}
