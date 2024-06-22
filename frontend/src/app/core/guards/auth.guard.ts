// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   CanActivateFn,

//   Router,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { AuthService } from '../services/auth/auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export const AuthGuard implements CanActivateFn {
//   constructor(private authservice: AuthService, private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean {
//     const currentUser = this.authservice.currentUserValue;
//     if (currentUser) {
//       return true;
//     }
//     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
//     return false;
//   }
// }
