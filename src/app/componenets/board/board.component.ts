import { Component, OnInit } from '@angular/core';
import { BoardStateService } from '../../state/board-state.service';
import { Cube } from '../../model/cube';
import { GAME_STATE } from '../../model/game-state';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(private boardState: BoardStateService) { }

  ngOnInit() {
  }

  cubeClicked(event: Cube) {
    if (this.boardState.result.state === GAME_STATE.PLAY) {
      this.boardState.markCube(event.index);
    }

  }

}
