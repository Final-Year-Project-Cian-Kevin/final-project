import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
//import { setServers } from 'dns';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  // Form group variables.
  minimumPwLength = 8;
  passwordFormGroup: FormGroup;

  // Server Response messages.
  message = '';
  serverErrorMessage = '';
  serverErrorType = '';
  constructor(private router: Router, private api: UserService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.passwordFormGroup = this.formBuilder.group({
      username: [null, [Validators.required]],
      first_name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      email: [null, [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.minimumPwLength)]],
      password2: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  /**
   * Adapted from https://stackoverflow.com/questions/50728460/password-confirm-angular-material
   *  
   */
  /* Shorthands for form controls (used from within template) */
  get password() { return this.passwordFormGroup.get('password'); }
  get password2() { return this.passwordFormGroup.get('password2'); }

  /**
   *  Called on each input in either password field.
   */
  onPasswordInput() {
    // Check if passwords are the same.
    if (this.passwordFormGroup.hasError('passwordMismatch'))
      this.password2.setErrors([{ 'passwordMismatch': true }]);
    else
      this.password2.setErrors(null);
  }

  /**
   * Validate passwords inputed to ensure values are equal.
   */
  passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    if (formGroup.get('password').value === formGroup.get('password2').value)
      return null;
    else
      return {
        passwordMismatch: true
      };
  };

  /**
   * Subscribes to userService to register a user.
   * 
   * @param form form data to register.
   */
  onFormSubmit(form: NgForm) {
    // Reset the error message.
    this.serverErrorMessage = '';
    this.api.postUser(this.passwordFormGroup.value)
      .subscribe(resp => {
        alert("Account created welcome to TechBook !")
        this.router.navigate(['login']);
      }, err => {
        this.serverErrorMessage = err.error.msg;
        console.error(this.serverErrorMessage);

        // Check error type returned from server and assign to serverErrorType.
        // This section is not in use but may be used to move error to specific input.
        if (this.serverErrorMessage.includes('email')) { this.serverErrorType = 'email'; }
        else if (this.serverErrorMessage.includes('username')) { this.serverErrorType = 'username'; }
        else { this.serverErrorType = 'generic'; }
      });
  };

}