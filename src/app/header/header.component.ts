import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginData = { username: '', password: '' };
  message = '';
  data: any;

  constructor(public userService: UserService,private router: Router) { }

  ngOnInit() {
  }
  //Login a user
  login() {
    this.userService.loginUser(this.loginData)
      .subscribe(resp => {
        this.data = resp;
        // Save response jwtToken
        this.userService.saveJwtToken(this.data.token);
        this.router.navigate(['index']);

        // Check if user is logged in
        if (this.userService.isLoggedIn) {
          var user = this.userService.getUserData();

          // Get user details
          var curUser = this.userService.getUserPayLoad();

          // Set logged in user as current user
          this.userService.setCurrentUser(curUser);
         
          this.loginData.username = user + "";
        }
      }, err => {
        this.message = err.error.msg;
        console.error("LOGIN COMPONENT", this.message);
        this.router.navigate(['login']);

      });
  }
  logout() {
    //localStorage.removeItem('jwtToken');
    this.userService.logout();
    this.router.navigate(['login']);
  }
}
