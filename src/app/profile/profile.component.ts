import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { RedditApiService } from '../services/reddit-api.service';
import { CommentsService } from '../services/comments.service';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { Profile } from 'selenium-webdriver/firefox';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile={};
  postsUser: any;
  commentsUser: any;
  follow_id;

  constructor(private route: ActivatedRoute, private router: Router, private userAPI: UserService, private postAPI: RedditApiService, private commentAPI: CommentsService, private titleService: Title) { }

  public setTitle( newTitle: string) { 
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {
    this.getProfileData(this.route.snapshot.params['id']);

    this.postAPI.getRecentPostsUser(this.route.snapshot.params['id'])
      .subscribe(res => {
        this.postsUser = res;
      }, err => {
        console.log(err);
        if(err.status=401){
          this.router.navigate(['login']);
        }
    });

    this.commentAPI.getCommentProfileId(this.route.snapshot.params['id'])
      .subscribe(res => {
        this.commentsUser = res;
      }, err => {
        console.log(err);
        if(err.status=401){
          this.router.navigate(['login']);
        }
    });
  }

  getProfileData(id) {
    this.userAPI.getProfile(id)
      .subscribe(data => {
        this.profile =data;
        this.setTitle(data.username);
    });
  }

  /**
   * 
   * @param _id the users id
   */
  follow(_id){
    console.log("[DEBUG]: follow profile ");
    console.log(this.profile);
    console.log(_id);
    var user = this.userAPI.getCurrentUser();
    console.log("[DEBUG]: follow getCurrentUser ");
    console.log(user);
    console.log("[DEBUG]: follow getUserPayLoad ");

    console.log(this.userAPI.getUserPayLoad());
    const user_id = user.id;
    //const follow_id  =this.route.snapshot.params['id'];
   // const to_follow_id  =this.profile._id;

    var followUser={
      user_id:user_id,
      follow_id: _id
    };
    this.userAPI.followUser(followUser)
      .subscribe(res => {
        //let id = res['_id'];
       // this.router.navigate(['/profile', this.userAPI.currentUser.username]);
       console.log("[INFO]: User followed");
       alert("User followed");

      }, (err) => {
        console.log(err);
      }
      );

  }
/**
   * 
   * @param _id the users id
   */
  unFollow(_id){
    var user = this.userAPI.getCurrentUser();
    const user_id = user.id;

    var followUser={
      user_id:user_id,
      follow_id: _id
    };
    this.userAPI.unFollowUser(followUser)
      .subscribe(res => {
        //let id = res['_id'];
       // this.router.navigate(['/profile', this.userAPI.currentUser.username]);
       console.log("[INFO]: User unfollowed");
       alert("User unfollowed");
      }, (err) => {
        console.log(err);
      }
      );

  }
}