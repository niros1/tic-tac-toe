import { Injectable } from '@angular/core';
import { BoardStateService } from '../state/board-state.service';
import { X, O, I } from '../model/common-consts';
import { GAME_STATE } from '../model/game-state';
import { IResult } from '../model/result';
import { Cube } from '../model/cube';

// **This class has some overlap state with the state service.
// it was written with a thought that the logic can reside outside of the application (e.g. server side) */
@Injectable()
export class Game {
    private turn: string;
    private moves: number;
    private boardCubes: Array<Cube> = [];
    private boardSize = 9;
    private winner: string;


    constructor() {
    }

    public start() {
        this.turn = X;
        this.moves = 0;
        this.boardCubes.length === 0 ? this.initBoard() : this.cleanBoard();
    }

    public getCurrentTrun(): string {
        return this.turn;
    }
    public getBoard(): Array<Cube> {
        return this.boardCubes.map((cube) => {
            const clone = new Cube();
            clone.index = cube.index;
            clone.value = cube.value;
            return clone;
        });
    }

    public playTurn(index: number): IResult {
        this.moves++;
        this.boardCubes[index].value = this.getCurrentTrun();
        const state: GAME_STATE = this.getGameState();
        if (state !== GAME_STATE.WIN) {
            this.setNextTurn();
        }
        const result = {
            nextTurn: this.getCurrentTrun(),
            state: state,
            winner: this.winner
        };
        return result;
    }

    private getGameState(): GAME_STATE {
        // At least five moves need to be taken to have a winner.
        if (this.moves < 5) {
            return GAME_STATE.PLAY;
        }

        return this.checkState();
    }

    private setNextTurn() {
        this.turn = this.turn === X ? O : X;
    }

    private initBoard() {
        for (let index = 0; index < this.boardSize; index++) {
            const cube = new Cube();
            cube.value = I;
            cube.index = index;
            this.boardCubes[index] = cube;
        }
    }

    private cleanBoard() {
        this.boardCubes.forEach((cube: Cube) => {
            cube.clean();
        });
    }

    private checkState(): GAME_STATE {
        const board = this.boardCubes;

        // check rows
        for (let i = 0; i <= 6; i = i + 3) {
            if (board[i].value !== I && board[i].value === board[i + 1].value && board[i + 1].value === board[i + 2].value) {
                this.winner = this.getCurrentTrun();
                return GAME_STATE.WIN;
            }
        }

        // check columns
        for (let i = 0; i <= 2; i++) {
            if (board[i].value !== I && board[i].value === board[i + 3].value && board[i + 3].value === board[i + 6].value) {
                this.winner = this.getCurrentTrun();
                return GAME_STATE.WIN;
            }
        }

        // check diagonals
        if (
            (board[0].value === board[4].value && board[4].value === board[8].value) ||
            (board[2].value === board[4].value && board[4].value === board[6].value)
        ) {
            this.winner = this.getCurrentTrun();
            return GAME_STATE.WIN;
        }

        if (this.moves === this.boardSize) {
            return GAME_STATE.DRAW;
        }

        return GAME_STATE.PLAY;
    }
}
