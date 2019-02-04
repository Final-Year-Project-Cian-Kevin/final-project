import { Component, OnInit } from '@angular/core';
import { RedditApiService } from '../reddit-api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {

  posts: any;

  constructor(private api1: RedditApiService,private router: Router) { 
    console.log('DEBUG : BookComponent: IN constructor'); 

  }

  ngOnInit() {
    this.api1.getPostsPH()
      .subscribe(res => {
        console.log(res);
        this.posts = res;
      }, err => {
        console.log(err);
        if(err.status=401){
          this.router.navigate(['login']);
        }
      });
  }
}
