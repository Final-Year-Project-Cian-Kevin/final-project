import { Component, OnInit } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

/**
 * Component for about page.
 *
 * @export
 * @class AboutPageComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {

  /**
   *Creates an instance of AboutPageComponent.
   * @param {Title} titleService
   * @memberof AboutPageComponent
   */
  constructor(private titleService: Title) { }

  /**
   * Sets page title.
   *
   * @param {string} newTitle - the new title.
   * @memberof AboutPageComponent
   */
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  /**
   * Runs on page call.
   *
   * @memberof AboutPageComponent
   */
  ngOnInit() {
    // Set page title.
    this.setTitle("TB: About Us");
  }

}
