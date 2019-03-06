import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RedditApiService } from '../services/reddit-api.service';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-savedposts',
  templateUrl: './savedposts.component.html',
  styleUrls: ['./savedposts.component.css']
})
export class SavedpostsComponent implements OnInit {

  saved = {};

  constructor(private route: ActivatedRoute, private api: RedditApiService, private router: Router) { }

  ngOnInit() {
    this.getSavedPosts(this.route.snapshot.params['id']);
  }

  getSavedPosts(id) {
    this.api.getSaved(id)
      .subscribe(data => {
        this.saved = data;
        console.log(this.saved);
      });
  }

}
