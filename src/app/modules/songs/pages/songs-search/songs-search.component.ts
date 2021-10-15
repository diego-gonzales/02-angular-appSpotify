import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { SongsService } from '../../services/songs.service';
import { Song } from '../../interfaces/songs-response.interface';

@Component({
  selector: 'app-songs-search',
  templateUrl: './songs-search.component.html',
  styleUrls: ['./songs-search.component.css']
})
export class SongsSearchComponent implements OnInit {

  suggestions: Song[] = [];
  isSearching: boolean = false;
  myForm: FormGroup = this.fb.group({
    keyword: [ '', Validators.required ]
  });
  expiredToken$!: Observable<boolean>;

  constructor(private songsService: SongsService,
              private fb: FormBuilder) {
    songsService.titleObservableData = 'Start searching your favorite music';
    this.expiredToken$ = songsService.expiredTokenObservable;
  };

  ngOnInit(): void {
  }


  onSearch() {
    this.isSearching = true;
    const { keyword } = this.myForm.value;

    if (this.myForm.invalid || keyword.trim() === '') return;

    this.songsService.getSuggestionsByKeyword(keyword.trim().toLowerCase())
        .subscribe(resp => {
          this.suggestions = resp;
          this.isSearching = false;
        });
  };
}
