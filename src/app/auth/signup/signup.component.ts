import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {



  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  onSubmit() {
    console.log('Email and Password : ', this.signupForm.controls.email.value, this.signupForm.controls.password.value);
    console.log(this.signupForm);
  }

  reset() {
    this.signupForm.reset();
  }

}
