import { Component, OnInit } from '@angular/core';
import { BoardgamesService } from './boardgames.service';
import { Boardgame } from '../models/boardgame';
import { FilterOptions } from './filter-options.model';

@Component({
  selector: 'app-boardgames',
  templateUrl: './boardgames.component.html',
  styleUrls: ['./boardgames.component.css']
})
export class BoardgamesComponent implements OnInit {

  boardgames: Boardgame[];
  filteredBoardGames: Boardgame[];
  filter: FilterOptions;
  defaultFilter: FilterOptions;
  numberOfPlayersMax: number;
  noValueMessage = 'Disabled';

  constructor( private boardgamesService: BoardgamesService ) {
    this.boardgamesService.boardGames.subscribe( (newBoardgames: Boardgame[]) => {
      this.boardgames = newBoardgames;
      this.numberOfPlayersMax = this.boardgamesService.maxPlayersCap;
      this.filteredBoardGames = this.boardgames;
      console.log(this.filteredBoardGames);
    });
   }

  ngOnInit() {
    this.boardgamesService.getBoardGames();
    this.filter = {
      title: '',
      numberOfPlayers: 0,
      minTimeLessThan: 0,
      minTimeGreaterThan: 0,
      maxTimeLessThan: 0,
      maxTimeGreaterThan: 0,
      complexityGreaterThan: 0,
      complexityLessThan: 0
    };
    this.defaultFilter = {
      title: '',
      numberOfPlayers: 0,
      minTimeLessThan: 0,
      minTimeGreaterThan: 0,
      maxTimeLessThan: 0,
      maxTimeGreaterThan: 0,
      complexityGreaterThan: 0,
      complexityLessThan: 0
    };
  }

  onRunFilter() {
    if (this.checkFilterDifferance()) {
      this.filteredBoardGames = this.boardgames;
      return;
    }
    this.filteredBoardGames = [];
    for (const boardgame of this.boardgames) {
      if (this.filter.title !== this.defaultFilter.title) {
        if (!boardgame.title.toLowerCase().search(this.filter.title.toLowerCase())) {
          this.filteredBoardGames.push(boardgame);
          continue;
        }
      }
      if ( this.filter.numberOfPlayers !== this.defaultFilter.numberOfPlayers ) {
        if ( this.filter.numberOfPlayers >= boardgame.min_player_count && this.filter.numberOfPlayers <= boardgame.max_player_count ) {
            this.filteredBoardGames.push(boardgame);
            continue;
        }
      }
      if (this.runNumberFilter(this.filter.maxTimeGreaterThan, this.defaultFilter.maxTimeGreaterThan,
                                this.filter.maxTimeLessThan, this.defaultFilter.maxTimeLessThan,
                                boardgame.max_time)) {
          this.filteredBoardGames.push(boardgame);
          continue;
      }
      if (this.runNumberFilter(this.filter.minTimeGreaterThan, this.defaultFilter.minTimeGreaterThan,
                                this.filter.minTimeLessThan, this.defaultFilter.minTimeLessThan,
                                boardgame.min_time)) {
          this.filteredBoardGames.push(boardgame);
          continue;
      }
      if (this.runNumberFilter(this.filter.complexityGreaterThan, this.defaultFilter.complexityGreaterThan,
                                this.filter.complexityLessThan, this.defaultFilter.complexityLessThan,
                                boardgame.complexity)) {
          this.filteredBoardGames.push(boardgame);
          continue;
      }
    }
  }

  resetFilter() {
    this.filter = {...this.defaultFilter};
    this.filteredBoardGames = this.boardgames;
  }

  runNumberFilter(filterMinValue: number, defaultMinValue, filterMaxValue: number, defaultMaxValue, boardgameValue) {
    if (filterMinValue !== defaultMinValue || filterMaxValue !== defaultMaxValue) {
      if (boardgameValue >= filterMinValue && boardgameValue <= filterMaxValue) {
        return true;
      }
    }
    return false;
  }

  checkFilterDifferance() {
    return (this.filter.title === this.defaultFilter.title &&
            this.filter.numberOfPlayers === this.defaultFilter.numberOfPlayers &&
            this.filter.minTimeLessThan === this.defaultFilter.minTimeLessThan &&
            this.filter.maxTimeLessThan === this.defaultFilter.maxTimeLessThan &&
            this.filter.minTimeGreaterThan === this.defaultFilter.maxTimeGreaterThan &&
            this.filter.maxTimeGreaterThan === this.defaultFilter.maxTimeGreaterThan &&
            this.filter.complexityLessThan === this.defaultFilter.complexityLessThan &&
            this.filter.complexityGreaterThan === this.defaultFilter.complexityGreaterThan );
  }

}
