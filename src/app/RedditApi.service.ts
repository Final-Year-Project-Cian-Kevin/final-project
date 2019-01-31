import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const configUrl = 'https://www.reddit.com/r/ProgrammerHumor/hot.json?sort=new';

@Injectable()
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
  
  getConfig() {
    return this.http.get(configUrl);
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getBooks(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    return this.http.get(configUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
}
