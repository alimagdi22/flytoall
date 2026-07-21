import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EnvironmentService, FlightSearchService, HomePageService } from 'rp-travel-ui';
import ar from '../../public/i18n/ar.json';
import en from '../../public/i18n/en.json';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { ModalsComponent } from './shared/components/modals/modals.component';
import { SharedModule } from './shared/shared.module';
import { SharedService } from './shared/shared.service';
import { filter } from 'rxjs';
import { MostSearchedFlightsService } from './features/home/components/most-searched-flights/most-searched-flights.service';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, HeaderComponent, ModalsComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'flytoall';

  public translate = inject(TranslateService);
  public sharedService = inject(SharedService);
  public environmentService = inject(EnvironmentService);
  private router = inject(Router);
  private homePageService = inject(HomePageService);
  private flightSearchService = inject(FlightSearchService);
  private mostSearchedFlightsService = inject(MostSearchedFlightsService);
  private seoService = inject(SeoService);
  private platformId = inject(PLATFORM_ID);
  public isBrowser = isPlatformBrowser(this.platformId);

  constructor(@Inject(DOCUMENT) private document: Document) {
    if (this.isBrowser) {
      this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
        window.scrollTo(0, 0);
      });
    }

    let envFly = {
      offlineSeats: 'http://41.223.55.14:7025',
      searchflow: 'https://flightsearch.flytoall.com',
      BookingFlow: 'https://flightflow.flytoall.com',
      FareRules: 'https://flightprov.flytoall.com',
      asm: 'https://backofficeapi.flytoall.com',
      Apihotels: 'https://hotelsapi.flytoall.com',
      users: 'https://Usersapi.flytoall.com',
      admin: 'https://adminapi.flytoall.com',
      getDPayment: 'https://adminapi.flytoall.com',
      bookHotels: 'https://hotels.flytoall.com',
      prepay: 'https://prepayapi.flytoall.com',
      backOffice: 'https://backofficeapi.flytoall.com',
      FlightTop: 'https://flightsearch.flytoall.com',
      staticPages: 'https://stagingcms.round-pixel.net',
      offers: {
        getAll: 'http://41.215.243.36:7893/api/GetAllOffersAPI?POS=',
        getByID: 'http://41.215.243.36:7893/api/GetOfferByIdAPI?OfferId=',
        BookOffer: 'http://41.215.243.36:7895/api/BookOffer',
        RetriveItineraryDetails: '/api/Admin/RetriveItineraryDetails',
      },
    };

    this.environmentService.envConfiguration(envFly);

    this.translate.setTranslation('en', en);
    this.translate.setTranslation('ar', ar);
    this.translate.setDefaultLang('en');

    if (this.isBrowser) {
      const lang = localStorage.getItem('lang');
      if (lang) {
        this.translate.use(lang);
      } else {
        this.translate.use('en');
        localStorage.setItem('lang', 'en');
      }
    } else {
      this.translate.use('en');
    }

    if (this.isBrowser && this.document) {
      this.document.dir = this.translate.currentLang === 'ar' ? 'rtl' : 'ltr';
    }
  }

  ngOnInit(): void {
    this.seoService.initRouteSeoListener();
    if (this.isBrowser) {
      this.sharedService.screenWidth = window.innerWidth;
    }
    this.mostSearchedFlightsService.getMostSearchedFlights();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.isBrowser) {
      this.sharedService.screenWidth = window.innerWidth;
    }
  }
}
