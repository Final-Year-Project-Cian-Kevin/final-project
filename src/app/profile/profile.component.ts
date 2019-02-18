import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data: any;


  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.data =this.userService.getUserPayload();
    console.log("DEBUG>>>>>",this.data);
  }

}