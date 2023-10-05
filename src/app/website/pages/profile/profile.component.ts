import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User | null = null

  constructor(private authSvc: AuthService) { }
  
  ngOnInit(): void {
    this.authSvc.profile().subscribe(
      data => {
        this.user = data
      }
    )
  }
}
