import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RedditApiService } from '../services/reddit-api.service';
import { UserService } from '../services/user.service';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatListModule } from '@angular/material/list';

/**
 * Component for saved posts.
 *
 * @export
 * @class SavedpostsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-savedposts',
  templateUrl: './savedposts.component.html',
  styleUrls: ['./savedposts.component.css']
})
export class SavedpostsComponent implements OnInit {

  posts = [];
  username;
  id

  /**
   *Creates an instance of SavedpostsComponent.
   * @param {ActivatedRoute} route
   * @param {RedditApiService} api
   * @param {Router} router
   * @param {UserService} userAPI
   * @param {Title} titleService
   * @memberof SavedpostsComponent
   */
  constructor(private route: ActivatedRoute, private api: RedditApiService, private router: Router, private userAPI: UserService, private titleService: Title) { }

  /**
   * Function to change title of page.
   *
   * @param {string} newTitle - title to set.
   * @memberof SavedpostsComponent
   */
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  /**
   * Function runs when page is called.
   *
   * @memberof SavedpostsComponent
   */
  ngOnInit() {
    // Get saved posts using page ID (Username).
    this.getSavedPosts(this.route.snapshot.params['id']);

    // Get page ID.
    this.id = this.route.snapshot.params['id'];

    // Check if user is logged in.
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

    // Set page title.
    this.setTitle("TB: " + this.route.snapshot.params['id'] + "'s Saved Posts");
  }

  /**
   * Get saved posts using username.
   *
   * @param {*} id - user id.
   * @memberof SavedpostsComponent
   */
  getSavedPosts(id: any) {
    this.api.getSaved(id)
      .subscribe(data => {
        this.getIDs(data);
      });
  }

  /**
   * Get posts using the saved posts ID gotten from the saved posts API.
   *
   * @param {*} data - the saved post.
   * @memberof SavedpostsComponent
   */
  getIDs(data: any) {
    for (var i = 0; i < data.length; i++) {
      this.getPostDetails(data[i].post_id);
    }
  }

  /**
   * Get post details.
   *
   * @param {*} id - id of post.
   * @memberof SavedpostsComponent
   */
  getPostDetails(id: any) {
    this.api.getPost(id)
      .subscribe(data => {
        this.posts.push(data); // Add post to the posts object
      });
  }

  /**
   * Unsubscrive user from the post.
   *
   * @param {*} id - the  user id.
   * @memberof SavedpostsComponent
   */
  unsub(id: any) {
    // Unsub the user from the post using the post ID and username.
    this.api.delUnSub(id, this.username)
      .subscribe(res => {
        location.reload(true); // Page refresh.
      }, (err) => {
        console.log(err);
      }
      );
  }
}
