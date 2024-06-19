import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './features/home/home.module';
import { SelectModule } from './features/select/select.module';
import { AuthenticateModule } from './features/authenticate/authenticate.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HomeModule,
    SelectModule,
    AuthenticateModule,
  ],
  providers: [provideAnimationsAsync(), provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
