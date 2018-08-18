import { Injectable, Output } from '@angular/core';
import { Boardgame } from '../models/boardgame';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpBackend, HttpResponse } from '@angular/common/http';

@Injectable()
export class BoardgamesService {

  boardGames = new Subject<Boardgame[]>();
  playersCap = 0;
  maxTimeCap = 0;
  minTimeCap = 0;

  constructor( private http: HttpClient) {  }

  getBoardGames() {
    this.http.get<Boardgame[]>('http://127.0.0.1:8000/boardgames/')
      .subscribe((res: Boardgame[]) => {
        for (const boardgame of res) {
            if (boardgame.max_player_count > this.playersCap) {
                this.playersCap = boardgame.max_player_count;
            }
            if (boardgame.min_time > this.minTimeCap) {
                this.minTimeCap = boardgame.min_time;
            }
            if (boardgame.max_time > this.maxTimeCap) {
                this.maxTimeCap = boardgame.max_time;
            }
        }
        this.boardGames.next(res);
      });
  }

}
