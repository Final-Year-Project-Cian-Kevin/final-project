import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginData = { username: '', password: '' };
  message = '';
  data: any;


  constructor(private router: Router, private userService: UserService) {
    console.log('DEBUG : LoginComponent: IN constructor');
  }

  ngOnInit() {
  }

  // Login a user
  login() {
    this.userService.loginUser(this.loginData)
      .subscribe(resp => {
        this.data = resp;
        console.error("LOGIN resp errrrr=============");
        console.error(resp);
        console.error("LOGIN resp errrrr=============");
        // Save response jwtToken
        this.userService.saveJwtToken(this.data.token);
        this.router.navigate(['index']);

        // Check if user is logged in
        if (this.userService.isLoggedIn) {
          console.log("User is logged in");
          this.data = this.userService.getUserPayLoad();

          // Get user details
          var curUser = this.userService.getUserPayLoad();

          // Set logged in user as current user
          this.userService.setCurrentUser(curUser);
        }
      }, err => {
        console.error("LOGIN test errrrr=============");
        console.error(err);
        console.error("LOGIN test errrrr=============");

        this.message = err.error.msg;
        console.error("LOGIN COMPONENT", this.message)
      });
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
