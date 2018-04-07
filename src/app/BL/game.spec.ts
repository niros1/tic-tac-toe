import { TestBed, inject } from '@angular/core/testing';
import { Game } from './game';
import { IResult } from '../model/result';
import { GAME_STATE } from '../model/game-state';


fdescribe('Game', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Game]
    });
  });

  it('should be created', inject([Game], (service: Game) => {
    expect(service).toBeTruthy();
  }));

  it('X should win diagonal', inject([Game], (service: Game) => {
    let result: IResult;
    service.start();
    service.playTurn(0); // X
    service.playTurn(1); // O
    service.playTurn(4); // X
    service.playTurn(2); // O
    result = service.playTurn(8); // X
    expect(result.state).toEqual(GAME_STATE.WIN);
  }));

  it('Result should be a draw', inject([Game], (service: Game) => {
    let result: IResult;
    service.start();
    service.playTurn(0); // X
    service.playTurn(1); // O
    service.playTurn(2); // X
    service.playTurn(3); // O
    service.playTurn(5); // X
    service.playTurn(4); // O
    service.playTurn(6); // X
    service.playTurn(8); // O
    result = service.playTurn(7); // X
    expect(result.state).toEqual(GAME_STATE.DRAW);
  }));
});
