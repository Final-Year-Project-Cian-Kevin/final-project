import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// url to API route.
const apiUrl = "/api/books";

/**
 * ApiService handles function calls to the  API route.
 *
 * @export
 * @class ApiService
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /**
   *Creates an instance of ApiService.
   * @param {HttpClient} http
   * @memberof ApiService
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
    // Return an observable with a user-facing error message.
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
   * Get all books.
   *
   * @returns {Observable<any>}
   * @memberof ApiService
   */
  getBooks(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  /**
   *  Get single book using id of book .
   *
   * @param {string} id - book id.
   * @returns {Observable<any>}
   * @memberof ApiService
   */
  getBook(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  /**
   * Add a book.
   *
   * @param {*} data
   * @returns {Observable<any>}
   * @memberof ApiService
   */
  postBook(data: any): Observable<any> {
    return this.http.post(apiUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Update a book using book ID.
   *
   * @param {string} id - book id.
   * @param {*} data - book data.
   * @returns {Observable<any>}
   * @memberof ApiService
   */
  updateBook(id: string, data: any): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Delete a book using ID.
   *
   * @param {string} id -book id.
   * @returns {Observable<{}>}
   * @memberof ApiService
   */
  deleteBook(id: string): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
