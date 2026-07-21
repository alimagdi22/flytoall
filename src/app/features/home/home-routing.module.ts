import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { TermsComponent } from './components/terms/terms.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { SEO_METADATA } from '../../core/constants/seo-metadata.config';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { seo: SEO_METADATA['home'] } },
  { path: 'about-us', component: AboutUsComponent, data: { seo: SEO_METADATA['aboutUs'] } },
  { path: 'contact-us', component: ContactUsComponent, data: { seo: SEO_METADATA['contactUs'] } },
  { path: 'terms', component: TermsComponent, data: { seo: SEO_METADATA['terms'] } },
  { path: 'privacy-policy', component: PrivacyPolicyComponent, data: { seo: SEO_METADATA['privacyPolicy'] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
