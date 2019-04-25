import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { FollowService } from './../services/follow.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

/**
 * Componet for follow page.
 *
 * @export
 * @class FollowComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})

export class FollowComponent implements OnInit {
  allFollowing = [];  // Users that currentuser is following.
  allFollowers = [];  // Users that are following currentuser.
  message = '';

  // The username of the User we want to generate follow component for.
  username;

  // Selected value of toggle-button.
  public selectedVal: boolean;

  /**
   *Creates an instance of FollowComponent.
   * @param {ActivatedRoute} route
   * @param {Title} titleService
   * @param {FollowService} followService
   * @param {Router} router
   * @param {UserService} userService
   * @memberof FollowComponent
   */
  constructor(private route: ActivatedRoute, private titleService: Title, private followService: FollowService, private router: Router, private userService: UserService) { }

  /**
   * Sets title.
   *
   * @param {string} newTitle - the new title.
   * @memberof FollowComponent
   */
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  /**
   * Runs on page call.
   *
   * @memberof FollowComponent
   */
  ngOnInit() {
    // Set the username to the valuue passed by route.
    this.username = this.route.snapshot.params['id'];

    // Load the follwing data using the username.
    this.loadFollowData(this.username);

    // Set the initial value of the toggle button.
    this.selectedVal = true;

    this.setTitle("TB: " + this.username + "'s Circle");
  }

  /**
   * Change selected value when button is toggled.
   *
   * @memberof FollowComponent
   */
  public onValChange() {
    this.selectedVal = !this.selectedVal;
  }

  /**
   * Load all following data.
   *
   * @param {*} username - username to load.
   * @memberof FollowComponent
   */
  loadFollowData(username: any) {

    this.followService.getFollowers(username)
      .subscribe((res) => {
        // If server returned 'true' state.
        if (res.state) {
          let response = res.doc;
          let followers = [];
          let following = [];

          // For each object in response add to array.
          response.forEach(function (obj) {
            followers = followers.concat(obj.userFollowers);
            following = following.concat(obj.userFollowing);
          });

          // Add data to local variables for view.
          this.allFollowers = followers;
          this.allFollowing = following;
          // If server returns false statement
        } else {
          this.message = res.json().msg;
        }
      })
  }
}
