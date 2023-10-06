import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {

  const authSvc = inject(AuthService)
  const router = inject(Router)

  return authSvc.user$.pipe(
    map(user => {
      console.log("user desde adming guard",user)
      if (user?.role === 'admin') {
        return true;
      } else {
        router.navigate(["/home"])
        return false
      }
    })
  )
};