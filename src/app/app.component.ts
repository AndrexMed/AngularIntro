import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { StoreService } from './services/store.service';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  token = ""

  constructor(private usersSvc: UsersService,
    private authSvc: AuthService,
    private storeSvc: StoreService) {

  }

  //https://source.unsplash.com/random
  imgParent = '';
  showImg = true

  onLoaded(img: string) {
    console.log("Log padre: " + img)
  }

  toggleImg() {
    this.showImg = !this.showImg
  }

  createUser() {
    this.usersSvc.create({
      name: "Prueba1",
      email: "prueba@mail.com",
      password: "12345"
    })
      .subscribe(
        rta => {
          console.log(rta)
        }
      )
  }

  login() {
    this.authSvc.login("prueba@mail.com", "12345")
      .pipe(
        switchMap(token => {
          this.token = token.access_token
          return this.authSvc.profile(token.access_token)
        })
      )
      .subscribe(
        response => {
          console.log(response)
          this.storeSvc.sharedProfile(response)
        }
      )
  }
  // login() {
  //   this.authSvc.login("prueba@mail.com", "12345")
  //     .subscribe(
  //       rta => {
  //         this.token = rta.access_token
  //         console.log(rta.access_token)
  //       }
  //     )
  // }

  getProfile() {
    this.authSvc.profile(this.token)
      .subscribe(
        profile => {
          console.log(profile)
          this.storeSvc.sharedProfile(profile)
        }
      )
  }

}
