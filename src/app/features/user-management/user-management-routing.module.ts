import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { FlightBookingComponent } from './components/flight-booking/flight-booking.component';
import { HotelsBookingComponent } from './components/hotels-booking/hotels-booking.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserManagementComponent } from './user-management.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: '',
    component: UserManagementComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'user-profile',
        pathMatch: 'full',
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
      },
      {
        path: 'flight-booking',
        component: FlightBookingComponent,
      },
      {
        path: 'hotels-booking',
        component: HotelsBookingComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
