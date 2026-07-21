import { Component, inject, OnInit } from '@angular/core';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { SharedService } from '../../shared/shared.service';
import { MostSearchedFlightsService } from './components/most-searched-flights/most-searched-flights.service';
import { FlightResultService } from 'rp-travel-ui';
import { SeoService } from '../../core/services/seo.service';
import { SEO_METADATA } from '../../core/constants/seo-metadata.config';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public sharedService = inject(SharedService);
  public mostSearchedFlightsService = inject(MostSearchedFlightsService);
  private flightResultService = inject(FlightResultService);
  private gtmService = inject(GoogleTagManagerService);
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updateSeo(SEO_METADATA['home']);
    this.flightResultService.loading = false;
    this.gtmService.pushTag({
      event: 'home_view',
      page: 'home',
      timestamp: new Date().toISOString(),
    });
  }
}
