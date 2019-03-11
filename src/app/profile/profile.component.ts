import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, } from '../services/user.service';
import { FollowService, } from '../services/follow.service';

import { RedditApiService } from '../services/reddit-api.service';
import { CommentsService } from '../services/comments.service';
import { BrowserModule, Title } from '@angular/platform-browser';
import { Profile } from 'selenium-webdriver/firefox';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;
  currentUser: any;
  postsUser: any;
  commentsUser: any;
  follow_id;

  // isUser determines if the user is on their own account.
  isUser: boolean;

  constructor(private route: ActivatedRoute,private followService: FollowService, private router: Router, private userAPI: UserService, private postAPI: RedditApiService, private commentAPI: CommentsService, private titleService: Title) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit() {
    this.getProfileData(this.route.snapshot.params['id']);
    // Get current user.
    this.currentUser = this.userAPI.getUserPayLoad();

    this.postAPI.getRecentPostsUser(this.route.snapshot.params['id'])
      .subscribe(res => {
        this.postsUser = res;
      }, err => {
        console.log(err);
        if (err.status = 401) {
          this.router.navigate(['login']);
        }
      });

    this.commentAPI.getCommentProfileId(this.route.snapshot.params['id'])
      .subscribe(res => {
        this.commentsUser = res;
      }, err => {
        console.log(err);
        if (err.status = 401) {
          this.router.navigate(['login']);
        }
      });
  }

  /**
   * Loads the profile data for the current user we want to display the profile of.
   * 
   * @param id The ObjectId of the user we want to load data for.
   */
  getProfileData(id) {
    this.userAPI.getProfile(id)
      .subscribe(data => {
        this.profile = data[0];
        this.setTitle(data.username);

        // Check if users account.
        this.isUser = (this.currentUser.id === this.profile._id);
      });
  }

  /**
   * Allows a user to be followed. Adds the user in the follows db table to the logged in users 'following' array.
   * Also adds the user to the following users 'followers' array. 
   * 
   * @param _id the users id that we want to follow.
   */
  follow(_id) {
    var user = this.userAPI.getUserPayLoad();
    const user_id = user.id;

    // followUser is an object to be sent to the server containing a user_id and follow_id field.
    var followUser = {
      user_id: user_id,
      follow_id: _id
    };

    this.followService.followUser(followUser)
      .subscribe(res => {
        // Alert the user of the success.
        alert("User followed");
      }, (err) => {
        // Alert the user of the unsuccess
        alert("User not followed, an error occured");
        console.log(err);
      }
      );

  }

  /**
    * Allows a user to be unfollowed. Removes the user in the follows db table from the logged in users 'following' array.
    * Also removes the user from the following users 'followers' array. 
    * 
    * @param _id the users id that we want to unfollow.
    */
  unFollow(_id) {
    var user = this.userAPI.getUserPayLoad();
    const user_id = user.id;

    var followUser = {
      user_id: user_id,
      follow_id: _id
    };
    this.followService.unFollowUser(followUser)
      .subscribe(res => {
        // Alert the user of the success.
        alert("User unfollowed");
      }, (err) => {
        // Alert the user of the unsuccess
        alert("User not followed, an error occured");
        console.log(err);      }
      );

  }
}