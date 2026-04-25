import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.html'
})
export class SignupComponent {

  form: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.auth.signup(this.form.value).subscribe({
      next: () => {
        alert('Signup successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: () => alert('Signup failed')
    });
  }
}