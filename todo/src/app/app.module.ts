import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    BrowserModule,
    AppRoutingModule,
    TodosModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
