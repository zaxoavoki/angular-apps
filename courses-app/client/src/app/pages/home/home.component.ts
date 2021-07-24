import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../types/Course';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [],
})
export class HomeComponent {
  readonly user$;
  readonly participatedCourses$: Observable<Course[]>;
  readonly managableCourses$: Observable<Course[]>;

  constructor(
    private authService: AuthService,
    private coursesService: CoursesService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Home');
    this.coursesService.getAndUpdateAllCourses();

    this.user$ = this.authService.user$();
    this.managableCourses$ = this.authService
      .user$()
      .pipe(
        switchMap((user) =>
          this.coursesService.filterByAuthorithy(user?._id as string)
        )
      );

    this.participatedCourses$ = this.authService
      .user$()
      .pipe(
        switchMap((user) =>
          this.coursesService.filterByParticipating(user?._id as string)
        )
      );
  }

  deleteCourse(id: string) {
    this.coursesService.delete(id).subscribe();
  }
}
