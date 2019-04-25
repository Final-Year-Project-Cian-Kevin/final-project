import { Component, OnInit, Renderer2 } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { BrowserModule, Title } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';

/**
 * IndexComponent for index.
 *
 * @export
 * @class IndexComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {

  /**
   * Creates an instance of IndexComponent.
   * @param {Renderer2} renderer
   * @memberof IndexComponent
   */
  constructor(private renderer: Renderer2) { }

  // On page call.
  ngOnInit() {
  }

}