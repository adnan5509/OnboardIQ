import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function valuesMismatch(firstControl: string, secondControl: string) {
  return (control: AbstractControl) => {
    const firstValue = control.get(firstControl)?.value;
    const secondValue = control.get(secondControl)?.value;
    return firstValue === secondValue ? null : { valuesMismatch: true };
  }
}
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {

  formSubmitted = false;
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
    },
      {
        validators: [valuesMismatch('password', 'confirmPassword')]
      }
    ),
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

  get email() { return this.signupForm.get('email')!; }
  get passwordsGroup() { return this.signupForm.get('passwords')!; }
  get password() { return this.signupForm.get('passwords.password')!; }
  get confirmPassword() { return this.signupForm.get('passwords.confirmPassword')!; }
  get firstName() { return this.signupForm.get('firstName')!; }
  get lastName() { return this.signupForm.get('lastName')!; }
  get street() { return this.signupForm.get('address.street')!; }
  get number() { return this.signupForm.get('address.number')!; }
  get postalCode() { return this.signupForm.get('address.postalCode')!; }
  get city() { return this.signupForm.get('address.city')!; }
  get role() { return this.signupForm.get('role')!; }
  get agree() { return this.signupForm.get('agree')!; }
  get source() { return this.signupForm.get('source') as FormArray; }

  onSubmit() {
    this.formSubmitted = true;
    this.signupForm.markAllAsTouched();
    if (this.signupForm.invalid) {
      console.log('INVALID FORM')
      return
    }
    console.log(this.signupForm)
  }

  reset() {
    this.signupForm.reset();
    this.formSubmitted = false;
  }

}
