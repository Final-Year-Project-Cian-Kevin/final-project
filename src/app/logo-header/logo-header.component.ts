import { Component, OnInit } from '@angular/core';

/**
 * Component for header logo.
 *
 * @export
 * @class LogoHeaderComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-logo-header',
  templateUrl: './logo-header.component.html',
  styleUrls: ['./logo-header.component.css']
})
export class LogoHeaderComponent implements OnInit {

  /**
   *Creates an instance of LogoHeaderComponent.
   * @memberof LogoHeaderComponent
   */
  constructor() { }

  // Runs when page is called
  ngOnInit() {
  }

}
