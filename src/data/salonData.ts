import { BusinessInfo, DayHours, ServiceItem, ReviewItem, PhotoItem } from '../types';

export const BUSINESS_INFO: BusinessInfo = {
  name: 'Luxstudio',
  tagline: 'Bespoke Beauty, Hair Artistry & Aesthetic Wellness',
  description:
    'Located in the heart of London SE1 near Bermondsey and Tower Bridge, Luxstudio is an upscale sanctuary offering precision hair styling, advanced medical aesthetics, luxury nail spa, and bespoke lash & brow artistry.',
  category: 'Luxury Beauty Salon & Aesthetics',
  rating: 4.9,
  reviewCount: 138,
  address: {
    street: "Page's Walk, Bermondsey Village",
    neighborhood: 'Bermondsey / Southwark',
    city: 'London',
    postcode: 'SE1 4SB',
    country: 'United Kingdom',
    fullFormatted: "Page's Walk, Bermondsey, London SE1 4SB, United Kingdom",
  },
  coordinates: {
    lat: 51.4954469,
    lng: -0.0798726,
  },
  phone: '+44 20 7946 0928',
  phoneRaw: '+442079460928',
  email: 'appointments@luxstudio-london.co.uk',
  googleMapsUrl: 'https://maps.app.goo.gl/aGpPAFXBMfEcrzXD8',
};

export const BUSINESS_HOURS: DayHours[] = [
  { day: 'Sunday', dayIndex: 0, openTime: '10:00', closeTime: '16:30', formatted: '10:00 AM – 4:30 PM' },
  { day: 'Monday', dayIndex: 1, openTime: '09:00', closeTime: '19:30', formatted: '9:00 AM – 7:30 PM' },
  { day: 'Tuesday', dayIndex: 2, openTime: '09:00', closeTime: '19:30', formatted: '9:00 AM – 7:30 PM' },
  { day: 'Wednesday', dayIndex: 3, openTime: '09:00', closeTime: '19:30', formatted: '9:00 AM – 7:30 PM' },
  { day: 'Thursday', dayIndex: 4, openTime: '09:00', closeTime: '20:00', formatted: '9:00 AM – 8:00 PM' },
  { day: 'Friday', dayIndex: 5, openTime: '09:00', closeTime: '20:00', formatted: '9:00 AM – 8:00 PM' },
  { day: 'Saturday', dayIndex: 6, openTime: '09:00', closeTime: '18:00', formatted: '9:00 AM – 6:00 PM' },
];

export const SERVICES_CATALOG: ServiceItem[] = [
  // Hair
  {
    id: 'hair-balayage',
    category: 'hair',
    name: 'Signature Balayage & Glossing',
    description: 'Hand-painted dimensional color tailored to skin tone with bespoke bond-protecting Olaplex treatment and shine gloss.',
    duration: '150 mins',
    price: 185,
    featured: true,
  },
  {
    id: 'hair-cut-style',
    category: 'hair',
    name: 'Precision Cut & Luxury Blowdry',
    description: 'Full consultation, cleansing scalp massage with organic botanical wash, precision architecture cut, and runway styling.',
    duration: '60 mins',
    price: 75,
    featured: true,
  },
  {
    id: 'hair-keratin',
    category: 'hair',
    name: 'Silk Keratin Infusion Treatment',
    description: 'Long-lasting frizz elimination and smoothing therapy restoring silkiness and moisture for up to 4 months.',
    duration: '120 mins',
    price: 195,
  },
  // Aesthetics & Skin
  {
    id: 'aes-hydra-glow',
    category: 'aesthetics',
    name: 'HydraGlow Deluxe Clinical Facial',
    description: '6-step deep dermal exfoliation, ultrasonic vortex pore cleansing, active peptide infusion, and soothing LED light therapy.',
    duration: '75 mins',
    price: 130,
    featured: true,
  },
  {
    id: 'aes-microneedle',
    category: 'aesthetics',
    name: 'Collagen Induction Microneedling',
    description: 'Medical-grade Dermapen treatment with hyaluronic acid boosters targeting fine lines, texture, and cellular renewal.',
    duration: '60 mins',
    price: 150,
  },
  {
    id: 'aes-chemical-peel',
    category: 'aesthetics',
    name: 'BioRePeel Radiant Resurfacing',
    description: 'Non-invasive, no-downtime patented Italian TCA chemical peel delivering instant clarity, collagen synthesis, and glass skin glow.',
    duration: '45 mins',
    price: 95,
  },
  // Nails
  {
    id: 'nail-biab',
    category: 'nails',
    name: 'BIAB Builder Gel Overlay & Russian Cuticle',
    description: 'Natural nail strengthening overlay with precise dry Russian e-file cuticle care and cruelty-free high-gloss finish.',
    duration: '75 mins',
    price: 58,
    featured: true,
  },
  {
    id: 'nail-spa-pedi',
    category: 'nails',
    name: 'Rose & Champagne Spa Pedicure',
    description: 'Aromatherapy foot soak, organic sugar exfoliation, hot towel wrap, callous treatment, and precision shape & polish.',
    duration: '60 mins',
    price: 65,
  },
  // Lashes & Brows
  {
    id: 'lash-russian-volume',
    category: 'lashes',
    name: 'Bespoke Russian Volume Lash Extensions',
    description: 'Lightweight hand-crafted 3D-6D fans creating a lush, feathery look tailored to your natural lash architecture.',
    duration: '105 mins',
    price: 95,
    featured: true,
  },
  {
    id: 'brow-lamination',
    category: 'lashes',
    name: 'High Definition Brow Lamination & Tint',
    description: 'Keratin brow lifting, precision mapping, organic hybrid tinting, and sculpted tweezing for full, feathered brows.',
    duration: '45 mins',
    price: 52,
  },
  // Wellness
  {
    id: 'well-aromatherapy',
    category: 'wellness',
    name: 'Deep Relief Aromatherapy Massage',
    description: 'Full body Swedish and deep-tissue blend with custom warm essential oils targeting muscle tension and stress.',
    duration: '60 mins',
    price: 80,
  },
];

export const GALLERY_PHOTOS: PhotoItem[] = [
  {
    id: 'photo-1',
    title: 'The Modern Studio Space',
    category: 'interior',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=85',
    caption: 'Bright, minimalist styling stations with warm ambient lighting designed for tranquility and comfort.',
    aspectRatio: 'landscape',
  },
  {
    id: 'photo-2',
    title: 'Precision Balayage Artistry',
    category: 'hair',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85',
    caption: 'Seamless dimensional honey blonde balayage with natural root blend and high-shine gloss.',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-3',
    title: 'Hydra-Facial & Glow Therapy',
    category: 'aesthetics',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85',
    caption: 'Deep dermal hydration and LED phototherapy session in our private clinical aesthetic suite.',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-4',
    title: 'Reception & Botanical Lounge',
    category: 'interior',
    imageUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=85',
    caption: 'Enjoy specialty herbal tea or complimentary champagne in our welcoming lounge before your session.',
    aspectRatio: 'landscape',
  },
  {
    id: 'photo-5',
    title: 'BIAB Cuticle Perfection',
    category: 'nails',
    imageUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=85',
    caption: 'Precision Russian dry manicure paired with milky nude builder gel overlay and chrome accents.',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-6',
    title: 'Feathered Russian Volume Lashes',
    category: 'lashes',
    imageUrl: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=900&q=85',
    caption: 'Lightweight, damage-free bespoke volume lashes framing the eye contour naturally.',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-7',
    title: 'Private Aesthetic Treatment Suite',
    category: 'interior',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=85',
    caption: 'Ultra-hygienic clinical treatment rooms equipped with state-of-the-art beauty technology.',
    aspectRatio: 'landscape',
  },
  {
    id: 'photo-8',
    title: 'Gloss Wave Styling',
    category: 'hair',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=85',
    caption: 'Textured beach wave styling following a botanical moisture restoration masque.',
    aspectRatio: 'portrait',
  },
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    date: '3 days ago',
    service: 'Signature Balayage & Glossing',
    comment:
      'Luxstudio is simply unmatched in London! The salon atmosphere on Page’s Walk is calming, immaculately clean, and luxurious. My stylist took the time to assess my hair texture and delivered the most radiant balayage I have ever had. Plus the complimentary coffee was divine.',
    verified: true,
    helpfulCount: 14,
  },
  {
    id: 'rev-2',
    author: 'Sophie Montgomery',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    date: '1 week ago',
    service: 'HydraGlow Deluxe Clinical Facial',
    comment:
      'I booked the HydraGlow facial before my sister’s wedding and my skin has never looked so dewy and clear! The aesthetician was extremely knowledgeable about skin barrier health. Zero redness, just instant glow.',
    verified: true,
    helpfulCount: 9,
  },
  {
    id: 'rev-3',
    author: 'Chloe Davies',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    date: '2 weeks ago',
    service: 'BIAB Builder Gel Overlay',
    comment:
      'The attention to detail on cuticles and nail health is top tier. My BIAB nails usually lift after two weeks elsewhere, but here they stay flawless for over 4 weeks. Great location near Bermondsey station!',
    verified: true,
    helpfulCount: 7,
  },
  {
    id: 'rev-4',
    author: 'Charlotte Evans',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    date: '3 weeks ago',
    service: 'Precision Cut & Luxury Blowdry',
    comment:
      'Finally found my go-to hair studio in Southwark! Walked in with damaged dry hair and walked out feeling like a movie star. The team is warm, attentive, and genuinely artistic with their scissors.',
    verified: true,
    helpfulCount: 5,
  },
  {
    id: 'rev-5',
    author: 'Amara Patel',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    date: '1 month ago',
    service: 'Russian Volume Lash Extensions',
    comment:
      'My lash sets from Luxstudio are consistently lightweight, fluffy, and retain so well. You cannot feel them on your eyes at all. Always a relaxing experience, I fell asleep during the application!',
    verified: true,
    helpfulCount: 11,
  },
];

export const NEARBY_TRANSIT = [
  {
    type: 'Underground',
    name: 'Bermondsey Station (Jubilee Line)',
    distance: '8 min walk (0.4 miles)',
    icon: 'train',
  },
  {
    type: 'National Rail / Tube',
    name: 'London Bridge Station',
    distance: '15 min walk / 6 min bus (Lines 47, 381)',
    icon: 'train',
  },
  {
    type: 'Bus Routes',
    name: "Page's Walk / Old Kent Road",
    distance: '2 min walk (Routes 1, 53, 63, 78, 168, 453)',
    icon: 'bus',
  },
  {
    type: 'Landmark',
    name: 'Tower Bridge & Shad Thames',
    distance: '12 min scenic stroll',
    icon: 'map-pin',
  },
];
