import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styles: [],
})
export class ProfileEditComponent implements OnInit {
  editForm = this.fb.group({
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
    logout: [true],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private usersService: UsersService,
    private titleService: Title,
    private notifierService: NotifierService
  ) {
    this.titleService.setTitle('Edit profile');
  }

  ngOnInit() {
    this.usersService
      .getById(this.route.snapshot.paramMap.get('id') as string)
      .pipe(take(1))
      .subscribe((user) => {
        this.editForm.patchValue(user);
      });
  }

  onSubmit() {
    this.usersService
      .update(this.route.snapshot.paramMap.get('id') || '', this.editForm.value)
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res.error) {
          
          console.log(res)
          this.notifierService.notify('error', res.error);
          return;
        }
        this.notifierService.notify('success', 'Profile was updated');
      });
  }
}
