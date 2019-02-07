import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

// Define constants
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const userApiURL = "/api/user";

// Interface to store user details
export interface UserDetails {
  username: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  //jwttoken
  private token: string;
  // Constructor
  constructor(private http: HttpClient) { }

  // save a token
  private saveJwtToken(token: string): void {
    localStorage.setItem('jwtToken', token);
    this.token = token;
  }

  // get a token
  private getJwtToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('jwtToken');
    }
    return this.token;
}
  // Post save a user
  postUser(data): Observable<any> {
    console.log("DEBUG_API<USERAPISERVICE>POSTUSER")
    return this.http.post(`${userApiURL}/signup`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Login a user
  loginUser(data): Observable<any> {
    console.log("DEBUG_API<USERAPISERVICE>LOGUSER")
    let baseObject;
    baseObject =  this.http.post(`${userApiURL}/signin`, data, httpOptions)

    return this.http.post(`${userApiURL}/signin`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Error Handler
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // console.error('DEBUG HANDLE ERROR:',error.error.message)
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  // Extract data from response
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
}
