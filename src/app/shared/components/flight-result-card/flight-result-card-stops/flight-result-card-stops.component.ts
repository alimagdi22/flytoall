import { CommonModule, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IFlight } from 'rp-travel-ui';
import { DurationFormatPipe } from '../../../pipes/duration-format.pipe';

@Component({
  selector: 'app-flight-result-card-stops',
  standalone: true,
  imports: [NgClass, CommonModule, TranslateModule, DurationFormatPipe],
  templateUrl: './flight-result-card-stops.component.html',
  styleUrl: './flight-result-card-stops.component.scss',
})
export class FlightResultCardStopsComponent {
  @Input() flight!: IFlight;
  @Input() currentLang!: string;

  getTransitLineWidth(minutes: number): string {
    const maxTransitMinutes = 300;
    const maxWidth = 60;
    const unitWidth = maxWidth / maxTransitMinutes;
    const width = Math.min(minutes * unitWidth, maxWidth);

    return `${width}px`;
  }

  convertTimeToMinutes(time: string): number {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 60 + minutes + Math.floor(seconds / 60);
  }

  getTotalTransitMinutes(...times: string[]): number {
    const convert = (time: string) => {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      return hours * 60 + minutes + Math.floor((seconds || 0) / 60);
    };

    return times.reduce((sum, time) => sum + convert(time), 0);
  }
}
