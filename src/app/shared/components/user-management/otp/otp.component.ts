import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { AuthService, OTP_STATUS, RESEND_OTP_STATUS } from 'rp-travel-ui';
import { Subscription } from 'rxjs';
import { SharedService } from '../../../shared.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
  standalone: true,
  imports: [TranslatePipe, NgStyle, NgClass, NgIf, NgOtpInputModule],
})
export class OtpComponent {
  dismiss = output<void>();

  authService = inject(AuthService);
  sharedService = inject(SharedService);
  subscription = new Subscription();

  error = false;
  resendError = false;
  resendSuccess = false;
  
  resendTimer = 60;
  canResend = false;
  private timerInterval: any = null;
  private successTimeout: any = null;

  ngOnInit(): void {
    this.subscription.add(
      this.authService.notify.subscribe({
        next: (status) => {
          if (status === OTP_STATUS.success) {
            this.dismiss.emit();
          } else if (status === RESEND_OTP_STATUS.success) {
            this.resendError = false;
            this.resendSuccess = true;
            if (this.successTimeout) {
              clearTimeout(this.successTimeout);
            }
            this.successTimeout = setTimeout(() => {
              this.resendSuccess = false;
              this.successTimeout = null;
            }, 5000);
          } else if (status === RESEND_OTP_STATUS.faild) {
            this.resendError = true;
            this.resendSuccess = false;
          } else if (status === OTP_STATUS.faild) {
            this.error = true;
          }
        },
      }),
    );

    this.startResendTimer();
  }

  onOtpChange(otp: string) {
    this.error = false;
    if (otp.length === 6) {
      this.authService.otpSubmit(otp);
    }
  }

  private startResendTimer(): void {
    this.resendTimer = 60;
    this.canResend = false;

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      this.resendTimer--;
      if (this.resendTimer <= 0) {
        this.resendTimer = 0;
        this.canResend = true;
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    }, 1000);
  }

  resendOtp(): void {
    const email = this.sharedService.registerEmail;
    
    if (email) {
      this.error = false;
      this.resendError = false;
      this.resendSuccess = false;
      this.authService.resendOtp(email);
      this.startResendTimer();
    } else {
      console.error("No email found to resend OTP");
    }
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }
    this.subscription.unsubscribe();
    this.authService.isLoading = false;
  }
}
 