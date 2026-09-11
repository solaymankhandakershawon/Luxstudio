import React, { useState } from 'react';
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  MessageCircle,
  Sparkles,
  Info,
  ArrowRight,
} from 'lucide-react';
import { BUSINESS_INFO, SERVICES_CATALOG } from '../data/salonData';
import { ContactBookingFormData } from '../types';

interface ContactFormProps {
  preselectedService?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ preselectedService = '' }) => {
  const [formData, setFormData] = useState<ContactBookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    service: preselectedService || SERVICES_CATALOG[0].name,
    preferredDate: '',
    preferredTime: '11:00',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);

  // Today in YYYY-MM-DD for date min constraint
  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate instant secure processing
    setTimeout(() => {
      const refCode = `LUX-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedReference(refCode);
      setIsSubmitting(false);

      // Save submission locally for persistence
      const prevSubmissions = JSON.parse(localStorage.getItem('luxstudio_inquiries') || '[]');
      prevSubmissions.push({
        ref: refCode,
        ...formData,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('luxstudio_inquiries', JSON.stringify(prevSubmissions));
    }, 600);
  };

  return (
    <section id="contact" className="py-20 bg-stone-100/70 border-t border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold tracking-wider uppercase mb-3">
            <Mail className="w-3.5 h-3.5" />
            Appointments & Inquiries
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Easy Contact & Booking
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Request an appointment or reach out with specific treatment inquiries. Our front desk concierge responds within 2 hours during studio hours.
          </p>
        </div>

        {/* Form and Contact Options Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info & Perks */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Box */}
            <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
              <div className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Direct Communication
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-6">
                Connect with Luxstudio
              </h3>

              <div className="space-y-5 text-sm">
                {/* Phone */}
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="flex items-center gap-4 p-3 rounded-xl bg-stone-800/80 hover:bg-stone-800 transition-colors border border-stone-700/50 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-400 uppercase tracking-wider">Phone Bookings</div>
                    <div className="text-base font-semibold text-white mt-0.5">{BUSINESS_INFO.phone}</div>
                    <div className="text-xs text-stone-400">Available during salon hours</div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-center gap-4 p-3 rounded-xl bg-stone-800/80 hover:bg-stone-800 transition-colors border border-stone-700/50 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-400 uppercase tracking-wider">Email Concierge</div>
                    <div className="text-sm font-semibold text-white mt-0.5 break-all">{BUSINESS_INFO.email}</div>
                    <div className="text-xs text-stone-400">Average response in &lt; 2 hrs</div>
                  </div>
                </a>

                {/* Address */}
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl bg-stone-800/80 hover:bg-stone-800 transition-colors border border-stone-700/50 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-400 uppercase tracking-wider">Salon Location</div>
                    <div className="text-sm font-semibold text-white mt-0.5">{BUSINESS_INFO.address.street}</div>
                    <div className="text-xs text-stone-400">Bermondsey, London {BUSINESS_INFO.address.postcode}</div>
                  </div>
                </a>
              </div>

              {/* WhatsApp Quick Chat */}
              <div className="mt-8 pt-6 border-t border-stone-800">
                <a
                  href={`https://wa.me/442079460928?text=Hello%20Luxstudio,%20I%20would%20like%20to%20inquire%20about%20booking%20an%20appointment`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp Directly
                </a>
              </div>
            </div>

            {/* Treatment Preparation Tips */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs text-xs sm:text-sm text-stone-600 space-y-3">
              <div className="flex items-center gap-2 font-semibold text-stone-900">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                Booking Policy & Patch Testing
              </div>
              <p>
                <strong>Hair Color & Lash Tint:</strong> First-time guests require a quick 48-hour patch test prior to service.
              </p>
              <p>
                <strong>Cancellation:</strong> Please provide at least 24 hours notice to reschedule without penalty.
              </p>
            </div>
          </div>

          {/* Right Column: Contact & Booking Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
            {submittedReference ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900">
                  Appointment Request Received!
                </h3>
                <p className="text-stone-600 text-sm mt-2 max-w-md mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. Your reservation reference is:
                </p>
                <div className="my-4 inline-block px-5 py-2 rounded-xl bg-amber-50 border border-amber-300 font-mono text-lg font-bold text-amber-900">
                  {submittedReference}
                </div>

                <div className="bg-stone-50 rounded-xl p-4 max-w-md mx-auto text-left text-xs text-stone-700 space-y-1.5 border border-stone-200 my-4">
                  <div><strong>Selected Treatment:</strong> {formData.service}</div>
                  <div><strong>Preferred Time:</strong> {formData.preferredDate || 'Earliest available'} at {formData.preferredTime}</div>
                  <div><strong>Contact:</strong> {formData.email} • {formData.phone}</div>
                </div>

                <p className="text-xs text-stone-500 mb-6">
                  Our front desk team will contact you via email or phone to confirm your exact stylist and time slot.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmittedReference(null);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        service: SERVICES_CATALOG[0].name,
                        preferredDate: '',
                        preferredTime: '11:00',
                        notes: '',
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors"
                  >
                    Submit Another Request
                  </button>

                  <a
                    href={BUSINESS_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-amber-600 text-white text-sm font-medium hover:bg-amber-700 transition-colors inline-flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    Get Directions to Salon
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    Book Your Treatment
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                    Fill in your preferred date and services. No upfront credit card required.
                  </p>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Olivia Vance"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 bg-stone-50/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 07700 900123"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 bg-stone-50/40"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="olivia.vance@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 bg-stone-50/40"
                  />
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Desired Treatment / Service *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 bg-white"
                  >
                    {SERVICES_CATALOG.map((svc) => (
                      <option key={svc.id} value={svc.name}>
                        {svc.name} — ${svc.price} ({svc.duration})
                      </option>
                    ))}
                    <option value="General Consultation / Multiple Services">
                      General Consultation / Multiple Services
                    </option>
                  </select>
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      Preferred Time Slot *
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 bg-white"
                    >
                      <option value="09:30">Morning: 09:30 AM</option>
                      <option value="11:00">Midday: 11:00 AM</option>
                      <option value="13:00">Early Afternoon: 01:00 PM</option>
                      <option value="15:00">Afternoon: 03:00 PM</option>
                      <option value="17:00">Late Afternoon: 05:00 PM</option>
                      <option value="18:30">Evening: 06:30 PM</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Notes or Special Requests (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your current hair or skin condition, stylist preference, or event timing..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 resize-none bg-stone-50/40"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    'Securing Your Slot...'
                  ) : (
                    <>
                      <span>Send Appointment Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center text-[11px] text-stone-400">
                  By submitting, you agree to our 24-hour cancellation notice policy.
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
