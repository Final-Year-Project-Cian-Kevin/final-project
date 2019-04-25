import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * CommentsService handles function calls to the comment API route.
 *
 * @export
 * @class CommentsService
 */
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  /**
   *Creates an instance of CommentsService.
   * @param {HttpClient} http
   * @memberof CommentsService
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
    // return an observable with a user-facing error message.
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
   * Get all comments made by users.
   *
   * @returns {Observable<any>}
   * @memberof CommentsService
   */
  getComments(): Observable<any> {
    return this.http.get("/api/comment/all", httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  /**
   * Get all comments made on a post using post ID.
   *
   * @param {string} id - the id of the post.
   * @returns {Observable<any>}
   * @memberof CommentsService
   */
  getCommentPostId(id: string): Observable<any> {
    const url = `${"api/comment/post"}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  /**
   * Get comments recently made by a user using username.
   *
   * @param {string} id - user id.
   * @returns {Observable<any>}
   * @memberof CommentsService
   */
  getCommentProfileId(id: string): Observable<any> {
    const url = `${"/api/comment/profiledate"}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  /**
   * Post comment using comment object.
   *
   * @param {*} data - data to post.
   * @returns {Observable<any>}
   * @memberof CommentsService
   */
  postComment(data: any): Observable<any> {
    const url = `/api/comment/post`;
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
