import { Component, OnInit } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {

  constructor(private titleService: Title) { }

  // Function which takes a string and sets the value as the page title
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  // Runs on page call
  ngOnInit() {
    // Set page title
    this.setTitle("TB: About Us");
  }

}
