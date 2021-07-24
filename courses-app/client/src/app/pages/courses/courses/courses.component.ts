import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../services/courses.service';
import { Title } from '@angular/platform-browser';
import { AdService } from '../../../services/ad.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: [],
})
export class CoursesComponent implements OnInit {
  readonly courses$;
  readonly ads;
  filters = {
    duration: '',
  };

  constructor(
    private coursesService: CoursesService,
    private titleService: Title,
    private adsService: AdService
  ) {
    this.titleService.setTitle('All courses');
    this.courses$ = this.coursesService.courses$;
    this.ads = this.adsService.getAll();
  }

  ngOnInit() {
    this.coursesService.getAndUpdateAllCourses();
  }

  deleteCourse(id: string) {
    this.coursesService.delete(id).subscribe();
  }

  sortByDuration(order: 'asc' | 'desc' | 'reset') {
    this.coursesService.sortByDuration(order);
  }

  filterByDuration() {
    this.coursesService.filterByDuration(parseInt(this.filters.duration));
  }
}
