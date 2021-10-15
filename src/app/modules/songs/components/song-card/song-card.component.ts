import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Song } from '../../interfaces/songs-response.interface';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.css']
})
export class SongCardComponent implements OnInit {

  @Input() song!: Song;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToArtistPage() {
    let artistID: string = '';

    if (this.song.type === 'single') {
      artistID = this.song.id;
    };

    if (this.song.type === 'album'){
      artistID = this.song.artists[0].id;
    };

    this.router.navigate(['/songs/artist/', artistID]);
  };

}
