import { Component, OnInit, Input } from '@angular/core';
import { Boardgame } from '../../models/boardgame';

@Component({
  selector: 'app-boardgame',
  templateUrl: './boardgame.component.html',
  styleUrls: ['./boardgame.component.css']
})
export class BoardgameComponent implements OnInit {

  @Input() boardgameInfo: object;

  constructor() { }

  ngOnInit() {
  }

}
