import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

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

  constructor(public userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setForm(this.userService.currentUser.username);
    this.settingsForm = this.formBuilder.group({
      'email': [Validators.email, Validators.required],
      'first_name': [null, Validators.required],
      'surname': [null, Validators.required],
      'bio': [null, Validators.required]



    });
  }

  // set initial values for form
  setForm(id) {
    console.log("+++++++++++++++++ SetForm Settings");


    this.userService.getProfile(id)
      .subscribe(data => {
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
