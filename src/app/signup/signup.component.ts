import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../services/user.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signupData = { username: '',email: '',first_name:'',surname:'', password: '' };
  message = '';

  // Form group variables.
  minimumPwLength = 8;
  passwordFormGroup: FormGroup;

  constructor(private router: Router, private api: UserService, private formBuilder: FormBuilder) {
    console.log('DEBUG : SignupComponent: IN constructor');
  }

  ngOnInit() {
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(this.minimumPwLength)]],
      password2: ['', [Validators.required]]
    }, {validator: this.passwordMatchValidator});
  }

  /**
   * Calls the postUser api method to add a user to the 'users'.
   */
  signup() {
    this.api.postUser(this.signupData)
      .subscribe(resp => {
        //console.log(resp);
        this.router.navigate(['login']);
      }, err => {
        this.message = err.error.msg;
      });
  }
  /**
   * Adapted from https://stackoverflow.com/questions/50728460/password-confirm-angular-material
   *  
   */
  /* Shorthands for form controls (used from within template) */
  get password() { return this.passwordFormGroup.get('password'); }
  get password2() { return this.passwordFormGroup.get('password2'); }

  /* Called on each input in either password field */
  onPasswordInput() {
    if (this.passwordFormGroup.hasError('passwordMismatch'))
      this.password2.setErrors([{'passwordMismatch': true}]);
    else
      this.password2.setErrors(null);
  }

  passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    if (formGroup.get('password').value === formGroup.get('password2').value)
      return null;
    else
      return {passwordMismatch: true};
  };
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}