import { Component, inject } from '@angular/core';
import { FlightResultService } from 'rp-travel-ui';

@Component({
  standalone: false,
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrl: './price-filter.component.scss',
})
export class PriceFilterComponent {
  flightResultService = inject(FlightResultService);
}
