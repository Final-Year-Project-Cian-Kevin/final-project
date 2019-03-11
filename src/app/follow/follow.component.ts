import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { FollowService } from './../services/follow.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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

  constructor(private route: ActivatedRoute, private followService: FollowService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    // Set the username to the valuue passed by route.
    this.username = this.route.snapshot.params['id'];
    console.log("[DEBUG] followcomponent username:", this.username);

    // Load the follwing data using the username.
    this.loadFollowData(this.username);

    // Set the initial value of the toggle button
    this.selectedVal = true;
  }

  /**
   * Change selected value when button is toggled.
   * @param val 
   */
  public onValChange() {
    this.selectedVal = !this.selectedVal;
  }

  /**
   * Load all following data.
   * @param id 
   */
  loadFollowData(username) {
    //console.log("[DEBUG]: loadFollowData :", username, ":", username.length);

    this.followService.getFollowers(username)
      .subscribe((res) => {
        // If server returned 'true' state.
        if (res.state) {
          let response = res.doc;
          let followers = [];
          let following = [];

          // for each object in response add to array.
          response.forEach(function (obj) {
            followers = followers.concat(obj.userFollowers);
            following = following.concat(obj.userFollowing);
          });

          // Add data to local variables for view.
          this.allFollowers = followers;
          this.allFollowing = following;
          //   console.log("[DEBUG FOLLOWers]");
          //   console.log(this.allFollowers);
          //   console.log("[DEBUG FOLLOWeing]");
          //   console.log(this.allFollowing);
        } else {
          //   console.log('[INFO]: Something is wrong');
          this.message = res.json().msg;
        }
      })
  }
}
