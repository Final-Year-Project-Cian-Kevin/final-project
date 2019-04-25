import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RedditApiService } from '../../services/reddit-api.service';
import { UserService } from '../../services/user.service';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

/**
 * component for creating a post.
 *
 * @export
 * @class PostCreateComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  postForm: FormGroup;
  _id: string;
  title: string = '';
  url: string = '';
  thumbnail: string = '';
  subreddit;
  selftext: string = '';

  /**
   *Creates an instance of PostCreateComponent.
   * @param {ActivatedRoute} route
   * @param {RedditApiService} api
   * @param {Router} router
   * @param {FormBuilder} formBuilder
   * @param {UserService} userAPI
   * @param {Title} titleService
   * @memberof PostCreateComponent
   */
  constructor(private route: ActivatedRoute, private api: RedditApiService, private router: Router, private formBuilder: FormBuilder, private userAPI: UserService, private titleService: Title) { }

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
    // Get user data.
    this.userAPI.getUserData()
      .subscribe(res => {
        this.subreddit = res; // Set user data from api to local variable.
      }, err => {
        console.log(err);
        if (err.status = 401) {
          this.router.navigate(['login']);
        }
      });

    // Form settings.
    this.postForm = this.formBuilder.group({
      '_id': this._id,
      'title': [null, Validators.required],
      'url': [null, Validators.required],
      'pic': [null],
      'thumbnail': [null],
      'subreddit': this.subreddit,
      'selftext': [null, Validators.required]
    });

    // Set page title.
    this.setTitle("TB: Create Post");
  }

  /**
   * Post create form submit.
   *
   * @memberof PostCreateComponent
   */
  onFormSubmit() {

    // Create post ID.
    this._id = this.subreddit + "-" + Math.floor(Math.random() * 99999999) + 1;

    // Add post ID and username to form data.
    this.postForm.patchValue({
      _id: this._id,
      subreddit: this.subreddit
    });

    // Create post by sending data to API.
    this.api.postCreate(this.postForm.value)
      .subscribe(res => {
        let id = res['_id'];
      }, (err) => {
        console.log(err);
      });

    // Add post to user post table by sending data to API.
    this.api.postCreateUser(this.postForm.value)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/post', this._id]);
      }, (err) => {
        console.log(err);
      });
  }
}
