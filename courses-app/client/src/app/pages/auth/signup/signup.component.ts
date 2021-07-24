import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [],
})
export class SignupComponent {
  signupForm = this.fb.group({
    firstName: [
      null,
      [Validators.required, Validators.pattern(/^[A-Za-z\-]+$/)],
    ],
    lastName: [
      null,
      [Validators.required, Validators.pattern(/^[A-Za-z\-]+$/)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(32)],
    ],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private titleService: Title,
  ) {
    this.titleService.setTitle('Sign up');
  }

  onSubmit() {
    this.authService.singup(this.signupForm.value).pipe(take(1)).subscribe();
  }
}
