import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {

  console.log("Guard Admin")

  const authSvc = inject(AuthService)
  const router = inject(Router)

  return authSvc.user$.pipe(
    map(user => {
      if (user?.role === "customer") {
        return true;
      } else {
        router.navigate(["/home"])
        return false
      }
    })
  )
};
