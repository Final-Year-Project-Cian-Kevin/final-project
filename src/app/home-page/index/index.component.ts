import { Component, OnInit } from '@angular/core';
import { RedditApiService } from '../services/reddit-api.service';
import { DataSource } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { BrowserModule, Title }  from '@angular/platform-browser';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
}