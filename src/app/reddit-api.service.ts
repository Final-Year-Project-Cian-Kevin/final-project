import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { Observable} from 'rxjs';
import { Post } from './post';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RedditApiService {

  constructor(private jsonp: Jsonp) { }

  fetchPosts(subreddit:string):Observable<Post[]>{
    return this.jsonp.get("https://www.reddit.com" +
    subreddit +
    "/.json?jsonp=JSONP_CALLBACK").pipe(map(data => {
        var posts:Post[] = [];
        let children = data.json().data.children;
        for(var i=0; i<children.length; i++) {
                let post:Post = new Post();
                post.title = children[i].data.title;
                post.url = children[i].data.url;
                posts.push(post);
        }
        return posts;
    }));
  }
}
