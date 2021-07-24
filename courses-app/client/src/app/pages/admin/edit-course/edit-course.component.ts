import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CoursesService } from '../../../services/courses.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styles: [],
})
export class EditCourseComponent implements OnDestroy {
  routeSub: Subscription;
  submitSub?: Subscription;

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
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public location: Location
  ) {
    this.routeSub = this.route.paramMap
      .pipe(
        switchMap((params) =>
          this.courseService.getById(params.get('id') as string)
        )
      )
      .subscribe((course: any) => {
        if (course.error) {
          this.router.navigate(['/not-found']);
          return;
        }
        this.titleService.setTitle('Edit - ' + course.title);
        this.courseForm.patchValue({
          ...course,
          startsAt: course.startsAt.substr(0, 10),
          endsAt: course.endsAt.substr(0, 10),
        });
      });
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
    this.submitSub = this.route.paramMap
      .pipe(
        switchMap((params) =>
          this.courseService.update(
            params.get('id') as string,
            this.courseForm.value
          )
        )
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.submitSub?.unsubscribe();
  }
}
