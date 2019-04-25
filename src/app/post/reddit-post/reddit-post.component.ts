import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RedditApiService } from '../../services/reddit-api.service';
import { UserService } from '../../services/user.service';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

/**
 * Component for reddit posts.
 *
 * @export
 * @class RedditPostComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-reddit-post',
  templateUrl: './reddit-post.component.html',
  styleUrls: ['./reddit-post.component.css']
})
export class RedditPostComponent implements OnInit {

  saveForm: FormGroup;
  post = {};
  followData = {};
  username;
  followed;

  /**
   *Creates an instance of RedditPostComponent.
   * @param {ActivatedRoute} route
   * @param {RedditApiService} api
   * @param {Router} router
   * @param {Title} titleService
   * @param {UserService} userAPI
   * @param {FormBuilder} formBuilder
   * @memberof RedditPostComponent
   */
  constructor(private route: ActivatedRoute, private api: RedditApiService, private router: Router, private titleService: Title, private userAPI: UserService, private formBuilder: FormBuilder) { }

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
    // Get post details using ID of the route.
    this.getPostDetails(this.route.snapshot.params['id']);

    // Sewt post ID in local storage to be accessed by other components.
    localStorage.setItem("postID", this.route.snapshot.params['id']);

    // Check if user is logged in.
    if (this.userAPI.isLoggedIn()) {
      this.userAPI.getUserData()
        .subscribe(res => {
          this.username = res;
          this.getIsSaved(this.route.snapshot.params['id'], res);
        }, err => {
          console.log(err);
          if (err.status = 401) {
            this.router.navigate(['login']);
          }
        });
    }

    // Form settings.
    this.saveForm = this.formBuilder.group({
      'profile_id': [null],
      'post_id': [null]
    });
  }

  /**
   * Get post details from the API.
   *
   * @param {*} id - id of posts.
   * @memberof RedditPostComponent
   */
  getPostDetails(id: any) {
    this.api.getPost(id)
      .subscribe(data => {
        this.post = data;
        this.setTitle("TB: " + data.title); // Set page title as the post title .
      });
  }

  /**
   * Check if user is subscribed to post
   *
   * @param {*} id - post id.
   * @param {*} username - users name.
   * @memberof RedditPostComponent
   */
  getIsSaved(id: any, username: any) {
    this.api.getIsSaved(id, username)
      .subscribe(data => {
        this.followData = data;
        if (data.length > 0) {
          this.followed = true; // set followed to true.
        } else {
          this.followed = false; // set followed to false.
        }
      });
  }

  /**
   * Subscribe to post.
   *
   * @memberof RedditPostComponent
   */
  sub() {
    // Add profile ID and post ID to form.
    this.saveForm.patchValue({
      profile_id: this.username,
      post_id: this.route.snapshot.params['id']
    });

    // Send form to the API to save a user to the post.
    this.api.postSave(this.saveForm.value)
      .subscribe(res => {
        let id = res['_id'];
        location.reload(true); // Page refresh.
      }, (err) => {
        console.log(err);
      });
  }

  /**
   * Unsubscribe from post.
   *
   * @memberof RedditPostComponent
   */
  unsub() {
    // Send API post ID and username to remove from database with API.
    this.api.delUnSub(this.route.snapshot.params['id'], this.username)
      .subscribe(res => {
        location.reload(true); // Page refresh.
      }, (err) => {
        console.log(err);
      }
      );
  }
}
