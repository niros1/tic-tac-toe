import { GAME_STATE } from './game-state';

export interface IResult {
    nextTurn: string;
    state: GAME_STATE;
    winner: string;
}
