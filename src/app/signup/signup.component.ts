import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signupData = { username: '', password: '' };
  message = '';
  
  constructor(private router: Router,private api: UserService) {
    console.log('DEBUG : SignupComponent: IN constructor');
  }

  ngOnInit() {
  }

  // convert to api 
  /*
  signup() {
    this.http.post('/api/signup', this.signupData).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['login']);
    }, err => {
      this.message = err.error.msg;
    });
  }
  */
  signup() {
    this.api.postUser(this.signupData)
    .subscribe(resp => {
      console.log(resp);
      this.router.navigate(['login']);
    }, err => {
      this.message = err.error.msg;
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