import { Injectable, Output } from '@angular/core';
import { Boardgame } from '../models/boardgame';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpBackend, HttpResponse } from '@angular/common/http';

@Injectable()
export class BoardgamesService {

  boardGames = new Subject<Boardgame[]>();
  maxPlayersCap = 0;
  minPlayersCap = 0;

  constructor( private http: HttpClient) {  }

  getBoardGames() {
    this.http.get<Boardgame[]>('http://127.0.0.1:8000/boardgames/')
      .subscribe((res: Boardgame[]) => {
        for (const boardgame of res) {
            if (boardgame.max_player_count > this.maxPlayersCap) {
                this.maxPlayersCap = boardgame.max_player_count;
            }
            if (boardgame.min_player_count > this.minPlayersCap) {
                this.minPlayersCap = boardgame.min_player_count;
            }
        }
        this.boardGames.next(res);
      });
  }

}
