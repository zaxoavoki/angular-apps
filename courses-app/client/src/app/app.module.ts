import { NotifierModule } from 'angular-notifier';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CanViewDirective } from './directives/can-view.directive';
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CoursesComponent } from './pages/courses/courses/courses.component';
import { CourseComponent } from './pages/courses/course/course.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { AddCourseComponent } from './pages/admin/add-course/add-course.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileEditComponent } from './pages/profile/profile-edit/profile-edit.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { BigCourseCardComponent } from './components/course/big-course-card/big-course-card.component';
import { FromDateMomentPipe } from './pipes/from-date-moment.pipe';
import { FromNowMomentPipe } from './pipes/from-now-moment.pipe';
import { SmallCourseCardComponent } from './components/course/small-course-card/small-course-card.component';
import { EditCourseComponent } from './pages/admin/edit-course/edit-course.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ModalComponent } from './components/modal/modal.component';
import { SearchComponent } from './components/search/search.component';
import { AdDirective } from './directives/ad.directive';
import { AdBannerComponent } from './components/ad-banner/ad-banner.component';
import { AdComponent } from './components/ad/ad.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    ProfileComponent,
    CoursesComponent,
    CourseComponent,
    UsersComponent,
    NotFoundComponent,
    CanViewDirective,
    ProfileEditComponent,
    UserCardComponent,
    BigCourseCardComponent,
    AddCourseComponent,
    FromDateMomentPipe,
    FromNowMomentPipe,
    SmallCourseCardComponent,
    EditCourseComponent,
    ModalComponent,
    SearchComponent,
    AdDirective,
    AdBannerComponent,
    AdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NotifierModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
