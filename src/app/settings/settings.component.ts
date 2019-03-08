import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';
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
  settingsForm: FormGroup;
  //email: string = '';
  first_name: string = '';
  surname: string = '';
  bio: string = '';
  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  //declare a property called fileuploader and assign it to an instance of a new fileUploader.
  //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });

  constructor(public userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setForm(this.userService.currentUser.username);
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
      console.log("ImageUpload:uploaded:", item, status, response);

      // update the user profile with the new image url
      this.userService.updateUser(this.userService.currentUser.id, response)
        .subscribe(res => {
          this.router.navigate(['/profile', this.userService.currentUser.username]);
        }, (err) => {
          console.log(err);
        }
        );
      //console.log(response);

    };

  }

  // set initial values for form
  setForm(id) {
    console.log("+++++++++++++++++ SetForm Settings");


    this.userService.getProfile(id)
      .subscribe(data => {
        console.log("User in settings");
        console.log(data);
        this.settingsForm.setValue({
          email: data.email,
          first_name: data.first_name,
          surname: data.surname,
          bio: data.bio

        });
        console.log("User in settings");
        console.log(data);
      });

    console.log("User out set settings");





  }

  onFormSubmit(form: NgForm) {
    this.userService.updateUser(this.userService.currentUser.id, form)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/profile', this.userService.currentUser.username]);
      }, (err) => {
        console.log(err);
      }
      );
  }



}
