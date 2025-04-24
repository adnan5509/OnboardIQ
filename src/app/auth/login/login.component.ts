import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function mustBeCompanyEmailAddress(control: AbstractControl) {
  return control.value.includes('accenture') ? null : { notCompanyEmailAddress: true };
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required, mustBeCompanyEmailAddress]
    }),
    password: new FormControl('',
      {
        validators: [Validators.required, Validators.minLength(6)]
      }
    )
  });

  get isEmailInvalid() {
    return (
      this.loginForm.controls.email.touched &&
      this.loginForm.controls.email.dirty &&
      this.loginForm.controls.email.invalid
    )
  }

  get isPasswordInvalid() {
    return (
      this.loginForm.controls.password.touched &&
      this.loginForm.controls.password.dirty &&
      this.loginForm.controls.password.invalid
    )
  }

  onSubmit() {
    console.log(this.loginForm);
    console.log('Entered login Details ', this.loginForm.value.email, this.loginForm.value.password);
  }

}