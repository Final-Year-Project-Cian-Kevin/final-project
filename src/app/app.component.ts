import { Router } from '@angular/router';
import { Component, OnInit, Renderer2 } from '@angular/core';

/**
 * This file contains logic for src/app/app.component.html.
 *
 * @export
 * @class AppComponent
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   *Creates an instance of AppComponent.
   * @param {Router} router
   * @param {Renderer2} renderer
   * @memberof AppComponent
   */
  constructor(private router: Router, private renderer: Renderer2) { }
  title = 'app';

  /**
   * Initilise component.
   *
   * @memberof AppComponent
   */
  ngOnInit() {
    this.renderer.setStyle(document.body, 'background-color', '#DAE0E6'); // Makes all pages have a grey background
  }

  /**
   * Remove JWT token.
   *
   * @memberof AppComponent
   */
  logout() {
    localStorage.removeItem('jwtToken');
  }
}
