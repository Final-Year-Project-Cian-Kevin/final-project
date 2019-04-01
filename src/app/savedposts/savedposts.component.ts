import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RedditApiService } from '../services/reddit-api.service';
import { UserService } from '../services/user.service';
import { BrowserModule, Title } from '@angular/platform-browser';
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

  constructor(private route: ActivatedRoute, private api: RedditApiService, private router: Router, private userAPI: UserService, private titleService: Title) { }

  // Function to change title of page
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  // Function runs when page is called
  ngOnInit() {
    // Get saved posts using page ID (Username)
    this.getSavedPosts(this.route.snapshot.params['id']);

    // Get page ID
    this.id = this.route.snapshot.params['id'];

    // Check if user is logged in
    if (this.userAPI.isLoggedIn()) {
      this.userAPI.getUserData()
        .subscribe(res => {
          this.username = res;
        }, err => {
          console.log(err);
          if (err.status = 401) {
            this.router.navigate(['login']);
          }
        });
    }

    // Set page title
    this.setTitle("TB: " + this.route.snapshot.params['id'] + "'s Saved Posts");
  }

  // Get saved posts using username
  getSavedPosts(id) {
    this.api.getSaved(id)
      .subscribe(data => {
        this.getIDs(data);
      });
  }

  // Get posts using the saved posts ID gotten from the saved posts API
  getIDs(data) {
    for (var i = 0; i < data.length; i++) {
      this.getPostDetails(data[i].post_id);
    }
  }

  // Gets posts details
  getPostDetails(id) {
    this.api.getPost(id)
      .subscribe(data => {
        this.posts.push(data); // Add post to the posts object
      });
  }

  // Unsub user from the post
  unsub(id) {
    // Unsub the user from the post using the post ID and username
    this.api.delUnSub(id, this.username)
      .subscribe(res => {
        location.reload(true); // Page refresh
      }, (err) => {
        console.log(err);
      }
      );
  }
}
