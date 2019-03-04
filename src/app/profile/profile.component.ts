import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { Profile } from 'selenium-webdriver/firefox';

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

  /**
   * 
   * @param id the users id
   */
  follow(){
    var user = this.userAPI.getCurrentUser();
    console.log("[DEBUG]: follow");
    console.log(user);
    const user_id = user.id;
    const follow_id  =this.route.snapshot.params['id'];

    var followUser={
      user_id:user_id,
      follow_id:follow_id
    };
    this.userAPI.followUser(followUser)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/profile', this.userAPI.currentUser.username]);
      }, (err) => {
        console.log(err);
      }
      );

  }

}