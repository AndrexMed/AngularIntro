import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  imgRta = ""

  constructor(private usersSvc: UsersService,
    private fileSvc: FilesService,
    private authSvc: AuthService,
    private tokenSvc: TokenService) {
  }

  ngOnInit(): void {
    const token = this.tokenSvc.getToken()
    if (token) {
      this.authSvc.profile().subscribe()
    }
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
      name: 'Giova',
      email: 'prueba2@mail.com',
      password: '12345',
      role: "admin"
    })
      .subscribe(
        rta => {
          console.log(rta)
        }
      )
  }

  downloadPdf() {
    this.fileSvc.getFile("my_pdf", "https://young-sands-07814.herokuapp.com/api/files/dummy.pdf", "application/pdf")
      .subscribe()
  }

  onUploadImg(event: Event) {
    const element = event.target as HTMLInputElement

    const file = element.files?.item(0)

    if (file) {
      this.fileSvc.uploadFile(file).subscribe(
        response => {
          console.log("upload", response)
          this.imgRta = response.location
        }
      )
    }

  }

}
