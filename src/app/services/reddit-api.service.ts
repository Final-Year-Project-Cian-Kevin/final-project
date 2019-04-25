import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * RedditApiService handles function calls to the API.
 *
 * @export
 * @class RedditApiService
 */
@Injectable({
  providedIn: 'root'
})
export class RedditApiService {

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
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  };

  /**
   * Get data from response.
   *
   * @private
   * @param {Response} res - the http response,
   * @returns a string reponse.
   * @memberof RedditApiService
   */
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }


  /**
   * Get all posts.
   *
   * @returns {Observable<any>}
   * @memberof RedditApiService
   */
  getPosts(): Observable<any> {
    return this.http.get("/api/redditapi/all", httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  /**
   *  Get post by ID.
   *
   * @param {string} id - the post id.
   * @returns {Observable<any>}
   * @memberof RedditApiService
   */
  getPost(id: string): Observable<any> {
    const url = `${"/api/redditapi/all"}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  /**
   * Get all funny/entertaining posts.
   *
   * @returns {Observable<any>}
   * @memberof RedditApiService
   */
  getPostsPF(): Observable<any> {
    return this.http.get("/api/redditapi/pf", httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  /**
   * Get all news/information posts.
   *
   * @returns {Observable<any>}
   * @memberof RedditApiService
   */
  getPostsNews(): Observable<any> {
    return this.http.get("/api/redditapi/news", httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  /**
   * Get all users posts.
   *
   * @returns {Observable<any>}
   * @memberof RedditApiService
   */
  getPostsUser(): Observable<any> {
    return this.http.get("/api/redditapi/userpost", httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  /**
   * Get recent posts made by a user using username.
   *
   * @param {string} id - id  of user.
   * @returns {Observable<any>}
   * @memberof RedditApiService
   */
  getRecentPostsUser(id: string): Observable<any> {
    const url = `${"/api/redditapi/allprofile"}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  /**
   * Create a post using post details object.
   *
   * @param {*} data - the post data.
   * @returns {Observable<any>}
   * @memberof RedditApiService
   */
  postCreate(data): Observable<any> {
    return this.http.post("/api/redditapi/postall", data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   *  Create user posts using post details object.
   *
   * @param {*} data - the post data.
   * @returns {Observable<any>}
   * @memberof RedditApiService
   */
  postCreateUser(data): Observable<any> {
    return this.http.post("/api/redditapi/postuser", data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Posts which have been saved by the user using username and post ID.
   *
   * @param {*} data - the post data.
   * @returns {Observable<any>}
   * @memberof RedditApiService
   */
  postSave(data): Observable<any> {
    return this.http.post("/api/savedPost/post", data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Post ID and username to see if an entry matches. If one is found the user is following given post.
   *
   * @param {string} id1 - users id.
   * @param {string} id2 - users id.
   * @returns {Observable<any>}
   * @memberof RedditApiService
   */
  getIsSaved(id1: string, id2: string): Observable<any> {
    const url = `${"/api/savedpost/post"}/${id1}/${id2}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  /**
   * Get saved posts.
   *
   * @param {string} id - users username.
   * @returns {Observable<any>}
   * @memberof RedditApiService
   */
  getSaved(id: string): Observable<any> {
    const url = `${"/api/savedpost/profile"}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  /**
   * Unsubscribe a user from a post.
   *
   * @param {string} id1 - user id.
   * @param {string} id2 - post id.
   * @returns {Observable<any>}
   * @memberof RedditApiService
   */
  delUnSub(id1: string, id2: string): Observable<any> {
    const url = `${"/api/savedpost/delete"}/${id1}/${id2}`;
    return this.http.delete(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
}