import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data={};


  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    
   // this.data =this.userService.getUserPayload();
   this.userService.getUser()
      .subscribe(resp => {
        this.data = resp;
        console.info("Profile component resp",this.data);
        // Save response jwtToken
        //this.userService.saveJwtToken(this.data.token);
       // this.router.navigate(['index']);
       // if (this.userService.isLoggedIn) {
       //   console.log("User is logged in");
       //   this.data = this.userService.getUserPayload();

        
      }, err => {
        console.error("Profile COMPONENT", err.error.msg);
       console.error("Profie COMPONENT unable to get user details");
     });
    
  }

}