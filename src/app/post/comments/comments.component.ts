import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from '../../services/comments.service';
import { Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: any;
  displayedColumns = ['profile', 'comment', 'date'];
  dataSource = new CommentDataSource(this.api);

  constructor(private route: ActivatedRoute, private api: CommentsService, private router: Router) { }

  ngOnInit() {
    this.getCommentDetails(localStorage.getItem("postID"));

    this.api.getCommentPostId(localStorage.getItem("postID"))
      .subscribe(res => {
        this.comments = res;
      }, err => {
        console.log(err);
        if(err.status=401){
          this.router.navigate(['login']);
        }
      });
  }

  getCommentDetails(id) {
    this.api.getCommentPostId(id)
      .subscribe(data => {
        this.comments = data;
      });
  }
}

export class CommentDataSource extends DataSource<any> {
  constructor(private api: CommentsService) {
    super()
  }

  connect() {
    console.log(this.api);
    return this.api.getCommentPostId(localStorage.getItem("postID"));
  }

  disconnect() {

  }
}
