import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CellComponent } from './cell/cell.component';
import { PlayerPipe } from './player.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    PlayerPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
