import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RedditApiService } from '../services/reddit-api.service';

@Component({
  selector: 'app-reddit-post',
  templateUrl: './reddit-post.component.html',
  styleUrls: ['./reddit-post.component.css']
})
export class RedditPostComponent implements OnInit {

  post = {};

  constructor(private route: ActivatedRoute, private api: RedditApiService, private router: Router) { }

  ngOnInit() {
    this.getPostDetails(this.route.snapshot.params['id']);
  }

  getPostDetails(id) {
    this.api.getPost(id)
      .subscribe(data => {
        console.log(data);
        this.post = data;
      });
  }

}
