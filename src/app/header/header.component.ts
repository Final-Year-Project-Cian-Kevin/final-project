import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userSerice: UserService,private router: Router) { }

  ngOnInit() {
  }

  logout() {
    //localStorage.removeItem('jwtToken');
    this.userSerice.logout();
    this.router.navigate(['login']);
  }
}
