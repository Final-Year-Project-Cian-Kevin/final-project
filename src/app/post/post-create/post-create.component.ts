import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RedditApiService } from '../../services/reddit-api.service';
import { UserService } from '../../services/user.service';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  postForm: FormGroup;
  _id:string;
  title:string='';
  url:string='';
  thumbnail:string='';
  subreddit;
  selftext:string='';

  constructor(private route: ActivatedRoute, private api: RedditApiService, private router: Router, private formBuilder: FormBuilder, private userAPI: UserService) { }

  ngOnInit() {
    this.userAPI.getUserData()
    .subscribe(res => {
      this.subreddit = res;
    }, err => {
      console.log(err);
      if(err.status=401){
        this.router.navigate(['login']);
      }
    });

    this.postForm = this.formBuilder.group({
      '_id' : this._id,
      'title' : [null, Validators.required],
      'url' : [null, Validators.required],
      'pic' : [null],
      'thumbnail' : [null],
      'subreddit' : this.subreddit,
      'selftext' : [null, Validators.required]
    });
  }

  onFormSubmit() {

    this._id = this.subreddit + "-" +Math.floor(Math.random() * 99999999) + 1;

    this.postForm.patchValue({
      _id: this._id,
      subreddit: this.subreddit
    });

    console.log(this.postForm.value);

    this.api.postCreate(this.postForm.value)
      .subscribe(res => {
          let id = res['_id'];
        }, (err) => {
          console.log(err);
    });

    this.api.postCreateUser(this.postForm.value)
    .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/index']);
      }, (err) => {
        console.log(err);
  });
  }
}
