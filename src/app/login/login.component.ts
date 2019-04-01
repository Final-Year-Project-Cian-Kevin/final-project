import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../services/user.service';
import { BrowserModule, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginData = { username: '', password: '' };
  message = '';
  data: any;

  constructor(private router: Router, private userService: UserService, private titleService: Title) { }

  // Function used to set title page
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  // Runs on page call
  ngOnInit() {
    // Set page title
    this.setTitle("TB: Login");

    // Check if user is already logged in
    if (this.userService.isLoggedIn()) {
      // Route user to index page
      this.router.navigate(['index']);
    }
  }

  // Called when user clicks login
  login() {
    // Login a user
    this.userService.loginUser(this.loginData)
      .subscribe(resp => {
        this.data = resp;
        // Save response jwtToken
        this.userService.saveJwtToken(this.data.token);
        location.reload(true); // Page refresh
      }, err => {
        this.message = err.error.msg;
      });
  }

}
