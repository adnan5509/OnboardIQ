import { afterNextRender, Component, viewChild, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime, timeout } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {


  private form = viewChild<NgForm>('form');

  constructor() {
    afterNextRender(() => {

      const savedForm = localStorage.getItem('saved-login-form-details');

      if (savedForm) {
        const loadedFormData = JSON.parse(savedForm);
        const loadedEmail = loadedFormData.email;
        setTimeout(() => {
          this.form()?.controls['email'].setValue(loadedEmail);
        }, 1)
      }

      this.form()?.valueChanges?.pipe(debounceTime(5000)).subscribe(
        { next: (value) => localStorage.setItem('saved-login-form-details', JSON.stringify({ 'email': value.email })) }
      );
    })
  }

  onSubmit(formData: NgForm) {

    if (formData.form.invalid) {
      return;
    }
    console.log("Entered Login Details");
    console.log("Email", formData.form.value.email);
    console.log("Password", formData.form.value.password);
    console.log(formData);

    formData.form.reset();
  }
}
