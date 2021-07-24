import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../../types/Course';

@Component({
  selector: 'app-big-course-card',
  templateUrl: './big-course-card.component.html',
  styles: [],
})
export class BigCourseCardComponent {
  @Input() course: Course | null = null;
  @Output() deleteCourse = new EventEmitter<string>();

  onDeleteCourse(id: string) {
    this.deleteCourse.emit(id);
  }
}
