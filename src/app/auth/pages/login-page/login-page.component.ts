import { Component, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  authService = inject(AuthService);
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
      this.showErrorTemporarily();
      return;
    }

    const email = this.loginForm.get('email')?.value ?? '';
    const password = this.loginForm.get('password')?.value ?? '';

    if (!this.isBrowser) return;

    this.authService.login(email, password).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        alert('Login successful');
      } else {
        this.showErrorTemporarily();
      }
    });
  }

  private showErrorTemporarily() {
    this.hasError.set(true);
    setTimeout(() => this.hasError.set(false), 2000);
  }
}
