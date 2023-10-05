import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {

  console.log("Guards")
  const router = inject(Router)
  const tokenSvc = inject(TokenService)
  const token = tokenSvc.getToken()

  if (!token) {
    router.navigate(["/home"])
    return false;
  }

  return true;
};
