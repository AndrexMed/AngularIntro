import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private APIURL = `${environment.API_URL2}/api/auth`;

  constructor(private htpp: HttpClient) { }

  login(email: string, password: string){
    return this.htpp.post<Auth>(`${this.APIURL}/login`, {email, password})
  }

  profile(token: string){

    // const header = new HttpHeaders()  FORMA DE DECLARAR HEADERS
    // header.set("Authorization", `Bearer, ${token}`)

    return this.htpp.get<User>(`${this.APIURL}/profile`, { headers: {
      Authorization: `Bearer ${token}`,
      //"Content-type": "application/json"
    }})
  }
}
