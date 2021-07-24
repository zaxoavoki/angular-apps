import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { CoursesService } from '../../../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './add-course.component.html',
  styles: [],
})
export class AddCourseComponent {
  courseForm = this.fb.group(
    {
      title: ['', [Validators.required, Validators.minLength(3)]],
      text: ['', [Validators.required, Validators.minLength(3)]],
      startsAt: [null, Validators.required],
      endsAt: [null, Validators.required],
    },
    {
      validator: this.validateDateRange,
    }
  );

  constructor(
    private courseService: CoursesService,
    private titleService: Title,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.titleService.setTitle('Add course');
  }

  private validateDateRange(g: FormGroup) {
    const startsAt = g.controls['startsAt'];
    const endsAt = g.controls['endsAt'];

    startsAt.setErrors(null);
    endsAt.setErrors(null);

    if (Date.parse(startsAt.value) >= Date.parse(endsAt.value)) {
      startsAt.setErrors({ dateRange: true });
      return { dateRange: true };
    }
    return null;
  }

  onSubmit() {
    this.authService
      .user$()
      .pipe(
        switchMap((user) =>
          this.courseService
            .create({ ...this.courseForm.value, teacherId: user?._id })
            .pipe(take(1))
        )
      )
      .subscribe();
  }
}
