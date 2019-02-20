import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { BrowserModule, Title }  from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile={};


  constructor(private route: ActivatedRoute, private router: Router, private userAPI: UserService, private titleService: Title) { }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {
    this.getProfileData(this.route.snapshot.params['id']);
  }

  getProfileData(id) {
    this.userAPI.getProfile(id)
      .subscribe(data => {
        this.profile = data[0];
        this.setTitle(data.username);
      });

      
  }

}