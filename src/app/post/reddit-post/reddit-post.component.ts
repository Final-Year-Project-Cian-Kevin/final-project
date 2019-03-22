import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RedditApiService } from '../../services/reddit-api.service';
import { UserService } from '../../services/user.service';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-reddit-post',
  templateUrl: './reddit-post.component.html',
  styleUrls: ['./reddit-post.component.css']
})
export class RedditPostComponent implements OnInit {

  saveForm: FormGroup;
  post = {};
  followData = {};
  username;
  followed;

  constructor(private route: ActivatedRoute, private api: RedditApiService, private router: Router, private titleService: Title, private userAPI: UserService, private formBuilder: FormBuilder) { }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {
    this.getPostDetails(this.route.snapshot.params['id']);
    localStorage.setItem("postID", this.route.snapshot.params['id']);

    if(this.userAPI.isLoggedIn()){
      this.userAPI.getUserData()
      .subscribe(res => {
        this.username = res;
        this.getIsSaved(this.route.snapshot.params['id'], res);
      }, err => {
        console.log(err);
        if(err.status=401){
          this.router.navigate(['login']);
        }
      });
    }

    this.saveForm = this.formBuilder.group({
      'profile_id' : [null],
      'post_id' : [null]
    });
  }

  getPostDetails(id) {
    this.api.getPost(id)
      .subscribe(data => {
        this.post = data;
        this.setTitle("TB: " + data.title);
      });
  }

  getIsSaved(id, username) {
    this.api.getIsSaved(id, username)
      .subscribe(data => {
        this.followData = data;
        if(data.length > 0){
          this.followed = true;
        } else{
          this.followed = false;
        }
      });
  }

  sub() {
    this.saveForm.patchValue({
      profile_id: this.username,
      post_id: this.route.snapshot.params['id']
    });

    this.api.postSave(this.saveForm.value)
    .subscribe(res => {
        let id = res['_id'];
        location.reload(true); // Page refresh
      }, (err) => {
        console.log(err);
    });
  }

  unsub() {
    this.api.delUnSub(this.route.snapshot.params['id'], this.username)
      .subscribe(res => {
          location.reload(true); // Page refresh
        }, (err) => {
          console.log(err);
        }
      );
  }

}
