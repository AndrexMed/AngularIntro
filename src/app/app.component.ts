import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private usersSvc: UsersService,
              private authSvc: AuthService) {

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

  createUser(){
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

}
