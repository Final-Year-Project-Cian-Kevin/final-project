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
  /*
  // move to api
  login() {
    console.log(`Enter login func`);
    this.http.post('/api/user/signin', this.loginData).subscribe(resp => {
      this.data = resp;
      localStorage.setItem('jwtToken', this.data.token);
      this.router.navigate(['books']);
    }, err => {
      this.message = err.error.msg;
    });
  }
  */
  // Login a user
  login() {
    console.log(`Enter login func`);
    this.userService.loginUser(this.loginData)
      .subscribe(resp => {
        this.data = resp;
        // Save response jwtToken
        this.userService.saveJwtToken(this.data.token);
        this.router.navigate(['books']);
        if (this.userService.isLoggedIn) {
          console.log("User is logged in");
        }
      }, err => {
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
