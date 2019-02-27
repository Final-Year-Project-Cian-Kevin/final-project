import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RedditApiService } from '../../services/reddit-api.service';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  postForm: FormGroup;
  _id:string='';
  title:string='';
  url:string='';
  subreddit:string='';
  selftext:string='';

  constructor(private route: ActivatedRoute, private api: RedditApiService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      '_id' : [null],
      'title' : [null, Validators.required],
      'url' : [null, Validators.required],
      'subreddit' : [null],
      'selftext' : [null, Validators.required]
    });

    this.postForm.patchValue({
      _id: "test",
      subreddit: "Test"
    });
  }

  onFormSubmit(form:NgForm) {
    this.api.postCreate(form)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/index']);
        }, (err) => {
          console.log(err);
    });
  }

}
