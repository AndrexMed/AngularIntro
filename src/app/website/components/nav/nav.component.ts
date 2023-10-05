import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/product.model';
import { User } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  categories: Category[] = []

  profile: User | null = null;

  activeMenu = false

  counter = 0

  token = '';

  constructor(private storeSvc: StoreService,
    private authSvc: AuthService,
    private categoriesSvc: CategoriesService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.storeSvc.myCart$.subscribe(products => {
      this.counter = products.length
    })

    // this.storeSvc.profile$.subscribe(profile => {
    //   this.profile = profile
    // })

    this.getAllCategories()
    this.authSvc.user$.subscribe(
      data => {
        this.profile = data
      }
    )
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu
  }

  login() {
    //this.authService.login('sebas@mail.com', '1212')
    //.subscribe(rta => {
    //  this.token = rta.access_token;
    //  console.log(this.token);
    //  this.getProfile();
    //});
    this.authSvc.loginAndGet('john@mail.com', 'changeme')
      .subscribe(() => {
        this.router.navigate(["/profile"])
        //this.profile = user;
        //this.token = '---';
      });
  }

  getProfile() {
    this.authSvc.profile()
      .subscribe(user => {
        this.profile = user;
      });
  }

  getAllCategories() {
    this.categoriesSvc.getAll()
      .subscribe(
        data => {
          this.categories = data
        }
      )
  }

  logout() {
    this.authSvc.logout()
    this.profile = null
    this.router.navigate(["/home"])
  }
}
