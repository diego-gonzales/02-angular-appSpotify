import { Component, OnInit } from '@angular/core';
import { SongsService } from './services/songs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  title$!: Observable<String>;

  constructor(songsService: SongsService) {
    this.title$ = songsService.titleObservable;
  }

  ngOnInit(): void {
  }

}
