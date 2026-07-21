import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SharedService } from '../../shared/shared.service';
import { currencyModel, FlightResultService, HomePageService } from 'rp-travel-ui';

@Injectable({
  providedIn: 'root',
})
export class HeaderSharedService {
  private sharedService = inject(SharedService);
  private homePageService = inject(HomePageService);
  private flightResult = inject(FlightResultService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  updateCurrency(currency: currencyModel) {
    this.homePageService.selectedCurrency = currency;
    let currency_ = currency.Currency_Code.replaceAll('"', ' ');
    if (this.isBrowser) {
      sessionStorage.setItem('curr', currency_);
    }
    this.flightResult.updateCurrencyCode(currency.Currency_Code);
  }

  updateLang(lang: 'ar' | 'en') {
    if (this.isBrowser) {
      localStorage.setItem('lang', lang);
      location.reload();
    }
  }

  onClickLogin() {
    this.sharedService.userManagementNotifier.next(1);
  }

  onClickRegister() {
    this.sharedService.userManagementNotifier.next(2);
  }
}
