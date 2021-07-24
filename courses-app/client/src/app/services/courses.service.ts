import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay, take, tap } from 'rxjs/operators';
import { Course } from '../types/Course';
import { environment } from '../../environments/environment';
import { User } from '../types/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private courses: Course[] = [];
  private _courses$ = new BehaviorSubject<Course[]>([]);
  readonly courses$ = this._courses$.asObservable();

  constructor(
    private http: HttpClient,
    private notifierService: NotifierService
  ) {
    this.getAndUpdateAllCourses();
  }

  filterBySearchString(search: string) {
    this._courses$.next(
      this.courses.filter((course) => course.title.includes(search))
    );
  }

  getAndUpdateAllCourses() {
    this.getAll()
      .pipe(take(1))
      .subscribe((courses) => {
        this.courses = courses;
        this._courses$.next(courses);
      });
  }

  filterByDuration(duration: number) {
    this._courses$.next(
      this.courses.filter(
        (course) =>
          (Date.parse(course.endsAt) - Date.parse(course.startsAt)) / 60000 <
          (duration || 0)
      )
    );
  }

  filterByParticipating(userId: string): Observable<Course[]> {
    return this._courses$.pipe(
      map((courses) =>
        courses?.filter((course) =>
          course.participants.some((user) => user?._id === userId)
        )
      )
    );
  }

  filterByAuthorithy(authorId: string): Observable<Course[]> {
    return this._courses$.pipe(
      map((courses) =>
        courses?.filter((course) => course.teacher?._id === authorId)
      )
    );
  }

  sortByDuration(order: 'asc' | 'desc' | 'reset') {
    let courses = this._courses$
      .getValue()
      .sort(
        (a, b) =>
          Date.parse(a.endsAt) -
          Date.parse(a.startsAt) -
          (Date.parse(b.endsAt) - Date.parse(b.startsAt))
      );
    if (order === 'reset') {
      courses = [...this.courses];
    } else if (order === 'desc') {
      courses = courses.reverse();
    }
    this._courses$.next(courses);
  }

  private isSuccessResponseWithNotify(response: any, message: string) {
    if (response.error) {
      this.notifierService.notify('error', response.error);
      return false;
    }
    this.notifierService.notify('success', message);
    return true;
  }

  create(course: Partial<Course>) {
    return this.http
      .post<Course>(`${environment.serverUrl}/courses`, course)
      .pipe(
        take(1),
        tap((res: any) => {
          if (
            this.isSuccessResponseWithNotify(
              res,
              'Course was created successfully'
            )
          )
            this.getAndUpdateAllCourses();
        })
      );
  }

  update(id: string, course: Partial<Course>) {
    return this.http
      .put<Course>(`${environment.serverUrl}/courses/${id}`, course)
      .pipe(
        take(1),
        tap((res: any) => {
          if (
            this.isSuccessResponseWithNotify(
              res,
              'Course was updated successfully'
            )
          )
            this.getAndUpdateAllCourses();
        })
      );
  }

  delete(id: string) {
    return this.http
      .delete<Course>(`${environment.serverUrl}/courses/${id}`)
      .pipe(
        take(1),
        tap((res: any) => {
          if (
            this.isSuccessResponseWithNotify(
              res,
              'Course was removed successfully'
            )
          )
            this._courses$.next(
              this._courses$.getValue().filter((course) => course._id !== id)
            );
        })
      );
  }

  participate(courseId: string, userId: string, action: 'leave' | 'join') {
    return this.http.post<User>(
      `${environment.serverUrl}/courses/participate`,
      {
        courseId,
        userId,
        action,
      }
    );
  }

  getAll() {
    return this.http
      .get<Course[]>(`${environment.serverUrl}/courses`)
      .pipe(shareReplay(1));
  }

  getById(id: string) {
    return this.http
      .get<Course>(`${environment.serverUrl}/courses/${id}`)
      .pipe(shareReplay(1));
  }
}
