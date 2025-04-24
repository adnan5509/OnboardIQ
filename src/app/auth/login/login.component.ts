import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of, Subscription } from 'rxjs';

function mustBeCompanyEmailAddress(control: AbstractControl) {
  return control.value.includes('accenture') ? null : { notCompanyEmailAddress: true };
}

function shouldNotMatchPreviousPasswords(control: AbstractControl) {
  const previousPasswords = [
    '1234567',
    '12345678',
    '123456789',
    'abcdefg',
  ];
  return previousPasswords.includes(control.value) ? of({ matchesPreviousPassword: true }) : of(null);
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {


  private subscriptions: Subscription[] = [];

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required, mustBeCompanyEmailAddress]
    }),
    password: new FormControl('',
      {
        asyncValidators: [shouldNotMatchPreviousPasswords]
      }
    )
  });

  ngOnInit() {
    const savedLoginForm = localStorage.getItem('saved-login-form');

    if (savedLoginForm) {
      this.loginForm.patchValue({
        email: JSON.parse(savedLoginForm).email
      })
    }

    this.loginForm.valueChanges.pipe(debounceTime(500)).subscribe({
      next: value => localStorage.setItem('saved-login-form', JSON.stringify({ 'email': value.email }))
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    })
  }

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