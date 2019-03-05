import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { RedditApiService } from '../services/reddit-api.service';
import { CommentsService } from '../services/comments.service';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile={};
  postsUser: any;
  commentsUser: any;

  constructor(private route: ActivatedRoute, private router: Router, private userAPI: UserService, private postAPI: RedditApiService, private commentAPI: CommentsService, private titleService: Title) { }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {
    this.getProfileData(this.route.snapshot.params['id']);
  }

  getProfileData(id) {
    this.userAPI.getProfile(id)
      .subscribe(data => {
        this.profile = data[0];
        this.setTitle(data.username);
  });

  this.postAPI.getRecentPostsUser(id)
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
}