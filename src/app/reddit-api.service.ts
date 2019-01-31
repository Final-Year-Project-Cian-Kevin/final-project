import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class RedditApiService {

  constructor(private jsonp: Jsonp) { }
}
