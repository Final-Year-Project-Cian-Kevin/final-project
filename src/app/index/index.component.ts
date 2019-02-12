import { Component, OnInit } from '@angular/core';
import { RedditApiService } from '../services/reddit-api.service';
import { DataSource } from '@angular/cdk/collections';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {

  posts: any;
  displayedColumns = ['picture', 'title', 'author'];
  dataSource = new RedditDataSource(this.api);

  constructor(private api: RedditApiService,private router: Router) { 
    console.log('DEBUG : IndexComponent: IN constructor'); 
  }

  ngOnInit() {
    this.api.getPostsPH()
      .subscribe(res => {
        console.log(res);
        console.log(this.api);
        this.posts = res;
      }, err => {
        console.log(err);
        if(err.status=401){
          this.router.navigate(['login']);
        }
      });
  }
}

export class RedditDataSource extends DataSource<any> {
  constructor(private api: RedditApiService) {
    super()
  }

  connect() {
    console.log(this.api);
    return this.api.getPostsPH();
  }

  disconnect() {

  }
}
