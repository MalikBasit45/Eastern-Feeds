import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { MatSelectModule } from '@angular/material/select';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
     MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  errorMessage: string | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  onSubmit() {
  if (this.loginForm.invalid) return;

  const { email, password, role } = this.loginForm.value;

  this.isLoading = true;
  this.errorMessage = '';

  this.authService.login(email, password).subscribe({
    next: () => {
      const currentUser = this.authService.getCurrentUser();

      // Check if selected role matches the logged-in user
      if (currentUser?.role !== role) {
        this.errorMessage = 'Selected role does not match credentials';
        this.authService.logout(); // optional: clear session
        this.isLoading = false;
        return;
      }

      // Role matches, navigate to dashboard
      this.router.navigate(['/dashboard']);
      this.isLoading = false;
    },
    error: (err) => {
      this.errorMessage = err.message || 'Invalid email or password';
      this.isLoading = false;
    }
  });
}

}
