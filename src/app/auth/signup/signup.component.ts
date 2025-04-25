import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {

  signupForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required]
    }),
    firstName: new FormControl('', {
      validators: [Validators.required]
    }),
    lastName: new FormControl('', {
      validators: [Validators.required]
    }),
    street: new FormControl('', {
      validators: [Validators.required]
    }),
    number: new FormControl('', {
      validators: [Validators.required]
    }),
    postalCode: new FormControl('', {
      validators: [Validators.required]
    }),
    city: new FormControl('', {
      validators: [Validators.required]
    }),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', {
      validators: [Validators.required]
    }),
    agree: new FormControl(false, {
      validators: [Validators.required]
    })
  })
  onSubmit() {
    console.log('Email and Password : ', this.signupForm.controls.email.value, this.signupForm.controls.password.value);
    console.log(this.signupForm);
  }

  reset() {
    this.signupForm.reset();
  }

}
