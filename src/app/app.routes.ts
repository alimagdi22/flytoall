import { Routes } from '@angular/router';
import { SEO_METADATA } from './core/constants/seo-metadata.config';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'flights-results',
    loadChildren: () =>
      import('../app/features/flights/flights-results/flights-results.module').then((m) => m.FlightsResultsModule),
    data: { seo: SEO_METADATA['flightsResults'] },
  },
  {
    path: 'flights-checkout',
    loadChildren: () =>
      import('../app/features/flights/flights-checkout/flights-checkout.module').then((m) => m.FlightsCheckoutModule),
    data: { seo: SEO_METADATA['flightsCheckout'] },
  },
  {
    path: 'user-management',
    loadChildren: () =>
      import('../app/features/user-management/user-management.module').then((m) => m.UserManagementModule),
    data: { seo: SEO_METADATA['userManagement'] },
  },
  {
    path: 'paymentresult',
    loadChildren: () =>
      import('./features/flights/flight-confirmation/flight-confirmation.module').then(
        (m) => m.FlightConfirmationModule,
      ),
    data: { seo: SEO_METADATA['paymentResult'] },
  },
];
