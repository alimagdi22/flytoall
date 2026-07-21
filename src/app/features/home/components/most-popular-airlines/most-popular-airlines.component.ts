import { AfterViewInit, Component, ElementRef, inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SharedService } from '../../../../shared/shared.service';

@Component({
  standalone: false,
  selector: 'app-most-popular-airlines',
  templateUrl: './most-popular-airlines.component.html',
  styleUrl: './most-popular-airlines.component.scss',
})
export class MostPopularAirlinesComponent implements AfterViewInit {
  popularAirlines = [
    'assets/images/popular-airlines/egypt-air.png',
    'assets/images/popular-airlines/Emirates-Symbol 1.png',
    'assets/images/popular-airlines/الشركة-السعودية-لهندسة-وصناعة-الطيران 1.png',
    'assets/images/popular-airlines/ku.png',
    'assets/images/popular-airlines/gf.png',
    'assets/images/popular-airlines/ey.png',
  ];
  public sharedService = inject(SharedService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  @ViewChild('swiperEl', { static: false }) swiperEl!: ElementRef;

  ngAfterViewInit(): void {
    if (!this.isBrowser || !this.swiperEl) return;
    const swiper = this.swiperEl.nativeElement;
    if (!swiper) return;

    Object.assign(swiper, {
      slidesPerView: 2,
      spaceBetween: 20,
      pagination: { bulletClass: 'hide' },
      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 10,
        },
      },
    });
  }
}
