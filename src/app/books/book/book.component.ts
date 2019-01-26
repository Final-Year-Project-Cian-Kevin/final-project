import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: any;
  displayedColumns = ['isbn', 'title', 'author'];
  dataSource = new BookDataSource(this.api);

  constructor(private api: ApiService,private router: Router) { }

   ngOnInit() {
     this.api.getBooks()
       .subscribe(res => {
         console.log(res);
         this.books = res;
       }, err => {
         console.log(err);
         if(err.status=401){
           this.router.navigate(['login']);
         }
       });
   }
  /* 
  ngOnInit() {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    this.http.get('/api/book', httpOptions).subscribe(data => {
      this.books = data;
      console.log(this.books);
    }, err => {
      if(err.status === 401) {
        this.router.navigate(['login']);
      }
    });
  }
*/
}

export class BookDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    console.log('connect book component');

    return this.api.getBooks();
  }

  disconnect() {

  }
}
