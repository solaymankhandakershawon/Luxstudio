import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  MapPin,
  Navigation,
  ExternalLink,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Compass,
  Train,
  Bus,
  Footprints,
  Copy,
  Check,
} from 'lucide-react';
import { BUSINESS_INFO, NEARBY_TRANSIT } from '../data/salonData';

type MapViewMode = 'interactive' | 'google-embed';
type TileLayerType = 'positron' | 'voyager' | 'standard';

export const InteractiveMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const [viewMode, setViewMode] = useState<MapViewMode>('interactive');
  const [activeTileLayer, setActiveTileLayer] = useState<TileLayerType>('voyager');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [selectedTransit, setSelectedTransit] = useState<string>('tube');

  const { coordinates, address, googleMapsUrl } = BUSINESS_INFO;

  // Initialize and update Leaflet map
  useEffect(() => {
    if (viewMode !== 'interactive' || !mapContainerRef.current) return;

    // Avoid double initialization
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [coordinates.lat, coordinates.lng],
        zoom: 15,
        zoomControl: false,
        scrollWheelZoom: false, // Avoid accidental scroll capture while scrolling page
      });

      mapInstanceRef.current = map;

      // Custom marker icon with elegant gold pin
      const customIcon = L.divIcon({
        className: 'custom-salon-marker',
        html: `
          <div class="relative flex items-center justify-center">
            <div class="absolute w-8 h-8 rounded-full bg-amber-500/30 animate-ping"></div>
            <div class="relative w-10 h-10 rounded-full bg-stone-900 border-2 border-amber-400 flex items-center justify-center shadow-xl text-amber-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -22],
      });

      const marker = L.marker([coordinates.lat, coordinates.lng], { icon: customIcon }).addTo(map);
      markerRef.current = marker;

      // Popup with business card
      const popupContent = `
        <div class="p-2 text-stone-800 font-sans min-w-[200px]">
          <div class="font-serif font-bold text-base text-stone-900 tracking-wide">LUXSTUDIO</div>
          <div class="text-xs text-amber-700 font-medium my-0.5">Luxury Beauty & Aesthetics</div>
          <p class="text-xs text-stone-600 mt-1">${address.street}, ${address.postcode}</p>
          <div class="mt-2.5 pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
            <span class="inline-flex items-center text-emerald-700 font-semibold">★ 4.9 (138 reviews)</span>
            <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="text-amber-800 font-medium underline">Directions →</a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 280, closeButton: false }).openPopup();
    }

    // Set tile layer
    const map = mapInstanceRef.current;
    if (map) {
      // Remove any existing tile layers
      map.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
          map.removeLayer(layer);
        }
      });

      let tileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
      let attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

      if (activeTileLayer === 'positron') {
        tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
      } else if (activeTileLayer === 'standard') {
        tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
      }

      L.tileLayer(tileUrl, {
        attribution,
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      // Trigger resize after render
      setTimeout(() => {
        map.invalidateSize();
      }, 150);
    }
  }, [viewMode, activeTileLayer, coordinates, address, googleMapsUrl]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([coordinates.lat, coordinates.lng], 16, {
        duration: 1.2,
      });
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    }
  };

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(address.fullFormatted);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section id="map-location" className="py-20 bg-stone-100/60 border-t border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold tracking-wider uppercase mb-3">
              <MapPin className="w-3.5 h-3.5" />
              Find Our London Studio
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Interactive Map & Location
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-2xl">
              Conveniently positioned on Page’s Walk in Bermondsey Village (SE1 4SB), within walking distance of London Bridge, Bermondsey tube station, and Tower Bridge.
            </p>
          </div>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="copy-address-btn"
              onClick={copyAddressToClipboard}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-700 text-sm font-medium hover:bg-stone-50 hover:border-stone-400 transition-all shadow-xs"
            >
              {copiedAddress ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-stone-500" />}
              {copiedAddress ? 'Address Copied!' : 'Copy Address'}
            </button>

            <a
              id="open-google-maps-btn"
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium transition-all shadow-xs hover:shadow-md"
            >
              <Navigation className="w-4 h-4" />
              Open in Google Maps
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* Map Container and Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Map Box */}
          <div className={`lg:col-span-8 bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col transition-all duration-300 ${isFullscreen ? 'fixed inset-4 z-50 shadow-2xl' : 'relative'}`}>
            {/* Map Controls Bar */}
            <div className="px-4 py-3 bg-stone-900 text-stone-200 flex flex-wrap items-center justify-between gap-3 border-b border-stone-800">
              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-stone-800 p-1 rounded-lg">
                <button
                  id="view-interactive-btn"
                  onClick={() => setViewMode('interactive')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    viewMode === 'interactive' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  Interactive Map
                </button>
                <button
                  id="view-embed-btn"
                  onClick={() => setViewMode('google-embed')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    viewMode === 'google-embed' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  Google Live View
                </button>
              </div>

              {/* Layer switch & Map helpers (interactive mode only) */}
              {viewMode === 'interactive' && (
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1 bg-stone-800 p-1 rounded-lg">
                    <button
                      title="Voyager Clean Map"
                      onClick={() => setActiveTileLayer('voyager')}
                      className={`px-2.5 py-1 text-xs rounded transition-colors ${activeTileLayer === 'voyager' ? 'bg-stone-700 text-amber-300 font-semibold' : 'text-stone-400 hover:text-white'}`}
                    >
                      Voyager
                    </button>
                    <button
                      title="Light Minimalist"
                      onClick={() => setActiveTileLayer('positron')}
                      className={`px-2.5 py-1 text-xs rounded transition-colors ${activeTileLayer === 'positron' ? 'bg-stone-700 text-amber-300 font-semibold' : 'text-stone-400 hover:text-white'}`}
                    >
                      Light
                    </button>
                    <button
                      title="Standard OpenStreetMap"
                      onClick={() => setActiveTileLayer('standard')}
                      className={`px-2.5 py-1 text-xs rounded transition-colors ${activeTileLayer === 'standard' ? 'bg-stone-700 text-amber-300 font-semibold' : 'text-stone-400 hover:text-white'}`}
                    >
                      OSM
                    </button>
                  </div>

                  <button
                    id="map-recenter-btn"
                    onClick={handleRecenter}
                    title="Center on Luxstudio"
                    className="p-1.5 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
                  >
                    <Compass className="w-4 h-4 text-amber-400" />
                  </button>

                  <button
                    id="map-fullscreen-btn"
                    onClick={() => {
                      setIsFullscreen(!isFullscreen);
                      setTimeout(() => {
                        if (mapInstanceRef.current) mapInstanceRef.current.invalidateSize();
                      }, 200);
                    }}
                    title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                    className="p-1.5 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </div>

            {/* Actual Map Content Frame */}
            <div className="relative w-full h-[420px] sm:h-[500px] bg-stone-100">
              {viewMode === 'interactive' ? (
                <>
                  <div ref={mapContainerRef} className="w-full h-full z-0" />
                  {/* Floating In-Map Zoom Controls */}
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5 bg-white/95 backdrop-blur-xs p-1.5 rounded-lg shadow-md border border-stone-200">
                    <button
                      id="map-zoom-in-btn"
                      onClick={handleZoomIn}
                      className="p-2 rounded hover:bg-stone-100 text-stone-700 transition-colors"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <div className="h-px bg-stone-200 mx-1" />
                    <button
                      id="map-zoom-out-btn"
                      onClick={handleZoomOut}
                      className="p-2 rounded hover:bg-stone-100 text-stone-700 transition-colors"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Floating Salon Badge */}
                  <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-lg border border-stone-200/80 max-w-xs hidden sm:block">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-semibold text-stone-900">Luxstudio London</span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">Page’s Walk, Bermondsey SE1 4SB</p>
                  </div>
                </>
              ) : (
                <iframe
                  title="Google Maps Live View"
                  src="https://maps.google.com/maps?q=51.4954469,-0.0798726&hl=en&z=16&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              )}
            </div>

            {/* Map Footer Note */}
            <div className="px-4 py-2.5 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between text-xs text-stone-500 gap-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                Coordinates: 51.4954° N, 0.0799° W • London Borough of Southwark
              </span>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-800 hover:text-amber-900 font-medium inline-flex items-center gap-1"
              >
                View on Google Maps App →
              </a>
            </div>
          </div>

          {/* Right Column: Address, Arrival Guide, & Directions Options */}
          <div className="lg:col-span-4 space-y-6">
            {/* Address & Contact Quick Card */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-amber-600" />
                Studio Address
              </h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">Street & Area</div>
                  <div className="text-stone-800 font-medium mt-0.5">{address.street}</div>
                  <div className="text-stone-600 text-xs">Bermondsey Village, Southwark</div>
                </div>

                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">City & Postcode</div>
                  <div className="text-stone-800 font-medium mt-0.5">London {address.postcode}</div>
                  <div className="text-stone-600 text-xs">Greater London, United Kingdom</div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-400">Phone: </span>
                    <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-sm font-semibold text-stone-800 hover:text-amber-700">
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                  <a
                    href="#contact"
                    className="text-xs font-medium text-amber-700 hover:text-amber-800 underline"
                  >
                    Contact Team
                  </a>
                </div>
              </div>
            </div>

            {/* Public Transport & Getting Here Guide */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
                  <Train className="w-5 h-5 text-amber-600" />
                  Getting Here
                </h3>
                <span className="text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">Zone 1 / 2</span>
              </div>

              <div className="space-y-3.5">
                {NEARBY_TRANSIT.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-stone-50/80 hover:bg-stone-100/80 transition-colors border border-stone-100">
                    <div className="w-8 h-8 rounded-lg bg-amber-100/70 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                      {item.type.includes('Underground') ? (
                        <Train className="w-4 h-4" />
                      ) : item.type.includes('Bus') ? (
                        <Bus className="w-4 h-4" />
                      ) : (
                        <Footprints className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-amber-900/80 uppercase tracking-wider">{item.type}</div>
                      <div className="text-sm font-medium text-stone-900 truncate">{item.name}</div>
                      <div className="text-xs text-stone-500 mt-0.5">{item.distance}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Parking & Accessibility notice */}
              <div className="mt-4 p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs text-amber-900/90 leading-relaxed">
                <strong>Parking & Accessibility:</strong> Pay-and-display street parking is available along Page’s Walk and Willow Walk. Step-free studio ground entrance is available for guests with mobility needs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
