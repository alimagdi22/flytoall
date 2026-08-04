import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [],
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.scss',
})
export class PaymentModalComponent {
  router = inject(Router);
  translate = inject(TranslateService);

  goToHomePage() {
    this.router.navigate(['/']);
  }
}
