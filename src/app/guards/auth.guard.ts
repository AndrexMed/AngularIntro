import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {

  console.log("Guards")
  const tokenSvc = inject(TokenService)
  const token = tokenSvc.getToken()

  return token ? true : false;
};
