import { Injectable } from '@angular/core';
import { BoardStateService } from '../state/board-state.service';
import { X, O, I } from '../model/common-consts';
import { GAME_STATE } from '../model/game-state';
import { IResult } from '../model/result';
import { Cube } from '../model/cube';

// **This class has some overlap state with the state service.
// it was written with a thought that the logic can reside outside of the application */
@Injectable()
export class Game {
    private turn: string;
    private moves: number;
    private boardCubes: Array<Cube> = [];
    private boardSize = 9;
    private winner: string;


    constructor() {
        this.start();
    }

    public start() {
        this.turn = X;
        this.moves = 0;
        this.boardCubes.length === 0 ? this.initBoard() : this.cleanBoard();
    }

    public setNextTurn() {
        this.turn = this.turn === X ? O : X;
    }

    public getCurrentTrun(): string {
        return this.turn;
    }
    public getBoard(): Array<Cube> {
        return this.boardCubes.map((cube) => cube);
    }

    public playTurn(): IResult {
        this.moves++;
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

    public getGameState(): GAME_STATE {
        // At least five moves need to be taken to have a winner.
        if (this.moves < 5) {
            return GAME_STATE.PLAY;
        }

        return this.checkState();
    }

    private initBoard() {
        for (let index = 0; index < this.boardSize; index++) {
            const cube = new Cube();
            cube.value = I;
            cube.index = index;
            this.boardCubes[index] = cube;
        }
    }

    cleanBoard() {
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
        for (let i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
            if (board[i].value !== I && board[i].value === board[i + j].value && board[i + j].value === board[i + 2 * j].value) {
                this.winner = this.getCurrentTrun();
                return GAME_STATE.WIN;
            }
        }

        if (this.moves === this.boardSize) {
            return GAME_STATE.DRAW;
        }

        return GAME_STATE.PLAY;
    }
}