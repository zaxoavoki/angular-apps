import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(32)],
    ],
    logout: [true],
  });

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private authService: AuthService
  ) {
    this.titleService.setTitle('Log in');
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).pipe(take(1)).subscribe();
  }
}
