import { AfterViewInit, Component, ElementRef, inject, ViewChild, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FlightResultService, IAirItinerary } from 'rp-travel-ui';
import { Subscription } from 'rxjs';
import { ISortItem } from '../../../../../shared/models/sortItem.model';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../../../../shared/shared.service';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

Swiper.use([Navigation]);

@Component({
  standalone: false,
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponent implements AfterViewInit, OnDestroy {
  @ViewChild('desktopSwiper') desktopSwiperRef!: ElementRef;
  @ViewChild('swiperEl', { static: false }) swiperEl!: ElementRef;
  desktopSwiper?: Swiper;

  private platformId = inject(PLATFORM_ID);
  public isBrowser = isPlatformBrowser(this.platformId);

  load: boolean = true;
  flightResultService = inject(FlightResultService);
  sharedService = inject(SharedService);
  isSearchBoxOpen = false;
  public translate = inject(TranslateService);
  currentLang = this.translate.currentLang;
  subscription = new Subscription();
  returnDate = '';
  sortItems: ISortItem[] = [
    {
      title: 'Cheapest',
      price: '',
      currency: '',
      isActive: true,
      sortCode: 1,
    },
    {
      title: 'Fastest',
      price: '',
      currency: '',
      isActive: false,
      sortCode: 2,
    },
  ];

  ngOnInit(): void {
    this.subscription.add(
      this.flightResultService.filterForm.valueChanges.subscribe(() => {
        this.sortItems.forEach((e) => (e.isActive = false));

        const retryUntilDataLoaded = async () => {
          let attempts = 0;
          const maxAttempts = 20;
          while (!this.flightResultService.orgnizedResponce.length && attempts < maxAttempts) {
            await new Promise((res) => setTimeout(res, 200));
            attempts++;
          }

          if (this.flightResultService.orgnizedResponce.length) {
            this.sortItems[0].isActive = true;
            this.sortItems[0].price = this.flightResultService.orgnizedResponce[0][0].itinTotalFare.amount;
            this.sortItems[0].currency = this.flightResultService.orgnizedResponce[0][0].itinTotalFare.currencyCode;
          }
        };

        if (this.isBrowser) {
          retryUntilDataLoaded();
        }
      }),
    );

    this.subscription.add(
      this.flightResultService.notify.subscribe({
        next: () => {
          this.isSearchBoxOpen = false;
          if (this.flightResultService.orgnizedResponce.length > 0) {
            const lastFlight = this.flightResultService.orgnizedResponce[0][0].allJourney.flights;
            if (lastFlight.length > 0) {
              const lastFlightDTO = lastFlight[lastFlight.length - 1].flightDTO;
              if (lastFlightDTO.length > 0) {
                this.returnDate = lastFlightDTO[lastFlightDTO.length - 1].departureDate;
              }
            }
          }
        },
      }),
    );

    if (this.isBrowser) {
      setTimeout(() => {
        this.load = false;
      }, 7000);
    } else {
      this.load = false;
    }
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    if (this.sharedService.screenWidth >= this.sharedService.webViewBreakPoint) {
      this.initDesktopSwiper();
    }

    const swiper = this.swiperEl?.nativeElement;
    if (swiper) {
      Object.assign(swiper, {
        spaceBetween: this.sharedService.screenWidth > this.sharedService.webViewBreakPoint ? 1 : 8,
        breakpoints: {
          0: { slidesPerView: 3 },
        },
      });
      swiper.initialize();
    }
  }

  initDesktopSwiper() {
    this.desktopSwiper = new Swiper(this.desktopSwiperRef.nativeElement, {
      modules: [Navigation],
      slidesPerView: 5,
      spaceBetween: 5,
      navigation: {
        nextEl: '.arrow-right',
        prevEl: '.arrow-left',
      },
    });
  }

  toggleSearchBox(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.isSearchBoxOpen = !this.isSearchBoxOpen;
  }

  get firstItinerary(): IAirItinerary | undefined {
    return (
      this.flightResultService.orgnizedResponce?.[0]?.[0] ||
      this.flightResultService.response?.airItineraries?.[0]
    );
  }

  get departureAirport() {
    return this.firstItinerary?.allJourney?.flights?.[0]?.flightDTO?.[0]?.departureTerminalAirport;
  }

  get departureCityName(): string {
    return this.departureAirport?.cityName || this.departureAirport?.airportName || '';
  }

  get departureCountryName(): string {
    return this.departureAirport?.countryName || '';
  }

  get arrivalAirport() {
    const flightDTOs = this.firstItinerary?.allJourney?.flights?.[0]?.flightDTO;
    if (!flightDTOs || !flightDTOs.length) return undefined;
    return flightDTOs[flightDTOs.length - 1]?.arrivalTerminalAirport;
  }

  get arrivalCityName(): string {
    return this.arrivalAirport?.cityName || this.arrivalAirport?.airportName || '';
  }

  get arrivalCountryName(): string {
    return this.arrivalAirport?.countryName || '';
  }

  get cabinClass(): string {
    return (
      this.firstItinerary?.cabinClass ||
      (this.flightResultService.response?.searchCriteria as any)?.cabinClass ||
      this.sharedService.searchParams?.['Cclass'] ||
      ''
    );
  }

  get totalPassengers(): number | string {
    return (
      this.flightResultService.response?.searchCriteria?.totalPassengersNum ?? ''
    );
  }

  get departingDate(): string | Date | undefined {
    const searchFlights = this.flightResultService.response?.searchCriteria?.flights;
    if (searchFlights && searchFlights.length > 0 && searchFlights[0].departingOnDate) {
      return searchFlights[0].departingOnDate;
    }
    return this.firstItinerary?.deptDate;
  }

  get returningDate(): string | Date | undefined {
    const searchFlights = this.flightResultService.response?.searchCriteria?.flights;
    if (searchFlights && searchFlights.length > 0) {
      return searchFlights[searchFlights.length - 1].departingOnDate;
    }
    const flights = this.firstItinerary?.allJourney?.flights;
    if (flights && flights.length > 1) {
      return flights[1]?.flightDTO?.[0]?.departureDate;
    }
    return undefined;
  }

  // FIXED: Use the service's method directly and let it handle the state
  chooseCustomFilterAirline(airline: any, index: number): void {
    this.flightResultService.chooseCustomFilterAirline(airline, index);
  }

  // Helper method to check if airline is selected
  isAirlineSelected(airlineName: string): boolean {
    return this.flightResultService.checkCustomFilterAirline(airlineName);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.desktopSwiper) {
      this.desktopSwiper.destroy();
    }
  }
}
