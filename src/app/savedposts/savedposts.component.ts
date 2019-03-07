import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RedditApiService } from '../services/reddit-api.service';
import { UserService } from '../services/user.service';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-savedposts',
  templateUrl: './savedposts.component.html',
  styleUrls: ['./savedposts.component.css']
})
export class SavedpostsComponent implements OnInit {

  posts = [];
  username;
  id

  constructor(private route: ActivatedRoute, private api: RedditApiService, private router: Router, private userAPI: UserService) { }

  ngOnInit() {
    this.getSavedPosts(this.route.snapshot.params['id']);

    this.id = this.route.snapshot.params['id'];

    if(this.userAPI.isLoggedIn()){
      this.userAPI.getUserData()
      .subscribe(res => {
        this.username = res;
      }, err => {
        console.log(err);
        if(err.status=401){
          this.router.navigate(['login']);
        }
      });
    }
  }

  getSavedPosts(id) {
    this.api.getSaved(id)
      .subscribe(data => {
        this.getIDs(data);
      });
  }

  getIDs(data) {
    for (var i = 0; i < data.length; i++) {
        this.getPostDetails(data[i].post_id);
    }
  }

  getPostDetails(id) {
    this.api.getPost(id)
      .subscribe(data => {
        this.posts.push(data);
      });
  }

  unsub(id) {
    this.api.delUnSub(id, this.username)
      .subscribe(res => {
          location.reload(true); // Page refresh
        }, (err) => {
          console.log(err);
        }
      );
  }

}
