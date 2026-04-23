import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit {

  form: any;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  submit() {

    if (this.form.invalid) return;
  
    const credentials = this.form.value;
    console.log('SENDING:', credentials); 
  
    this.auth.login(credentials).subscribe({
      next: (res: any) => {
  
        console.log('LOGIN RESPONSE:', res);
  
        // SAVE TOKEN
        localStorage.setItem('token', res.access_token);
  
        // Optional: store user email
        localStorage.setItem('user', credentials.email);
  
        // Navigate after login
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = 'Invalid email or password';
        console.error(err);
      }
    });
  }
}
