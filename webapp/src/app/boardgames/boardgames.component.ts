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
  minTimeCap: number;
  maxTimeCap: number;
  noValueMessage = 'Disabled';

  constructor( private boardgamesService: BoardgamesService ) {
    this.boardgamesService.boardGames.subscribe( (newBoardgames: Boardgame[]) => {
      this.boardgames = newBoardgames;
      this.numberOfPlayersMax = this.boardgamesService.playersCap;
      this.minTimeCap = this.boardgamesService.minTimeCap;
      this.maxTimeCap = this.boardgamesService.maxTimeCap;
      this.filteredBoardGames = this.boardgames;
      console.log(this.filteredBoardGames);
    });
   }

  ngOnInit() {
    this.boardgamesService.getBoardGames();
    this.filter = {
      title: '',
      numberOfPlayers: 0,
      minTime: 0,
      maxTime: 0,
      maxComplexity: 0,
      minComplexity: 0
    };
    this.defaultFilter = {
      title: '',
      numberOfPlayers: 0,
      minTime: 0,
      maxTime: 0,
      maxComplexity: 0,
      minComplexity: 0
    };
  }

  onRunFilter() {
    if (this.checkFilterDifferance()) {
      this.filteredBoardGames = this.boardgames;
      return;
    }
    this.filteredBoardGames = [];
    for (const boardgame of this.boardgames) {
      let addFilter = true;
      if (this.filter.title !== this.defaultFilter.title) {
        if (!boardgame.title.toLowerCase().search(this.filter.title.toLowerCase())) {
          addFilter = true;
        } else {
          continue;
        }
      }
      if ( this.filter.numberOfPlayers !== this.defaultFilter.numberOfPlayers ) {
        if ( this.filter.numberOfPlayers >= boardgame.min_player_count && this.filter.numberOfPlayers <= boardgame.max_player_count ) {
          addFilter = true;
        } else {
          continue;
        }
      }
      if ( this.filter.minTime !== this.defaultFilter.minTime ) {
        if ( boardgame.min_time >= this.filter.minTime ) {
          addFilter = true;
        } else {
          continue;
        }
      }
      if ( this.filter.maxTime !== this.defaultFilter.maxTime ) {
        if ( boardgame.max_time <= this.filter.maxTime ) {
          addFilter = true;
        } else {
          continue;
        }
      }
      if ( this.filter.minComplexity !== this.defaultFilter.minComplexity ) {
        if ( boardgame.complexity >= this.filter.minComplexity ) {
          addFilter = true;
        } else {
          continue;
        }
      }
      if ( this.filter.maxComplexity !== this.defaultFilter.maxComplexity ) {
        if ( boardgame.complexity <= this.filter.maxComplexity ) {
          addFilter = true;
        } else {
          continue;
        }
      }
      if (addFilter) {
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
            this.filter.minTime === this.defaultFilter.minTime &&
            this.filter.maxTime === this.defaultFilter.maxTime &&
            this.filter.minComplexity === this.defaultFilter.minComplexity &&
            this.filter.maxComplexity === this.defaultFilter.maxComplexity );
  }

}
