import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { getOrCreateInjectable } from '@angular/core/src/render3/di';
import { debug } from 'util';

// Define constants
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const userApiURL = "/api/user";
//const followApiURL = "/api/user";

// Interface to store user details
export interface UserDetails {
  username: string;
}
export interface Profile {
  username: string;
  first_name: string;
  surname: string;
  bio: string;
  image: string;
  join_date: Date;
  email: string;
}

@Injectable({
  providedIn: 'root'
})

/**
 * UserService is a api service for dealing with all user resources.
 */
export class UserService {
  // jwt
  private token: string;
  currentUser: any;
  // Constructor
  constructor(private http: HttpClient) { }

  /************************ API use functions ********************************/

  /**
   * GET request to API to return profile data.
   * Can take either a user_id or username.
   *
   * @param id The id or username to check
  */
  getProfile(id: string): Observable<any> {
    const url = `${"/api/profile"}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      // map(this.extractData),
      catchError(this.handleError));
  }

  /**
   * PUT request to API to update profile data.
   * @param id The id of user to update.
   * @param data the form data to update.
   */
  updateUser(id: string, data): Observable<any> {
    const url = `${userApiURL}/update/${id}`;
    return this.http.put(url, data, httpOptions);
  }

  /**
   * POST request to api to add a new user to the 'users' table in db.
   * 
   * @param data the new signup data for the user
   */
  postUser(data): Observable<any> {
    return this.http.post(`${userApiURL}/signup`, data, httpOptions)
     // .pipe(
      //  catchError(this.handleError)
      //);
  }

  /**
   * POST request to api to log in a user from the 'users' table in db.
   * 
   * @param data the log in data for the user
   */
  loginUser(data): Observable<any> {
    let baseObject;

    return this.http.post(`${userApiURL}/signin`, data, httpOptions);
    // .pipe(
    //   catchError(this.handleError)
    //  );
  }
  
  getUserData(): Observable<any> {
    const url = `${"/api/user/userdata"}/${this.getJwtToken()}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }


  /************************ General use functions ********************************/

  // save a token
  saveJwtToken(token: string): void {
    localStorage.setItem('jwtToken', token);
    this.token = token;
  }

  // get a token
  getJwtToken(): string {
    return localStorage.getItem('jwtToken');
  }

  // Log out user
  logout() {
    localStorage.removeItem('jwtToken');
    this.isLoggedIn();
  }

  isLoggedIn(): boolean {
    var currentToken = this.getJwtToken();
    if (currentToken) {
      return true;
    } else {
      return false;
    }
  }

  // set current logged in user
  setCurrentUser(user) {
    this.currentUser = user;
  }

  // Get the current user
  getCurrentUser() {
    return this.currentUser
  }

  getUserPayLoad() {
    var token = this.getJwtToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      this.currentUser = userPayload;
      return JSON.parse(userPayload);
    }
    else {
      return null;
    }
  }


  /*
    getProfile(id: string): Observable<any> {
      const url = `${"/api/user/profile"}/${id}`;
      return this.http.get(url, httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError));
    }
  */



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
