import { Component, OnInit } from '@angular/core';
import { RedditApiService } from '../../services/reddit-api.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { BrowserModule, Title } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

/**
 * Componet for reddit posts.
 *
 * @export
 * @class PostRedditComponent
 * @implements {OnInit}
 */
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

  /**
   *Creates an instance of PostRedditComponent.
   * @param {RedditApiService} api
   * @param {Router} router
   * @param {Title} titleService
   * @param {FormBuilder} formBuilder
   * @param {UserService} userAPI
   * @memberof PostRedditComponent
   */
  constructor(private api: RedditApiService, private router: Router, private titleService: Title, private formBuilder: FormBuilder, private userAPI: UserService) { }

  /**
   * Set title.
   *
   * @param {string} newTitle - the title to set.
   * @memberof PostRedditComponent
   */
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  /**
   * Runs when page is called.
   *
   * @memberof PostRedditComponent
   */
  ngOnInit() {
    // Gets all Funny/Entertaining posts from the API.
    this.api.getPostsPF()
      .subscribe(res => {
        this.postsPopular = res // Set data to local variable.
      }, err => {
        console.log(err);
        if (err.status = 401) {
          this.router.navigate(['login']);
        }
      });

    // Gets all news posts from the API.
    this.api.getPostsNews()
      .subscribe(res => {
        this.postsNews = res;
      }, err => {
        console.log(err);
        if (err.status = 401) {
          this.router.navigate(['login']);
        }
      });

    // Gets all user posts from the API.
    this.api.getPostsUser()
      .subscribe(res => {
        this.postsUser = res;
      }, err => {
        console.log(err);
        if (err.status = 401) {
          this.router.navigate(['login']);
        }
      });

    // Check if user is logged in.
    if (this.userAPI.isLoggedIn()) {
      this.userAPI.getUserData()
        .subscribe(res => {
          this.username = res; // Set username as a local variable.
        }, err => {
          console.log(err);
          if (err.status = 401) {
            this.router.navigate(['login']);
          }
        });
    }

    // Set title of page.
    this.setTitle("TB: Popular Today!");

    // Wait for get methods to api to finish then run.
    setTimeout(() => {
      this.getProfileData();// Gets profile data for each poster.
    },
      200);
  }

  /**
   * Get profile data for each poster.
   *
   * @memberof PostRedditComponent
   */
  getProfileData() {
    // Loop through each postsPopular.
    for (var i = 0; i < this.postsPopular.length; i++) {
      // Get profile data for that user.
      this.userAPI.getProfile(this.postsPopular[i].subreddit)
        .subscribe(data => {
          for (var i = 0; i < this.postsPopular.length; i++) {
            if (this.postsPopular[i].subreddit == data[0].username) {
              this.postsPopular[i]['image'] = data[0].image;
            }
          }
        });
    }

    // Loop through each postsNews.
    for (var i = 0; i < this.postsNews.length; i++) {
      // Get profile data for that user.
      this.userAPI.getProfile(this.postsNews[i].subreddit)
        .subscribe(data => {
          for (var i = 0; i < this.postsNews.length; i++) {
            if (this.postsNews[i].subreddit == data[0].username) {
              this.postsNews[i]['image'] = data[0].image;
            }
          }
        });
    }

    // Loop through each postsUser.
    for (var i = 0; i < this.postsUser.length; i++) {
      // Get profile data for that user.
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