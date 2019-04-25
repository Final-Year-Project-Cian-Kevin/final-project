import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { getOrCreateInjectable } from '@angular/core/src/render3/di';
import { debug } from 'util';

// Define constants.
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// Route to api.
const userApiURL = "/api/user";

// Interface to store user details.
export interface UserDetails {
  username: string;
}

// Interface to store user details.
export interface Profile {
  username: string;
  first_name: string;
  surname: string;
  bio: string;
  image: string;
  join_date: Date;
  email: string;
}

/**
 * UserService is a api service for dealing with all user resources.
 *
 * @export
 * @class UserService
 */
@Injectable({
  providedIn: 'root'
})

/**
 * UserService is a api service for dealing with all user resources.
 */
export class UserService {
  private token: string;
  currentUser: any;

  /**
   *Creates an instance of UserService.
   * @param {HttpClient} http
   * @memberof UserService
   */
  constructor(private http: HttpClient) { }

  /**
   * Error handler
   *
   * @private
   * @param {HttpErrorResponse} error
   * @returns
   * @memberof UserService
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  };

  /**
   * Extract data from response
   *
   * @private
   * @param {Response} res
   * @returns the body of the response.
   * @memberof UserService
   */
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  /************************ API use functions ********************************/

  /**
   * GET request to API to return profile data.
   * Can take either a user_id or username.
   *
   * @param {string} id - the user id to search.
   * @returns {Observable<any>}
   * @memberof UserService
   */
  getProfile(id: string): Observable<any> {
    const url = `${"/api/profile"}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      catchError(this.handleError));
  }

  /**
   * PUT request to API to update profile data.
   *
   * @param {string} id - user id to upadte.
   * @param {*} data - data to update.
   * @returns {Observable<any>}
   * @memberof UserService
   */
  updateUser(id: string, data): Observable<any> {
    const url = `${userApiURL}/update/${id}`;
    return this.http.put(url, data, httpOptions);
  }

  /**
   * POST request to api to add a new user to the 'users' table in db.
   *
   * @param {*} data - the data to send.
   * @returns {Observable<any>}
   * @memberof UserService
   */
  postUser(data): Observable<any> {
    return this.http.post(`${userApiURL}/signup`, data, httpOptions)
  }

  /**
   * POST request to api to log in a user from the 'users' table in db.
   * 
   * @param data - the log in data.
   */
  loginUser(data): Observable<any> {
    let baseObject;
    return this.http.post(`${userApiURL}/signin`, data, httpOptions);
  }

  /**
   * GET user data.
   *
   * @returns {Observable<any>}
   * @memberof UserService
   */
  getUserData(): Observable<any> {
    const url = `${"/api/user/userdata"}/${this.getJwtToken()}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  /************************ General use functions ********************************/

  /**
   * Saves a JWT token in storage.
   *
   * @param {string} token - the token to save.
   * @memberof UserService
   */
  saveJwtToken(token: string): void {
    localStorage.setItem('jwtToken', token);
    this.token = token;
  }

  /**
   * Get the jwt token.
   * 
   * @returns {string} - ther jwt string.
   * @memberof UserService
   */
  getJwtToken(): string {
    return localStorage.getItem('jwtToken');
  }

  /**
   * Logout a user by removing token.
   *
   * @memberof UserService
   */
  logout() {
    localStorage.removeItem('jwtToken');
    this.isLoggedIn();
  }

  /**
   * Check if user is logged in.
   *
   * @returns {boolean} - true or false if logged in.
   * @memberof UserService
   */
  isLoggedIn(): boolean {
    var currentToken = this.getJwtToken();
    if (currentToken) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Set current logged in user.
   *
   * @param {*} user - the current user.
   * @memberof UserService
   */
  setCurrentUser(user) {
    this.currentUser = user;
  }

  /**
   * Get the current user.
   *
   * @returns current user.
   * @memberof UserService
   */
  getCurrentUser() {
    return this.currentUser
  }

  /**
   * Get user details from token.
   *
   * @returns json representation of user.
   * @memberof UserService
   */
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
}
