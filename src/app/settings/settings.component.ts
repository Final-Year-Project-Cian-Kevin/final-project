import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

// Import plugin for file upload
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3000/api/assets/';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  profileinfo: any;
  settingsForm: FormGroup;
  currentUser: any; // user object of current logged in user
  currentUserName: String; // username of current logged in user
  //email: string = '';
  first_name: string = '';
  surname: string = '';
  bio: string = '';
  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  errorMessage = '';

  //declare a property called fileuploader and assign it to an instance of a new fileUploader.
  //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
  public uploader: FileUploader = new FileUploader({ 
    url: URL, 
    itemAlias: 'photo',
    allowedFileType: ['image']
   });

  constructor(public userService: UserService, private router: Router, private formBuilder: FormBuilder, private titleService: Title) { }

  // Function used to set page title
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  // Runs on page call
  ngOnInit() {
    this.currentUser = this.userService.getUserPayLoad();

    this.currentUserName = this.currentUser.username;

    // this.setForm(this.userService.currentUser.username);
    this.setForm(this.currentUserName);
    this.settingsForm = this.formBuilder.group({
      'email': [null, Validators.email],
      'first_name': [null, Validators.required],
      'surname': [null, Validators.required],
      'bio': [null, Validators.required]
    });

    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
     
      // update the user profile with the new image url
      this.userService.updateUser(this.profileinfo._id, response)
        .subscribe(res => {
          this.router.navigate(['/profile', this.profileinfo.username]);
        }, (err) => {
          console.log(err);
        }
        );
    };

    // Set page title
    this.setTitle("TB: Profile Settings");
  }

  //Set the form data in SettingsForm to the details of the current user.
  setForm(id) {
    this.userService.getProfile(id)
      .subscribe(profile => {
        // must extract profile data from response
        this.profileinfo = profile[0];
        // Form object
        this.settingsForm.setValue({
          email: this.profileinfo.email,
          first_name: this.profileinfo.first_name,
          surname: this.profileinfo.surname,
          bio: this.profileinfo.bio
        });
      });
  }

  // Sends a request to userService to update user details.
  onFormSubmit(form: NgForm) {
    this.userService.updateUser(this.profileinfo._id, form)
      .subscribe(res => {
        // Route user to profile page.
        this.router.navigate(['/profile', this.profileinfo.username]);
      }, (err) => {
        this.errorMessage = err.error.msg;
        console.error("[ERROR] submitting update :", this.errorMessage);
      }
      );
  }
}// End of SettingsComponent
