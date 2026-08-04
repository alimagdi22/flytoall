import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, RESET_PASSWORD_STATUS, UserProfileService, VERIFY_TOKEN_STATUS } from 'rp-travel-ui';
import { Subscription } from 'rxjs';
import { SharedService } from '../../../../shared/shared.service';

@Component({
  standalone: false,
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public translate = inject(TranslateService);
  public authService = inject(AuthService);
  public userProfileService = inject(UserProfileService);
  public sharedService = inject(SharedService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private subscription = new Subscription();

  isSuccessfullyReset = false;
  error = false;
  invalidToken = false;
  showNewPassword = false;
  showConfirmPassword = false;

  email = '';
  token = '';

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParamMap.subscribe((params) => {
        this.email = params.get('email') ?? '';
        this.token = params.get('token') ? decodeURIComponent(params.get('token')!) : '';

        this.authService.initResetPasswordForm(this.token, this.email);

        if (this.token && this.email) {
          this.authService.verifyResetPasswordToken(this.token, this.email);
        } else {
          this.invalidToken = true;
        }
      }),
    );

    this.subscription.add(
      this.authService.notify.subscribe({
        next: (status) => {
          if (status === RESET_PASSWORD_STATUS.success) {
            this.isSuccessfullyReset = true;
            this.error = false;
          } else if (status === RESET_PASSWORD_STATUS.faild) {
            this.error = true;
          } else if (status === VERIFY_TOKEN_STATUS.faild) {
            this.invalidToken = true;
          } else if (status === VERIFY_TOKEN_STATUS.success) {
            this.invalidToken = false;
          }
        },
      }),
    );
  }

  onReset(): void {
    if (this.resetPasswordForm.valid) {
      this.authService.restPassword();
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }

  goToSignIn(e?: Event): void {
    if (e) {
      e.stopPropagation();
    }
    this.router.navigate(['/']);
    this.sharedService.userManagementNotifier.next(1);
  }

  get isLoading(): boolean {
    return this.authService.isLoading;
  }

  get resetPasswordForm() {
    return this.authService.resetPasswordForm;
  }

  get lang(): 'en' | 'ar' {
    return this.translate.currentLang === 'ar' ? 'ar' : 'en';
  }

  get getPasswordErrorMessage() {
    return this.authService.getPasswordErrorMessage.bind(this.authService);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.authService.isLoading = false;
  }
}
