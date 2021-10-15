import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SongsComponent } from './songs.component';
import { SongsListComponent } from './pages/songs-list/songs-list.component';
import { SongsSearchComponent } from './pages/songs-search/songs-search.component';
import { SongsArtistComponent } from './pages/songs-artist/songs-artist.component';

const routes: Routes = [
  {
    path: '',
    component: SongsComponent,
    children: [
      {
        path: 'list',
        component: SongsListComponent
      },
      {
        path: 'artist/:idArtist',
        component: SongsArtistComponent
      },
      {
        path: 'search',
        component: SongsSearchComponent
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongsRoutingModule { }
