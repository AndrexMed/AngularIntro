import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface OnExit{
  onExit: () => Observable<boolean> | Promise<boolean> | boolean
}

export const exitGuard: CanDeactivateFn<any> = (component, currentRoute, currentState, nextState) => {
  // const rta = confirm("Estas seguro que deseas salir?")
  // return rta;
  return component.onExit ? component.onExit() : true
};
