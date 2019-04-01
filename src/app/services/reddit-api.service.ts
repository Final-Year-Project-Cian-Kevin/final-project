import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RedditApiService {

  constructor(private http: HttpClient) { }

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

  // Get data from response
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  // Get all posts
  getPosts(): Observable<any> {
    return this.http.get("/api/redditapi/all", httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // Get post by ID
  getPost(id: string): Observable<any> {
    const url = `${"/api/redditapi/all"}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // Get all funny/entertaining posts
  getPostsPF(): Observable<any> {
    return this.http.get("/api/redditapi/pf", httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // Get all news/information posts
  getPostsNews(): Observable<any> {
    return this.http.get("/api/redditapi/news", httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // Get all users posts
  getPostsUser(): Observable<any> {
    return this.http.get("/api/redditapi/userpost", httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // Get recent posts made by a user using username
  getRecentPostsUser(id: string): Observable<any> {
    const url = `${"/api/redditapi/allprofile"}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // Create a post using post details object
  postCreate(data): Observable<any> {
    return this.http.post("/api/redditapi/postall", data, httpOptions)
      .pipe(
      catchError(this.handleError)
      );
  }

  // Create user posts using post details object
  postCreateUser(data): Observable<any> {
    return this.http.post("/api/redditapi/postuser", data, httpOptions)
      .pipe(
      catchError(this.handleError)
      );
  }

  // Posts which have been saved by the user using username and post ID
  postSave(data): Observable<any> {
    return this.http.post("/api/savedPost/post", data, httpOptions)
      .pipe(
      catchError(this.handleError)
      );
  }

  // Post ID and username to see if an entry matches. If one is found the user is following given post
  getIsSaved(id1: string, id2: string): Observable<any> {
    const url = `${"/api/savedpost/post"}/${id1}/${id2}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // Get saved posts by a user using username
  getSaved(id: string): Observable<any> {
    const url = `${"/api/savedpost/profile"}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // Unsubscribe a user from a post using username and post ID
  delUnSub(id1: string, id2: string): Observable<any> {
    const url = `${"/api/savedpost/delete"}/${id1}/${id2}`;
    return this.http.delete(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
}