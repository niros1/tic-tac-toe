import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BoardComponent } from './componenets/board/board.component';
import { BoardStateService } from './state/board-state.service';
import { CubeComponent } from './componenets/cube/cube.component';
import { Game } from './BL/game';
import { ScoreBoardComponent } from './componenets/score-board/score-board.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CubeComponent,
    ScoreBoardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    BoardStateService,
    Game
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
