// This file contains logic for src/app/app.component.html:
import { Router } from '@angular/router';
import { Component, OnInit, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( private router: Router, private renderer: Renderer2) { }
  title = 'app';

  ngOnInit() {
    this.renderer.setStyle(document.body, 'background-color', '#DAE0E6'); // Makes all pages have a grey background
  }
  
  logout() {
    localStorage.removeItem('jwtToken');
  }
}
