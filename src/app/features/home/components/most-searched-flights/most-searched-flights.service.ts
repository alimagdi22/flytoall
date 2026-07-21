import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { catchError, retry, take } from 'rxjs';
import { MostSearchedFlightsResponse, SearchCriteria } from './interfaces';
import { Router } from '@angular/router';
import { FlightSearchService, HomePageService } from 'rp-travel-ui';
import { SharedService } from '../../../../shared/shared.service';
import { IAirPortTranslated } from '../../../../core/models/airport.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MostSearchedFlightsService {
  public isLoading = false;
  public isError = false;
  public isEmpty = false;
  private translate = inject(TranslateService);
  private homePageService = inject(HomePageService);
  private _mostSearchedFlights: MostSearchedFlightsResponse[] = [];
  private http = inject(HttpClient);
  private router = inject(Router);
  private flightSearchService = inject(FlightSearchService);
  private sharedService = inject(SharedService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  getMostSearchedFlights() {
    this.isLoading = true;

    if (this.isBrowser) {
      const mostSearchedFlights = sessionStorage.getItem('mostSearchedFlights');
      if (mostSearchedFlights) {
        this._mostSearchedFlights = JSON.parse(mostSearchedFlights);
        this.isLoading = false;
        this.isEmpty = !this._mostSearchedFlights.length;
        return;
      }
    }

    this.http
      .get<MostSearchedFlightsResponse[]>('https://flightsearch.bookingwep.com/api/GetCheapestFlights?resCount=5')
      .pipe(
        retry(3),
        take(1),
        catchError((err) => {
          console.error(err);
          throw err;
        }),
      )
      .subscribe({
        next: (res) => {
          if (this.isBrowser) {
            sessionStorage.setItem('mostSearchedFlights', JSON.stringify(res));
          }
          this._mostSearchedFlights = res;
          this.isEmpty = !res.length;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.isError = true;
        },
      });
  }

  goToSearchResults(searchCriteria: SearchCriteria) {
    if (this.isBrowser) {
      localStorage.removeItem('form');
    }
    this.translate.use(searchCriteria.language || '');
    this.homePageService.getCountries(searchCriteria.language || '');
    this.sharedService.isFirstRequest = false;

    const form = {
      flightType: '',
      Direct: false,
      Flights: [
        {
          isDepartingSelected: false,
          isLandingSelected: false,
          departing: '',
          landing: '',
          departingD: '',
        },
      ],
      returnDate: '',
      passengers: {
        adults: 1,
        child: 0,
        infant: 0,
      },
      class: '',
    };

    const departing: IAirPortTranslated[] = [];
    const landing: IAirPortTranslated[] = [];

    switch (searchCriteria.flightType) {
      case 'Oneway':
        form.flightType = 'OneWay';
        this.flightSearchService.searchFlight.get('flightType')?.setValue('OneWay');
        break;
      case 'Roundtrip':
        form.flightType = 'RoundTrip';
        form.returnDate = searchCriteria.flights[1].departingOnDate;
        this.flightSearchService.searchFlight.get('flightType')?.setValue('RoundTrip');
        break;
      case 'Multicity':
        form.flightType = 'MultiCity';
        this.flightSearchService.searchFlight.get('flightType')?.setValue('MultiCity');
        break;
    }

    form.passengers.adults = searchCriteria.adultNum;
    form.passengers.child = searchCriteria.childNum + 1;
    form.passengers.infant = searchCriteria.infantNum;

    this.flightSearchService.searchFlight?.get('passengers.adults')?.setValue(searchCriteria.adultNum);
    this.flightSearchService.searchFlight?.get('passengers.child')?.setValue(searchCriteria.childNum);
    this.flightSearchService.searchFlight?.get('passengers.infant')?.setValue(searchCriteria.infantNum);

    form.class = searchCriteria.selectedFlightClass;

    let flights: string[] = [];
    form.Flights = [];

    searchCriteria.flights.forEach((e, i) => {
      const departingOnDate = new Date(e.departingOnDate);

      const formattedDate = departingOnDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      });

      flights.push(e.departingFrom + '-' + e.arrivingTo + '-' + formattedDate);

      if (!e.arrivingAirport || !e.departingAirport) {
        return;
      }

      form.Flights.push({
        isDepartingSelected: false,
        isLandingSelected: false,
        departing:
          e.arrivingAirport[this.sharedService.lang].cityName +
          ',' +
          e.arrivingAirport[this.sharedService.lang].airportCode,
        landing:
          e.arrivingAirport[this.sharedService.lang].cityName +
          ',' +
          e.departingAirport[this.sharedService.lang].airportCode,
        departingD: e.departingOnDate,
      });
      departing.push(e.departingAirport);
      landing.push(e.arrivingAirport);
    });

    this.router.navigate(
      [
        'flights-results',
        searchCriteria.language,
        searchCriteria.currency,
        searchCriteria.pos,
        searchCriteria.flightType,
        flights.join('_'),
        searchCriteria.searchId,
        'A-' + searchCriteria.adultNum + '-C-' + searchCriteria.childNum + '-I-' + searchCriteria.infantNum,
        searchCriteria.selectedFlightClass,
        searchCriteria.selectDirectFlightsOnly,
        'Airport_Airport',
      ],
      {
        queryParams: {
          cheapestFlights: true,
        },
      },
    );
  }

  get mostSearchedFlights() {
    return this._mostSearchedFlights;
  }
}
