
/* 
 this file contains logic for src/app/app.component.html:
 */
import { Router } from '@angular/router';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( private router: Router) { }
  title = 'app';
  
  logout() {
    localStorage.removeItem('jwtToken');
    //this.userSerice.logout();
  }
}
