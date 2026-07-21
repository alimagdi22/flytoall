import { Component, Input } from '@angular/core';
import { IPouplarDest } from '../popular-dest.component';

@Component({
  standalone: false,
  selector: 'app-popular-dest-card',
  templateUrl: './popular-dest-card.component.html',
  styleUrl: './popular-dest-card.component.scss',
})
export class PopularDestCardComponent {
  @Input({ required: true }) popularDestination!: IPouplarDest;
}
