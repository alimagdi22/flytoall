import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'user-management',
    renderMode: RenderMode.Client,
  },
  {
    path: 'flights-checkout',
    renderMode: RenderMode.Client,
  },
  {
    path: 'paymentresult',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
