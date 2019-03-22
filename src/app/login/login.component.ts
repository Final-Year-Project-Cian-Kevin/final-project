import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../services/user.service';
import { BrowserModule, Title }  from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginData = { username: '', password: '' };
  message = '';
  data: any;

  constructor(private router: Router, private userService: UserService, private titleService: Title) {}

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {

    this.setTitle("TB: Login");
  }

  // Login a user
  login() {
    this.userService.loginUser(this.loginData)
      .subscribe(resp => {
        this.data = resp;

        // Save response jwtToken
        this.userService.saveJwtToken(this.data.token);
        this.router.navigate(['index']);

        // Check if user is logged in
        if (this.userService.isLoggedIn) {
         // this.data = this.userService.getUserPayLoad();
          // Get user details
          var curUser = this.userService.getUserPayLoad();
          // Set logged in user as current user
          this.userService.setCurrentUser(curUser);
        }
      }, err => {
        this.message = err.error.msg;
      });
  }
 
}
