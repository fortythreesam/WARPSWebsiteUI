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

  constructor( private boardgamesService: BoardgamesService ) {
    this.boardgamesService.mockBoardGames.subscribe( (newBoardgames: Boardgame[]) => {
      this.boardgames = newBoardgames;
      this.filteredBoardGames = this.boardgames;
      console.log(this.filteredBoardGames);
    });
   }

  ngOnInit() {
    this.boardgamesService.getBoardGames();
    this.filter = {
      title: '',
      maxPlayersLessThan: 5,
      maxPlayersGreaterThan: 0,
      minPlayersLessThan: 5,
      minPlayersGreaterThan: 0,
      minTimeLessThan: 300,
      minTimeGreaterThan: 0,
      maxTimeLessThan: 300,
      maxTimeGreaterThan: 0,
      complexityGreaterThan: 0,
      complexityLessThan: 5
    };
    this.defaultFilter = {
      title: '',
      maxPlayersLessThan: 5,
      maxPlayersGreaterThan: 0,
      minPlayersLessThan: 5,
      minPlayersGreaterThan: 0,
      minTimeLessThan: 300,
      minTimeGreaterThan: 0,
      maxTimeLessThan: 300,
      maxTimeGreaterThan: 0,
      complexityGreaterThan: 0,
      complexityLessThan: 5
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
        if (boardgame.title === this.filter.title) {
          this.filteredBoardGames.push(boardgame);
          continue;
        }
      }
      if (this.runNumberFilter(this.filter.maxPlayersGreaterThan, this.defaultFilter.maxPlayersGreaterThan,
                                this.filter.maxPlayersLessThan, this.defaultFilter.maxPlayersLessThan,
                                boardgame.max_player_count)) {
          this.filteredBoardGames.push(boardgame);
          continue;
      }
      if (this.runNumberFilter(this.filter.minPlayersGreaterThan, this.defaultFilter.minPlayersGreaterThan,
                                this.filter.minPlayersLessThan, this.defaultFilter.minPlayersLessThan,
                                boardgame.min_player_count)) {
          this.filteredBoardGames.push(boardgame);
          continue;
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
            this.filter.minPlayersLessThan === this.defaultFilter.minPlayersLessThan &&
            this.filter.maxPlayersLessThan === this.defaultFilter.maxPlayersLessThan &&
            this.filter.minPlayersGreaterThan === this.defaultFilter.minPlayersGreaterThan &&
            this.filter.maxPlayersGreaterThan === this.defaultFilter.maxPlayersGreaterThan &&
            this.filter.minTimeLessThan === this.defaultFilter.minTimeLessThan &&
            this.filter.maxTimeLessThan === this.defaultFilter.maxTimeLessThan &&
            this.filter.minTimeGreaterThan === this.defaultFilter.maxTimeGreaterThan &&
            this.filter.maxTimeGreaterThan === this.defaultFilter.maxTimeGreaterThan &&
            this.filter.complexityLessThan === this.defaultFilter.complexityLessThan &&
            this.filter.complexityGreaterThan === this.defaultFilter.complexityGreaterThan );
  }

}
