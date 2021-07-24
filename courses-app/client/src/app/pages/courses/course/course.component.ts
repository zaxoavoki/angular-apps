import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { CoursesService } from '../../../services/courses.service';
import { UsersService } from '../../../services/users.service';
import { Course } from '../../../types/Course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: [],
})
export class CourseComponent {
  private _course$ = new BehaviorSubject<Course | null>(null);
  readonly course$ = this._course$.asObservable();
  readonly isParticipating$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private usersService: UsersService,
    public location: Location,
    private titleService: Title,
    private authService: AuthService,
    private notifierService: NotifierService,
    private router: Router
  ) {
    this.route.paramMap
      .pipe(
        switchMap((params) =>
          this.coursesService.getById(params.get('id') as string)
        )
      )
      .subscribe((res: any) => {
        if (res.error) {
          return this.router.navigate(['/not-found']);
        }
        this.titleService.setTitle(res.title);
        this._course$.next(res);
        return;
      });

    this.isParticipating$ = this.course$.pipe(
      switchMap((course) =>
        this.authService
          .user$()
          .pipe(
            map(
              (auth) =>
                !!course?.participants.find((user) => user._id === auth?._id)
            )
          )
      )
    );
  }

  leaveCourse() {
    this.participateCourse$('leave').subscribe((res: any) => {
      if (res.error) {
        this.notifierService.notify('error', res.error);
        return;
      }
      this.notifierService.notify('success', 'You left course successfully');
      const course = this._course$.getValue();
      if (course) {
        course.participants = course?.participants.filter(
          (user) => user._id !== res._id
        );
        this._course$.next(course);
      }
    });
  }

  joinCourse() {
    this.participateCourse$('join').subscribe((res: any) => {
      if (res.error) {
        this.notifierService.notify('error', res.error);
        return;
      }
      this.notifierService.notify(
        'success',
        'You are now participating in course'
      );
      const course = { ...this._course$.getValue() };
      course.participants?.push(res);
      this._course$.next(course as Course);
    });
  }

  participateCourse$(action: 'leave' | 'join') {
    return this.route.paramMap.pipe(
      switchMap((params) =>
        this.authService
          .user$()
          .pipe(
            switchMap((user) =>
              this.coursesService.participate(
                params.get('id') as string,
                user?._id as string,
                action
              )
            )
          )
      ),
      take(1)
    );
  }

  deleteUser(id: string) {
    this.usersService
      .delete(id)
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res.error) {
          this.notifierService.notify('error', res.error);
          return;
        }
        this.notifierService.notify(
          'success',
          'User was deleteed successfully'
        );
        const course = this._course$.getValue();
        if (course) {
          course.participants = course.participants.filter(
            (user) => user._id !== id
          );
        }
        this._course$.next(course);
      });
  }
}
