import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'songs',
    loadChildren: () => import('./modules/songs/songs.module').then(m => m.SongsModule)
  },
  {
    path: '**',
    redirectTo: 'songs'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
