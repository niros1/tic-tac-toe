import { Injectable } from '@angular/core';
import { Cube } from '../model/cube';
import { X, O, I } from '../model/common-consts';
import { Game } from '../BL/game';
import { IResult } from '../model/result';
import { GAME_STATE } from '../model/game-state';

@Injectable()
export class BoardStateService {


  public boardCubes: Array<Cube> = [];
  public currentTurn: string;
  public result: IResult;

  constructor(private game: Game) {
    this.start();
  }

  public replay() {
    this.start();
  }

  private start() {
    this.game.start();
    this.boardCubes = this.game.getBoard();
    this.currentTurn = this.game.getCurrentTrun();
    this.result = { nextTurn: this.currentTurn, state: GAME_STATE.PLAY };
  }
  public markCube(index: number) {
    const cube: Cube = this.boardCubes[index];
    if (!cube) {
      throw new Error('Error occure - seems like an out of index issue');
    }

    if (cube.value !== ' ') {
      console.log('seems like this cube was already marked, aboard logic');
      return;
    }

    if (cube) {
      cube.value = this.game.getCurrentTrun();
      this.result = this.game.playTurn();
      this.currentTurn = this.result.nextTurn;
    }

  }
}
