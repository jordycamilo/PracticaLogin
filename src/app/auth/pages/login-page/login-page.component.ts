import { Component, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  fb = inject(FormBuilder);
  platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  hasError = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      if (this.isBrowser) {
        this.hasError.set(true);
        setTimeout(() => this.hasError.set(false), 2000);
      }
      return;
    }

    const { email, password } = this.loginForm.value;
    if (this.isBrowser) {
      console.log({ email, password });
    }
  }
}
