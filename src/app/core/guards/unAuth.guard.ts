import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';

export const UnAuthGuard: CanActivateFn = (route, state) => {
  const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  const token = isBrowser ? localStorage.getItem('token') : null;

  if (token) {
    const router = inject(Router);

    router.navigate(['/user-management']);

    return false;
  } else {
    return true;
  }
};
