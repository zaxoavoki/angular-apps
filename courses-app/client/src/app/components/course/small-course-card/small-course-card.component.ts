import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../../types/Course';

@Component({
  selector: 'app-small-course-card',
  templateUrl: './small-course-card.component.html',
  styles: [],
})
export class SmallCourseCardComponent {
  @Input() course: Course | null = null;
  @Output() deleteCourse = new EventEmitter<string>();

  onDeleteCourse(id: string) {
    this.deleteCourse.emit(id);
  }
}
