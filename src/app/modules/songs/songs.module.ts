import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { SongsRoutingModule } from './songs-routing.module';
import { SongsListComponent } from './pages/songs-list/songs-list.component';
import { SongsSearchComponent } from './pages/songs-search/songs-search.component';
import { SongCardComponent } from './components/song-card/song-card.component';
import { SongsComponent } from './songs.component';
import { SongsArtistComponent } from './pages/songs-artist/songs-artist.component';
import { DomSecurePipe } from './pipes/dom-secure.pipe';


@NgModule({
  declarations: [
    SongsListComponent,
    SongsSearchComponent,
    SongCardComponent,
    SongsComponent,
    SongsArtistComponent,
    DomSecurePipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SongsRoutingModule,
    SharedModule
  ]
})
export class SongsModule { }
