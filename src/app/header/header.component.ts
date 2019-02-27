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

  constructor(private userService: UserService,private router: Router) { }

  ngOnInit() {
  }
  //Login a user
  login() {
    console.log(`Enter login func`);
    this.userService.loginUser(this.loginData)
      .subscribe(resp => {
        this.data = resp;
        // Save response jwtToken
        this.userService.saveJwtToken(this.data.token);
        this.router.navigate(['index']);
        if (this.userService.isLoggedIn) {
          console.log("User is logged in" + this.data);
          var user = this.userService.getUserData();
          var curUser = this.userService.getUserPayLoad();
          this.userService.setCurrentUser(curUser);
          console.log("------- I AM A CHANGE___________");

          console.log("User is logged in" , this.data);
          console.log("User logged in is>>");
          console.log(this.userService.currentUser);

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
