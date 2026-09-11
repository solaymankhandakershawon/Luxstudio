import React, { useState, useEffect } from 'react';
import { Clock, Calendar, AlertCircle, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { BUSINESS_HOURS } from '../data/salonData';
import { getLondonSalonStatus, CurrentStatus } from '../utils/hoursHelper';

export const BusinessHours: React.FC = () => {
  const [status, setStatus] = useState<CurrentStatus>(getLondonSalonStatus());
  const [selectedDay, setSelectedDay] = useState<string>('');

  // Update status every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(getLondonSalonStatus());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hours" className="py-20 bg-white border-t border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold tracking-wider uppercase mb-3">
            <Clock className="w-3.5 h-3.5" />
            Opening Times & Availability
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Studio Business Hours
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            We offer generous early morning and late evening appointments throughout the week to fit effortlessly into your London lifestyle.
          </p>

          {/* Live Status Banner */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 shadow-xs">
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  status.isOpen
                    ? status.isClosingSoon
                      ? 'bg-amber-500 animate-pulse'
                      : 'bg-emerald-500'
                    : 'bg-rose-500'
                }`}
              />
              <span className="font-semibold text-sm text-stone-900">{status.statusText}</span>
            </div>
            <span className="text-stone-300">|</span>
            <span className="text-xs text-stone-600 font-medium">{status.nextEventText}</span>
            <span className="text-stone-300 hidden sm:inline">|</span>
            <span className="text-xs text-amber-800 font-medium hidden sm:inline">London BST/GMT</span>
          </div>
        </div>

        {/* Grid: Weekly Timetable & Policies */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 7-Day Timetable Card */}
          <div className="lg:col-span-7 bg-stone-50/70 rounded-2xl border border-stone-200 p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
                <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
                  <Calendar className="w-5 h-5 text-amber-600" />
                  Weekly Schedule
                </div>
                <span className="text-xs text-stone-500">Page’s Walk, Bermondsey</span>
              </div>

              <div className="space-y-2.5">
                {BUSINESS_HOURS.map((item) => {
                  const isToday = item.day.toLowerCase() === status.currentDayName.toLowerCase();

                  return (
                    <div
                      key={item.day}
                      className={`flex items-center justify-between p-3 sm:p-3.5 rounded-xl transition-all ${
                        isToday
                          ? 'bg-white border-2 border-amber-500/80 shadow-xs ring-2 ring-amber-100'
                          : 'bg-white/70 border border-stone-200/70 hover:bg-white hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isToday
                              ? status.isOpen
                                ? 'bg-emerald-500'
                                : 'bg-rose-500'
                              : 'bg-stone-300'
                          }`}
                        />
                        <div className="flex items-center gap-2">
                          <span className={`text-sm sm:text-base font-medium ${isToday ? 'text-stone-950 font-bold' : 'text-stone-700'}`}>
                            {item.day}
                          </span>
                          {isToday && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                              Today
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`text-sm sm:text-base font-semibold ${isToday ? 'text-amber-900 font-bold' : 'text-stone-900'}`}>
                          {item.formatted}
                        </span>
                        {item.day === 'Thursday' || item.day === 'Friday' ? (
                          <span className="hidden sm:inline-block ml-2 text-[10px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                            Late Evening
                          </span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick action beneath schedule */}
            <div className="mt-6 pt-5 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-500 text-center sm:text-left">
                Need an early morning VIP slot before 9 AM? Inquire for private requests.
              </div>
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Reserve Your Time
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Salon Policies, Walk-Ins & Holiday Notices */}
          <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
            {/* Walk-in & Booking Policy */}
            <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-7 shadow-md flex-1">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-2">
                <Sparkles className="w-4 h-4" />
                Appointments & Walk-ins
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-3">
                Seamless Reservations
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-4">
                To guarantee our dedicated attention and an uninterrupted bespoke treatment, we recommend reserving appointments at least 24 hours in advance.
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Walk-ins Welcome:</strong> Accepted based on daily stylist availability.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Grace Window:</strong> 15-minute arrival allowance with complimentary beverage service.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Complimentary Consultations:</strong> 15-minute pre-treatment hair color & skin analysis.</span>
                </li>
              </ul>
            </div>

            {/* Bank Holidays & Seasonal Trading */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-base mb-2">
                <AlertCircle className="w-5 h-5 text-amber-700" />
                Bank Holiday Hours
              </div>
              <p className="text-xs sm:text-sm text-amber-950/80 leading-relaxed">
                On UK Bank Holidays, Luxstudio operates special Sunday hours from <strong>10:00 AM – 4:30 PM</strong>. We remain closed on Christmas Day, Boxing Day, and New Year’s Day.
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-amber-800 font-medium">
                <span>Questions regarding holidays?</span>
                <a href="tel:+442079460928" className="underline font-semibold hover:text-amber-900">
                  Call Front Desk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
