import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/users.model';
import { TokenService } from './token.service';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject<User | null>(null)
  user$ = this.user.asObservable()

  private APIURL = `${environment.API_URL3}/api/auth`;

  constructor(private htpp: HttpClient,
    private tokenSvc: TokenService) { }

  login(email: string, password: string) {
    return this.htpp.post<Auth>(`${this.APIURL}/login`, { email, password })
      .pipe(
        tap(response => { // Hacer un accion antes de entregar el resultado
          this.tokenSvc.saveToken(response.access_token)
        })
      )
  }

  profile() {
    return this.htpp.get<User>(`${this.APIURL}/profile`)
      .pipe(
        tap(user => this.user.next(user)),
        tap(user => console.log("user desde profile:", user)),
      )
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
      .pipe(
        switchMap(() => this.profile()),
      )
  }

  logout() {
    this.tokenSvc.removeToken()
    this.user.next(null);
  }
}
