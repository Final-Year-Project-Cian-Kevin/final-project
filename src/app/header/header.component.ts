import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <p>
    Header Test
  </p>
`,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
