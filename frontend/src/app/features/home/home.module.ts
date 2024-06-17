import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent } from './components/about/about.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HeroComponent } from './components/hero/hero.component';
import { SolutionComponent } from './components/solution/solution.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    AboutComponent,
    CustomerComponent,
    HeroComponent,
    SolutionComponent,
    HomeComponent,
  ],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
