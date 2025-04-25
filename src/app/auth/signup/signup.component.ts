import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {

  sourceOptions = [
    { id: 'google', label: 'Google' },
    { id: 'linkedin', label: 'LinkedIn' },
    { id: 'facebook', label: 'Facebook' },
    { id: 'newsletter', label: 'Newsletter' },
    { id: 'friend', label: 'Referred by friend' },
    { id: 'event', label: 'Event / Conference' },
    { id: 'other', label: 'Other' }
  ];


  signupForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required]
      }),
    }),
    firstName: new FormControl('', {
      validators: [Validators.required]
    }),
    lastName: new FormControl('', {
      validators: [Validators.required]
    }),
    address: new FormGroup({
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
    }),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', {
      validators: [Validators.required]
    }),
    source: new FormArray(
      this.sourceOptions.map(() => new FormControl(false))
    ),
    agree: new FormControl(false, {
      validators: [Validators.required]
    })
  })
  onSubmit() {
    console.log('Email and Password : ', this.signupForm.controls.email.value, this.signupForm.controls.passwords.controls.password.value);
    console.log(this.signupForm);
  }

  reset() {
    this.signupForm.reset();
  }

}
