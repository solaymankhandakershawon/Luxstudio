export interface BusinessInfo {
  name: string;
  tagline: string;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    postcode: string;
    country: string;
    fullFormatted: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  phoneRaw: string;
  email: string;
  googleMapsUrl: string;
}

export interface DayHours {
  day: string;
  dayIndex: number; // 0 for Sunday, 1 for Monday, etc.
  openTime: string; // e.g., "09:00"
  closeTime: string; // e.g., "19:30"
  formatted: string; // e.g., "9:00 AM – 7:30 PM"
  isClosed?: boolean;
}

export interface ServiceItem {
  id: string;
  category: 'hair' | 'aesthetics' | 'nails' | 'lashes' | 'wellness';
  name: string;
  description: string;
  duration: string;
  price: number;
  featured?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export interface PhotoItem {
  id: string;
  title: string;
  category: 'interior' | 'hair' | 'aesthetics' | 'nails' | 'lashes';
  imageUrl: string;
  caption: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export interface ContactBookingFormData {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

export interface BookingSubmission extends ContactBookingFormData {
  id: string;
  submittedAt: string;
  status: 'confirmed' | 'pending';
}
