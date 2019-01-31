import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  configUrl = 'https://www.reddit.com/r/ProgrammerHumor/hot.json?sort=new';
  
  getConfig() {
    return this.http.get(this.configUrl);
  }
}
