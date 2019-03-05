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
  allFollowing = [];
  allFollowers = [];
  message = '';
  constructor(private route: ActivatedRoute, private followService: FollowService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    //var currentUser= this.UserService.getCurrentUser();
    // Must change how id value is accesed to allow other users to view a users following data.
    var userToCheck = this.userService.getCurrentUser();
    //const userName = ;
    console.log("[DEBUG]: follow comp ",userToCheck.username);

    this.loadFollowData(userToCheck.username);


  }

  /**
   * Load all following data
   * @param id 
   */
  loadFollowData(id) {
    console.log("[DEBUG]: loadFollowData :",id,":",id.length);

    this.followService.getFollowers(id)
      .subscribe((res) => {
        console.log("[DEBUG]: Load follwer");
        console.log(res.json().doc);
        console.log(res);


        if (res.json().state) {
          let response = res.json().doc;
          let followers = [];
          let following = [];

          response.forEach(function (obj) {
            followers = followers.concat(obj.userFollowers);
            following = following.concat(obj.userFollowing);
          });

          this.allFollowing = followers;

          this.allFollowers = following;
          console.log("[DEBUG FOLLOW]");
          console.log(this.allFollowers);

        } else {
          console.log('[INFO]: Something is wrong');

          // this.toastr.info(res.json().msg, 'Something is wrong');
          this.message = res.json().msg;
        }
      })
  }
}
