import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CoursesService } from '../../services/courses.service';
import { UsersService } from '../../services/users.service';
import { Course } from '../../types/Course';
import { User } from '../../types/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [],
})
export class ProfileComponent {
  user$?: Observable<User | null>;
  readonly authUser$: Observable<User | null>;
  private _courses$ = new BehaviorSubject<Course[]>([]);
  readonly courses$ = this._courses$.asObservable();

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private authService: AuthService,
    private coursesService: CoursesService,
    private titleService: Title
  ) {
    this.authUser$ = this.authService.user$();
    this.route.paramMap.subscribe((params) => {
      this.user$ = this.usersService.getById(params.get('id') as string).pipe(
        tap((user) => {
          this.titleService.setTitle(user.firstName + ' ' + user.lastName);
          this._courses$.next(user.courses);
        })
      );
    });
  }

  deleteCourse(id: string) {
    this.coursesService
      .delete(id)
      .subscribe(() =>
        this._courses$.next(
          this._courses$.getValue().filter((course) => course._id !== id)
        )
      );
  }
}
