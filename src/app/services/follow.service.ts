import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

// Define constants.
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const userApiURL = "/api/user";
const followApiURL = "/api/follow";

/**
 * FollowService handles function calls to the follow API route.
 *
 * @export
 * @class FollowService
 */
@Injectable({
  providedIn: 'root'
})
export class FollowService {

  /**
   *Creates an instance of FollowService.
   * @param {HttpClient} http
   * @memberof FollowService
   */
  constructor(private http: HttpClient) { }

  /**
   * Handles http errors.
   *
   * @private
   * @param {HttpErrorResponse} error
   * @returns an observable with a user-facing error message.
   * @memberof RedditApiService
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
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  /**
  * Extract data from response.
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

  /**
   * Follow a user.
   *
   * @param {*} data - the user to follow and the user being followed.
   * @returns {Observable<any>}
   * @memberof FollowService
   */
  followUser(data: any): Observable<any> {
    const url = `${followApiURL}/add`;
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Unfollow a user a user using object.
   *
   * @param {*} data- the user to follow and the user being followed.
   * @returns {Observable<any>}
   * @memberof FollowService
   */
  unFollowUser(data: any): Observable<any> {
    const url = `${followApiURL}/remove`;
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Returns a http call to recieve a users following data.
   *
   * @param {string} id - id of user.
   * @returns {Observable<any>}
   * @memberof FollowService
   */
  getFollowers(id: string): Observable<any> {
    const url = `${followApiURL}/${id}`;
    console.log("[DEBUG] getFollowers id/username: ", id);
    return this.http.get(url, httpOptions).pipe(
      catchError(this.handleError));
  }

  /**
   *  Returns a http call to recieve a users following data.
   *
   * @param {string} id - user id.
   * @returns {Observable<any>}
   * @memberof FollowService
   */
  getIsFollowing(id: string): Observable<any> {
    const url = `${followApiURL}/check/${id}`;
    console.log("[DEBUG] getFollowers id/username: ", id);
    return this.http.get(url, httpOptions).pipe(
      catchError(this.handleError));
  }
}
