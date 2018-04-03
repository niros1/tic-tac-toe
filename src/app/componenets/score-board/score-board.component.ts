import { Component, OnInit } from '@angular/core';
import { BoardStateService } from '../../state/board-state.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss']
})
export class ScoreBoardComponent implements OnInit {

  constructor(private boardState: BoardStateService) { }

  ngOnInit() {
  }

  replay() {
    this.boardState.replay();
  }

}
