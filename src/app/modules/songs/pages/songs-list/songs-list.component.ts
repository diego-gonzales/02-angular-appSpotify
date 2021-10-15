import { Component, OnInit } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { Song } from '../../interfaces/songs-response.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent implements OnInit {

  songs: Song[] = [];
  expiredToken$: Observable<boolean>;

  constructor(private songsService: SongsService) {
    songsService.titleObservableData = 'New Releases';
    this.expiredToken$ = songsService.expiredTokenObservable;
  }

  ngOnInit(): void {
    this.getSongs();
  }

  getSongs() {
    this.songsService.getSongs()
        .subscribe(resp => {
          this.songs = resp;
          console.log(this.songs);
        });
  };
}
