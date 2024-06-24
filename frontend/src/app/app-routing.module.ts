import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home.component';
import { HeaderFooterLayoutComponent } from './shared/layouts/header-footer-layout/header-footer-layout.component';
import { NoHeaderFooterLayoutComponent } from './shared/layouts/no-header-footer-layout/no-header-footer-layout.component';

const routes: Routes = [
  // Default route for home
  {
    path: '',
    component: HeaderFooterLayoutComponent, // Use HeaderFooterLayoutComponent by default
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./features/select/select.module').then((m) => m.SelectModule),
      },
    ],
  },
  // Auth routes
  {
    path: 'auth',
    component: NoHeaderFooterLayoutComponent, // Use NoHeaderFooterLayoutComponent for login route
    loadChildren: () =>
      import('./features/authenticate/authenticate.module').then(
        (m) => m.AuthenticateModule
      ),
  },

  {
    path: 'user',
    component: NoHeaderFooterLayoutComponent,
    loadChildren: () =>
      import('./features/user/user.module').then((m) => m.UserModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
