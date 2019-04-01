import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from '../../services/comments.service';
import { UserService } from '../../services/user.service';
import { Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: any;
  displayedColumns = ['profile', 'comment', 'date'];
  dataSource = new CommentDataSource(this.commentAPI);

  commentForm: FormGroup;
  comment: string = '';
  postID;
  username;

  constructor(private route: ActivatedRoute, private commentAPI: CommentsService, private router: Router, private formBuilder: FormBuilder, private userAPI: UserService) { }

  // Runs on page call
  ngOnInit() {
    // Get comments using post ID
    this.getCommentDetails(localStorage.getItem("postID"));

    // Set post ID to local variable
    this.postID = localStorage.getItem("postID");

    // Check if a user is logged in
    if (this.userAPI.isLoggedIn()) {
      this.userAPI.getUserData()
        .subscribe(res => {
          this.username = res; // Set the logged in users name to a local variable
        }, err => {
          console.log(err);
          if (err.status = 401) {
            this.router.navigate(['login']);
          }
        });
    }

    // Gets comments
    this.commentAPI.getCommentPostId(localStorage.getItem("postID"))
      .subscribe(res => {
        this.comments = res; // Sets comments object to local variable
      }, err => {
        console.log(err);
        if (err.status = 401) {
          this.router.navigate(['login']);
        }
      });

    // Comment form
    this.commentForm = this.formBuilder.group({
      'post_id': [null],
      'profile_id': [null],
      'comment': [null, Validators.required]
    });
  }

  // Gets comments
  getCommentDetails(id) {
    this.commentAPI.getCommentPostId(id)
      .subscribe(data => {
        this.comments = data;
      });
  }

  // Comment submission function
  onFormSubmit(form) {
    // Set post ID in form object
    form.post_id = this.postID;
    // Set profile username in form object
    form.profile_id = this.username;
    this.commentAPI.postComment(form)
      .subscribe(res => {
        let id = res['_id'];
        location.reload(true); // Page refresh
      }, (err) => {
        console.log(err);
      });
  }
}

// Datasource for getting comments
export class CommentDataSource extends DataSource<any> {
  constructor(private api: CommentsService) {
    super()
  }

  connect() {
    return this.api.getCommentPostId(localStorage.getItem("postID"));
  }

  disconnect() {

  }
}