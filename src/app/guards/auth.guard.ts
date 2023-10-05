import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { map, retry } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  console.log("Guards")
  const router = inject(Router)
  const tokenSvc = inject(TokenService)
  const authSvc = inject(AuthService)

  // const token = tokenSvc.getToken()
  // if (!token) {
  //   router.navigate(["/home"])
  //   return false;
  // }
  // return true;

  return authSvc.user$.pipe(
    map(user => {
      if (!user) {
        router.navigate(["/home"])
        return false;
      }
      return true
    })
  )
};
