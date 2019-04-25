import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, } from '../services/user.service';
import { FollowService, } from '../services/follow.service';

import { RedditApiService } from '../services/reddit-api.service';
import { CommentsService } from '../services/comments.service';
import { BrowserModule, Title } from '@angular/platform-browser';
import { Profile } from 'selenium-webdriver/firefox';
import { Alert } from 'selenium-webdriver';

/**
 * Component for Profile.
 *
 * @export
 * @class ProfileComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any; // The current profile to be loaded to view.
  currentUser: any; // The current logged in user.
  isFollowing: boolean = false; // Boolean to hold
  postsUser: any;
  commentsUser: any;
  follow_id: any;

  // IsUser determines if the user is on their own account.
  isUser: boolean;

  /**
   *Creates an instance of ProfileComponent.
   * @param {ActivatedRoute} route
   * @param {FollowService} followService
   * @param {Router} router
   * @param {UserService} userAPI
   * @param {RedditApiService} postAPI
   * @param {CommentsService} commentAPI
   * @param {Title} titleService
   * @memberof ProfileComponent
   */
  constructor(private route: ActivatedRoute, private followService: FollowService, private router: Router, private userAPI: UserService, private postAPI: RedditApiService, private commentAPI: CommentsService, private titleService: Title) { }

  /**
   * Set page title.
   *
   * @param {string} newTitle - the title.
   * @memberof ProfileComponent
   */
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  /**
   * Runs on page call.
   *
   * @memberof ProfileComponent
   */
  ngOnInit() {
    // Get profile data using page ID.
    this.getProfileData(this.route.snapshot.params['id']);

    // Set title using page ID.
    this.setTitle("TB: " + this.route.snapshot.params['id'] + "'s Profile");

    // Get profile data using page ID.
    this.postAPI.getRecentPostsUser(this.route.snapshot.params['id'])
      .subscribe(res => {
        this.postsUser = res;
      }, err => {
        console.log(err);
        if (err.status = 401) {
          this.router.navigate(['login']);
        }
      });

    // Get comments the user made using page ID.
    this.commentAPI.getCommentProfileId(this.route.snapshot.params['id'])
      .subscribe(res => {
        this.commentsUser = res;
      }, err => {
        console.log(err);
        if (err.status = 401) {
          this.router.navigate(['login']);
        }
      });

    // Check if user is loggged in.
    if (this.userAPI.isLoggedIn()) {
      // Get current user.
      this.currentUser = this.userAPI.getUserPayLoad();
      // Get following data
      this.getFollowList();
    }
  }

  /**
   * Loads the profile data for the current user we want to display the profile of.
   *
   * @param {*} id - users id.
   * @memberof ProfileComponent
   */
  getProfileData(id: any) {
    this.userAPI.getProfile(id)
      .subscribe(data => {
        this.profile = data[0];
        // Check if this is the logged in users profile.
        this.isUser = (this.currentUser.id === this.profile._id);
      });
  }

  /**
   * Get the list of following.
   *
   * @memberof ProfileComponent
   */
  getFollowList() {
    this.followService.getIsFollowing(this.currentUser.username)
      .subscribe((res) => {
        // If server returned 'true' state.
        if (res.state) {
          let userIsFollowing = [];
          for (let username of res.followlist) {
            userIsFollowing.push(username);

            if (username == this.profile.username) {
              this.isFollowing = true;
            }
          }
        } else {
          console.log('[INFO]: Something is wrong');
        }
      })
  }

  /**
   * Allows a user to be followed. 
   * Adds the user in the follows db table to the logged in users 'following' array.
   * Also adds the user to the following users 'followers' array.
   *
   * @param {*} _id - id of user to follow.
   * @memberof ProfileComponent
   */
  follow(_id: any) {
    var user = this.userAPI.getUserPayLoad();
    const user_id = user.id;

    // FollowUser is an object to be sent to the server containing a user_id and follow_id field.
    var followUser = {
      user_id: user_id,
      follow_id: _id
    };

    // Follow this user.
    this.followService.followUser(followUser)
      .subscribe(res => {
        // Set isFollowing to true;
        this.isFollowing = true;
      }, (err) => {
        console.log(err);
      }
      );
  }

  /**
   * Allows a user to be unfollowed. 
   * Removes the user in the follows db table from the logged in users 'following' array.
   * Also removes the user from the following users 'followers' array. 
   *
   * @param {*} _id
   * @memberof ProfileComponent
   */
  unFollow(_id: any) {
    var user = this.userAPI.getUserPayLoad();
    const user_id = user.id;

    // Folow user object.
    var followUser = {
      user_id: user_id,
      follow_id: _id
    };
    // Send API data to unfollow a user.
    this.followService.unFollowUser(followUser)
      .subscribe(res => {
        // Set isFollowing to false;
        this.isFollowing = false;
      }, (err) => {
        console.log(err);
      }
      );
  }
}