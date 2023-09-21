import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private APIURL = `${environment.API_URL2}/api/auth`;

  constructor(private htpp: HttpClient) { }

  login(email: string, password: string){
    return this.htpp.post(`${this.APIURL}/login`, {email, password})
  }

  profile(){
    return this.htpp.get(`${this.APIURL}/profile`)
  }
}
