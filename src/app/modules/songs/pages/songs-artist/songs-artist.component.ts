import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { SongsService } from '../../services/songs.service';
import { ArtistShort } from '../../interfaces/artist-response.interface';
import { TrackShort } from '../../interfaces/tracks-response.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-songs-artist',
  templateUrl: './songs-artist.component.html',
  styleUrls: ['./songs-artist.component.css']
})
export class SongsArtistComponent implements OnInit {

  artist!: ArtistShort;
  tracks!: TrackShort[];

  constructor(private songsService: SongsService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
                songsService.titleObservableData = 'Artist Info';
              }

  ngOnInit(): void {
    this.getArtistInfo();
  }

  getArtistInfo() {
    this.activatedRoute.params
        .pipe(
          switchMap(({ idArtist }) => this.songsService.getArtistAndHisTopTrackList(idArtist))
        ).subscribe( ([artist, tracks]) => {
          this.artist = artist;
          this.tracks = tracks;
        }, (err: HttpErrorResponse) => {
          this.router.navigateByUrl('/songs/list');
        });
  };

  back() {
    return window.history.back();
  };
}
