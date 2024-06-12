import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './pages/home/components/hero/hero.component';
import { AboutComponent } from './pages/home/components/about/about.component';
import { SelectComponent } from './pages/select/select.component';
import { stepperComponent } from './components/stepper/stepper.component';
import { PricingComponent } from './pages/select/components/pricing/pricing.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    SelectComponent,
    stepperComponent,
    PricingComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
