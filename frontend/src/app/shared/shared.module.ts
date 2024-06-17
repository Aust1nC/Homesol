import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { HeaderFooterLayoutComponent } from './layouts/header-footer-layout/header-footer-layout.component';
import { NoHeaderFooterLayoutComponent } from './layouts/no-header-footer-layout/no-header-footer-layout.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeaderFooterLayoutComponent,
    NoHeaderFooterLayoutComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {}
