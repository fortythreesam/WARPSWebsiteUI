import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  MatButtonModule,
  MatCardModule,
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatSliderModule
} from '@angular/material';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BoardgamesComponent } from './boardgames/boardgames.component';
import { BoardgameComponent } from './boardgames/boardgame/boardgame.component';
import { HomeComponent } from './core/home/home.component';
import { BoardgamesService } from './boardgames/boardgames.service';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'boardgames', component: BoardgamesComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BoardgamesComponent,
    BoardgameComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    FormsModule
  ],
  providers: [BoardgamesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
