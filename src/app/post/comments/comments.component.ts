import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RedditApiService } from '../../services/reddit-api.service';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  post = {};

  constructor(private route: ActivatedRoute, private api: RedditApiService, private router: Router, private titleService: Title) { }

  ngOnInit() {
    console.log(localStorage.getItem("postID"));
  }

}
