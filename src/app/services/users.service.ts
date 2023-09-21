import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateUserDTO, User } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private APIURL = `${environment.API_URL2}/api/users`;

  constructor(private htpp: HttpClient) { }

  create(dto: CreateUserDTO){
    return this.htpp.post<User>(this.APIURL, dto)
  }

  getAll(){
    return this.htpp.get<User[]>(this.APIURL)
  }
}
