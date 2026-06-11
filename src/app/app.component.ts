import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, inject, OnInit } from '@angular/core';
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
import { DatepickerRtlDirective } from './shared/directives/datepickerrtl.directive';
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

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      window.scrollTo(0, 0);
    });
    let envEjaza = {
      offlineSeats: 'http://154.41.209.93:7025',
      searchflow: 'https://stagingflightsearch.round-pixel.net',
      BookingFlow: 'https://stagingflightflow.round-pixel.net',
      FareRules: 'https://stagingflightprov.round-pixel.net',
      asm: 'https://stagingbackofficeapi.round-pixel.net',
      Apihotels: 'https://staginghotels.round-pixel.net',
      users: 'https://stagingflightsearch.round-pixel.net',
      admin: 'https://stagingadminapi.round-pixel.net/',
      getDPayment: 'https://stagingadminapi.round-pixel.net/',
      bookHotels: 'https://staginghotels.round-pixel.net',
      prepay: 'https://stagingprepayapi.round-pixel.net',
      backOffice: 'https://stagingbackofficeapi.round-pixel.net',
      FlightTop: 'https://stagingflightsearch.round-pixel.net',
      staticPages: 'https://stagingcms.round-pixel.net',
      offers: {
        getAll: 'http://154.41.209.93:7893/api/GetAllOffersAPI?POS=',
        getByID: 'http://154.41.209.93:7893/api/GetOfferByIdAPI?OfferId=',
        BookOffer: 'http://154.41.209.93:7895/api/BookOffer',
        RetriveItineraryDetails: '/api/Admin/RetriveItineraryDetails',
      },
    };

    let envRP = {
      offlineSeats: 'http://41.223.55.14:7025',
      searchflow: 'https://flightsearch.round-pixel.net',
      BookingFlow: 'https://flightflow.round-pixel.net',
      FareRules: 'https://flightprov.round-pixel.net',
      asm: 'https://backofficeapi.round-pixel.net',
      Apihotels: 'https://hotelsapi.round-pixel.net',
      users: 'https://usersapi.round-pixel.net',
      admin: 'https://adminapi.round-pixel.net/',
      getDPayment: 'https://adminapi.round-pixel.net/',
      bookHotels: 'https://hotels.round-pixel.net',
      prepay: 'https://prepayapi.round-pixel.net',
      backOffice: 'https://backofficeapi.round-pixel.net',
      FlightTop: 'https://flightsearch.round-pixel.net',
      offers: {
        getAll: 'http://41.215.243.36:7893/api/GetAllOffersAPI?POS=',
        getByID: 'http://41.215.243.36:7893/api/GetOfferByIdAPI?OfferId=',
        BookOffer: 'http://41.215.243.36:7895/api/BookOffer',
        RetriveItineraryDetails: '/api/Admin/RetriveItineraryDetails',
      },
    };
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
      offers: {
        getAll: 'http://41.215.243.36:7893/api/GetAllOffersAPI?POS=',
        getByID: 'http://41.215.243.36:7893/api/GetOfferByIdAPI?OfferId=',
        BookOffer: 'http://41.215.243.36:7895/api/BookOffer',
        RetriveItineraryDetails: '/api/Admin/RetriveItineraryDetails',
      },
    };

    let envWego = {
      offlineSeats: 'http://154.41.209.178:7025',
      searchflow: 'https://flightsearch.ejazzatravel.com',
      BookingFlow: 'https://flightflow.ejazzatravel.com',
      FareRules: 'https://flightprov.ejazzatravel.com',
      asm: 'https://backofficeapi.ejazzatravel.com',
      Apihotels: 'https://hotels.ejazzatravel.com',
      hotelprepay: 'https://prepayapi.ejazzatravel.com',
      users: 'https://flightsearch.ejazzatravel.com',
      admin: 'https://adminapi.ejazzatravel.com/',
      getDPayment: 'https://adminapi.ejazzatravel.com/',
      bookHotels: 'https://hotels.ejazzatravel.com',
      prepay: 'https://prepayapi.ejazzatravel.com',
      backOffice: 'https://backofficeapi.ejazzatravel.com',
      FlightTop: 'https://flightsearch.ejazzatravel.com',
      staticPages: 'https://cms.ejazzatravel.com',
      offers: {
        getAll: 'http://154.41.209.178:7893/api/GetAllOffersAPI?POS=',
        getAllActive: 'http://154.41.209.178:7893/api/GetAllActiveOffersAPI?POS=',
        getByID: 'http://154.41.209.178:7893/api/GetOfferByIdAPI?OfferId=',
        BookOffer: 'http://154.41.209.178:7895/api/BookOffer',
        RetriveItineraryDetails: '/api/Admin/RetriveItineraryDetails',
      },
    };

    let envWegoDemo = {
      offlineSeats: 'http://154.41.209.93:7025',
      searchflow: 'https://demoflightsearch.round-pixel.net',
      BookingFlow: 'https://demoflightflow.round-pixel.net',
      FareRules: 'https://demoflightprov.round-pixel.net',
      asm: 'https://demobackofficeapi.round-pixel.net',
      Apihotels: 'https://hotels.round-pixel.net',
      hotelprepay: 'https://demoprepayapi.round-pixel.net',
      users: 'https://demousersapi.round-pixel.net',
      admin: 'https://demoadminapi.round-pixel.net/',
      getDPayment: 'https://demoadminapi.round-pixel.net/',
      bookHotels: 'https://hotels.round-pixel.net',
      prepay: 'https://demoprepayapi.round-pixel.net',
      backOffice: 'https://demobackofficeapi.round-pixel.net',
      FlightTop: 'https://demoflightsearch.round-pixel.net',
      staticPages: 'cms.govoy.com',
      offers: {
        getAll: 'http://154.41.209.93:7893/api/GetAllOffersAPI?POS=',
        getAllActive: 'http://154.41.209.93:7893/api/GetAllActiveOffersAPI?POS=',
        getByID: 'http://154.41.209.93:7893/api/GetOfferByIdAPI?OfferId=',
        BookOffer: 'http://154.41.209.93:7895/api/BookOffer',
        RetriveItineraryDetails: '/api/Admin/RetriveItineraryDetails',
      },
    };

    let envtrvyl = {
      offlineSeats: 'http://23.88.1.190:7025',
      searchflow: 'https://flightsearch.govoy.com',
      BookingFlow: 'https://flightflow.govoy.com',
      FareRules: 'https://flightprov.govoy.com',
      asm: 'https://backofficeapi.govoy.com',
      Apihotels: 'https://hotels.govoy.com',
      users: 'https://usersapi.govoy.com',
      admin: 'https://adminapi.govoy.com/',
      getDPayment: 'https://adminapi.govoy.com/',
      bookHotels: 'https://hotels.govoy.com',
      prepay: 'https://prepayapi.govoy.com',
      backOffice: 'https://backofficeapi.govoy.com',
      FlightTop: 'https://flightsearch.govoy.com',
      offers: {
        getAll: 'http://23.88.1.190:7893/api/GetAllOffersAPI?POS=',
        getByID: 'http://23.88.1.190:7893/api/GetOfferByIdAPI?OfferId=',
        BookOffer: 'http://23.88.1.190:7895/api/BookOffer',
        RetriveItineraryDetails: '/api/Admin/RetriveItineraryDetails',
      },
    };

    this.environmentService.envConfiguration(envFly);

    this.translate.setTranslation('en', en);
    this.translate.setTranslation('ar', ar);
    this.translate.setDefaultLang('en');

    const lang = localStorage.getItem('lang');

    if (lang) {
      this.translate.use(lang);
    } else {
      this.translate.use('en');
      localStorage.setItem('lang', 'en');
    }

    this.document.dir = this.translate.currentLang === 'ar' ? 'rtl' : 'ltr';
  }

  ngOnInit(): void {
    this.sharedService.screenWidth = window.innerWidth;
    this.mostSearchedFlightsService.getMostSearchedFlights();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.sharedService.screenWidth = window.innerWidth;
  }
}
