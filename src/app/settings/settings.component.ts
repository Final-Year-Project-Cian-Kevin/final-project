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
  email: string = '';
  first_name: string = '';
  surname: string = '';
  bio: string = '';
  password: string = '';

  constructor(public userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.settingsForm = this.formBuilder.group({
      'email': [null, Validators.required],
      'first_name': [null, Validators.required],
      'surname': [null, Validators.required],
      'bio': [null, Validators.required],
      'password': [null, Validators.required]
      

    });
  }

  // set initial values for form
  setForm() {
    this.settingsForm.setValue({
      email: this.userService.currentUser.email
     
    });
  }

  onFormSubmit(form:NgForm) {
    this.userService.updateUser(this.userService.currentUser.id, form)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/profile',this.userService.currentUser.username]);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
