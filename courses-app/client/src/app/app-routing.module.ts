import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UsersComponent as AdminUsersComponent } from './pages/admin/users/users.component';
import { AddCourseComponent } from './pages/admin/add-course/add-course.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { CourseComponent } from './pages/courses/course/course.component';
import { CoursesComponent } from './pages/courses/courses/courses.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileEditComponent } from './pages/profile/profile-edit/profile-edit.component';
import { EditCourseComponent } from './pages/admin/edit-course/edit-course.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { roles: ['guest'] },
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AuthGuard],
    data: { roles: ['guest'] },
  },
  {
    path: 'profile',
    children: [
      { path: ':id', component: ProfileComponent },
      { path: ':id/edit', component: ProfileEditComponent },
    ],
    canActivate: [AuthGuard],
    data: { roles: ['user'] },
  },
  {
    path: 'courses',
    children: [
      { path: '', component: CoursesComponent },
      { path: ':id', component: CourseComponent },
      {
        path: ':id/edit',
        component: EditCourseComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] },
      },
    ],
  },
  {
    path: 'admin',
    children: [
      { path: 'users', component: AdminUsersComponent },
      { path: 'courses', component: AddCourseComponent },
    ],
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
