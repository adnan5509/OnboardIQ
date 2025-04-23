import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  onSubmit(formData: NgForm) {

    if (formData.form.invalid) {
      return;
    }
    console.log("Entered Login Details");
    console.log("Email", formData.form.value.email);
    console.log("Password", formData.form.value.password);
    console.log(formData);

  }
}
