import { Component, Input } from '@angular/core';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent {
  @Input() searchString = '';

  search: string = '';
  readonly courses$;

  constructor(private coursesService: CoursesService) {
    this.coursesService.getAndUpdateAllCourses();
    this.courses$ = this.coursesService.courses$;
  }

  deleteCouse(id: string) {
    this.coursesService.delete(id).subscribe();
  }

  searchCourses() {
    this.coursesService.filterBySearchString(this.search);
  }
}
