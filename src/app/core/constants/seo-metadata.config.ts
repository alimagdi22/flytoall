import { SeoConfig } from '../services/seo.service';

/**
 * Centralized Static SEO Metadata Configuration for FlyToAll
 * Static titles, descriptions, keywords, and OpenGraph values for each route.
 */
export const SEO_METADATA: Record<string, SeoConfig> = {
  home: {
    title: 'FlyToAll - Discover & Book Cheap Flights Worldwide',
    description: 'Search, compare, and book cheap flights to your favorite destinations worldwide with FlyToAll.',
    keywords: 'flights, cheap flights, flight booking, travel, airline tickets, flytoall',
    ogTitle: 'FlyToAll - Discover & Book Cheap Flights Worldwide',
    ogDescription: 'Search, compare, and book cheap flights to your favorite destinations worldwide with FlyToAll.',
    ogImage: 'public/images/og-home.jpg',
    robots: 'index, follow',
  },
  aboutUs: {
    title: 'About Us - FlyToAll',
    description: 'Learn more about FlyToAll, our mission, vision, and how we deliver seamless flight booking experiences.',
    keywords: 'about flytoall, travel company, flight search engine, about us',
    ogTitle: 'About Us - FlyToAll',
    ogDescription: 'Learn more about FlyToAll, our mission, vision, and how we deliver seamless flight booking experiences.',
    robots: 'index, follow',
  },
  contactUs: {
    title: 'Contact Us & Customer Support - FlyToAll',
    description: 'Get in touch with FlyToAll customer support for assistance with flight bookings, inquiries, and help.',
    keywords: 'contact flytoall, customer support, help center, flight help',
    ogTitle: 'Contact Us & Customer Support - FlyToAll',
    ogDescription: 'Get in touch with FlyToAll customer support for assistance with flight bookings, inquiries, and help.',
    robots: 'index, follow',
  },
  terms: {
    title: 'Terms & Conditions - FlyToAll',
    description: 'Read the official terms and conditions of service for using FlyToAll flight search and booking platform.',
    keywords: 'terms of service, terms and conditions, legal, flytoall terms',
    ogTitle: 'Terms & Conditions - FlyToAll',
    ogDescription: 'Read the official terms and conditions of service for using FlyToAll flight search and booking platform.',
    robots: 'index, follow',
  },
  privacyPolicy: {
    title: 'Privacy Policy - FlyToAll',
    description: 'Learn how FlyToAll collects, uses, protects, and respects your privacy and personal data.',
    keywords: 'privacy policy, data protection, privacy, flytoall privacy',
    ogTitle: 'Privacy Policy - FlyToAll',
    ogDescription: 'Learn how FlyToAll collects, uses, protects, and respects your privacy and personal data.',
    robots: 'index, follow',
  },
  flightsResults: {
    title: 'Flight Search Results - FlyToAll',
    description: 'Compare best fares and schedules across top airlines on FlyToAll.',
    ogTitle: 'Flight Search Results - FlyToAll',
    ogDescription: 'Compare best fares and schedules across top airlines on FlyToAll.',
    robots: 'noindex, follow',
  },
  flightsCheckout: {
    title: 'Flight Checkout & Passenger Details - FlyToAll',
    description: 'Complete your passenger details and secure your flight booking on FlyToAll.',
    ogTitle: 'Flight Checkout - FlyToAll',
    ogDescription: 'Complete your passenger details and secure your flight booking on FlyToAll.',
    robots: 'noindex, nofollow',
  },
  userManagement: {
    title: 'Account Settings & Booking History - FlyToAll',
    description: 'Manage your profile details, passenger saved data, and view your flight booking history.',
    ogTitle: 'Account Settings - FlyToAll',
    ogDescription: 'Manage your profile details, passenger saved data, and view your flight booking history.',
    robots: 'noindex, nofollow',
  },
  paymentResult: {
    title: 'Booking Confirmation - FlyToAll',
    description: 'View your flight booking confirmation and e-ticket status on FlyToAll.',
    ogTitle: 'Booking Confirmation - FlyToAll',
    ogDescription: 'View your flight booking confirmation and e-ticket status on FlyToAll.',
    robots: 'noindex, nofollow',
  },
};
