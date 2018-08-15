import { Injectable, Output } from '@angular/core';
import { Boardgame } from '../models/boardgame';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpBackend, HttpResponse } from '@angular/common/http';

@Injectable()
export class BoardgamesService {

  boardGames = new Subject<Boardgame[]>();

  constructor( private http: HttpClient) {  }

  getBoardGames() {
    this.http.get<Boardgame[]>('http://127.0.0.1:8000/boardgames/')
      .subscribe((res: Boardgame[]) => {
        this.boardGames.next(res);
      });
  }

}
