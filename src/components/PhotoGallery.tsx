import React, { useState, useEffect, useCallback } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/salonData';
import { PhotoItem } from '../types';

type CategoryFilter = 'all' | 'interior' | 'hair' | 'aesthetics' | 'nails' | 'lashes';

export const PhotoGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const filteredPhotos = activeCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  const openLightbox = (photo: PhotoItem) => {
    const idx = filteredPhotos.findIndex((p) => p.id === photo.id);
    setCurrentIndex(idx !== -1 ? idx : 0);
    setActivePhoto(photo);
  };

  const closeLightbox = () => {
    setActivePhoto(null);
  };

  const handleNext = useCallback(() => {
    if (filteredPhotos.length === 0) return;
    const nextIdx = (currentIndex + 1) % filteredPhotos.length;
    setCurrentIndex(nextIdx);
    setActivePhoto(filteredPhotos[nextIdx]);
  }, [currentIndex, filteredPhotos]);

  const handlePrev = useCallback(() => {
    if (filteredPhotos.length === 0) return;
    const prevIdx = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setCurrentIndex(prevIdx);
    setActivePhoto(filteredPhotos[prevIdx]);
  }, [currentIndex, filteredPhotos]);

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activePhoto) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, handleNext, handlePrev]);

  return (
    <section id="gallery" className="py-20 bg-stone-100/50 border-t border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold tracking-wider uppercase mb-3">
              <Camera className="w-3.5 h-3.5" />
              Visual Showcase
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Photo Gallery
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-xl">
              Explore the refined aesthetic of our Bermondsey salon, our clinical treatment suites, and the transformative work of our master stylists.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-xl border border-stone-200 shadow-xs self-start md:self-auto">
            {(
              [
                { key: 'all', label: 'All Photos' },
                { key: 'interior', label: 'Studio Interior' },
                { key: 'hair', label: 'Hair' },
                { key: 'aesthetics', label: 'Aesthetics' },
                { key: 'nails', label: 'Nails' },
                { key: 'lashes', label: 'Lashes' },
              ] as { key: CategoryFilter; label: string }[]
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === tab.key
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-Style Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(photo)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-stone-200 border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-4/5 w-full overflow-hidden bg-stone-100">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Gradient Overlay & Hover Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="flex items-center gap-1.5 mb-1 text-amber-300 text-[11px] font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  {photo.category}
                </div>
                <h3 className="text-base font-serif font-bold text-white leading-snug">
                  {photo.title}
                </h3>
                <p className="text-xs text-stone-300 mt-1 line-clamp-2 leading-relaxed opacity-90">
                  {photo.caption}
                </p>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-300 font-medium opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Enlarge photo</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/90 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200"
            onClick={closeLightbox}
          >
            <div
              className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Controls Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-stone-950 border-b border-stone-800 text-stone-300">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    {activePhoto.category}
                  </span>
                  <span className="text-stone-600">•</span>
                  <span className="text-xs text-stone-400">
                    {currentIndex + 1} of {filteredPhotos.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={closeLightbox}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
                    title="Close (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Image Container */}
              <div className="relative bg-stone-950 flex items-center justify-center max-h-[65vh] overflow-hidden">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  className="max-h-[65vh] w-auto max-w-full object-contain mx-auto select-none"
                />

                {/* Left/Right Arrows */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white border border-stone-700/60 shadow-lg transition-colors"
                  title="Previous (Left Arrow)"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white border border-stone-700/60 shadow-lg transition-colors"
                  title="Next (Right Arrow)"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Caption & Description Footer */}
              <div className="p-5 bg-stone-900 text-stone-100 border-t border-stone-800">
                <h3 className="text-lg font-serif font-bold text-white">{activePhoto.title}</h3>
                <p className="text-sm text-stone-400 mt-1 leading-relaxed">{activePhoto.caption}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
