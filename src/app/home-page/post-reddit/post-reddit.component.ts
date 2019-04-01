import { Component, OnInit } from '@angular/core';
import { RedditApiService } from '../../services/reddit-api.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { BrowserModule, Title } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-reddit',
  templateUrl: './post-reddit.component.html',
  styleUrls: ['./post-reddit.component.css']
})
export class PostRedditComponent implements OnInit {

  postsPopular: any;
  postsNews: any;
  postsUser: any;
  username;

  constructor(private api: RedditApiService, private router: Router, private titleService: Title, private formBuilder: FormBuilder, private userAPI: UserService) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit() {
    this.api.getPostsPF()
      .subscribe(res => {
        this.postsPopular = res
      }, err => {
        console.log(err);
        if (err.status = 401) {
          this.router.navigate(['login']);
        }
      });

    this.api.getPostsNews()
      .subscribe(res => {
        this.postsNews = res;
      }, err => {
        console.log(err);
        if (err.status = 401) {
          this.router.navigate(['login']);
        }
      });

    this.api.getPostsUser()
      .subscribe(res => {
        this.postsUser = res;
      }, err => {
        console.log(err);
        if (err.status = 401) {
          this.router.navigate(['login']);
        }
      });

    if (this.userAPI.isLoggedIn()) {
      this.userAPI.getUserData()
        .subscribe(res => {
          this.username = res;
        }, err => {
          console.log(err);
          if (err.status = 401) {
            this.router.navigate(['login']);
          }
        });
    }

    this.setTitle("TB: Popular Today!");

    // Wait for get methods to api to finish then run
    setTimeout(() => {
      this.getProfileData();// Gets profile data for each poster
    },
      200);
  }

  getProfileData() {

    for (var i = 0; i < this.postsPopular.length; i++) {
      this.userAPI.getProfile(this.postsPopular[i].subreddit)
        .subscribe(data => {
          for (var i = 0; i < this.postsPopular.length; i++) {
            if (this.postsPopular[i].subreddit == data[0].username) {
              this.postsPopular[i]['image'] = data[0].image;
            }
          }
        });
    }

    for (var i = 0; i < this.postsNews.length; i++) {
      this.userAPI.getProfile(this.postsNews[i].subreddit)
        .subscribe(data => {
          for (var i = 0; i < this.postsNews.length; i++) {
            if (this.postsNews[i].subreddit == data[0].username) {
              this.postsNews[i]['image'] = data[0].image;
            }
          }
        });
    }

    for (var i = 0; i < this.postsUser.length; i++) {
      this.userAPI.getProfile(this.postsUser[i].subreddit)
        .subscribe(data => {
          for (var i = 0; i < this.postsUser.length; i++) {
            if (this.postsUser[i].subreddit == data[0].username) {
              this.postsUser[i]['image'] = data[0].image;
            }
          }
        });
    }
  }
}