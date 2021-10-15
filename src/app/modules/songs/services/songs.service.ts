import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { SongsResponse, Song } from '../interfaces/songs-response.interface';
import { ArtistResponse, ArtistShort } from '../interfaces/artist-response.interface';
import { TracksResponse, TrackShort } from '../interfaces/tracks-response.interface';
import { SuggestionsResponse } from '../interfaces/suggestions-response.interface';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  private _baseAPISpotify: string = environment.baseAPISpotify;
  private _titleObservable: BehaviorSubject<string> = new BehaviorSubject<string>('');
  // This observable change its value when error occurs (token expired) (error handled in SongInterceptor)
  private _expiredTokenObservable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  get titleObservable() {
    return this._titleObservable.asObservable();
  };

  set titleObservableData(value: string) {
    this._titleObservable.next(value);
  };

  get expiredTokenObservable() {
    return this._expiredTokenObservable.asObservable();
  };

  set expiredTokenObservableData(value: boolean) {
    this._expiredTokenObservable.next(value);
  };

  // The following methods need a Header with 'Bearer' token, we used a interceptor for it.
  getSongs(): Observable<Song[]> {
    return this.http.get<SongsResponse>(`${this._baseAPISpotify}/browse/new-releases`)
              .pipe(
                map(resp => resp.albums.items)
              );
  };

  getArtistAndHisTopTrackList(artistID: string): Observable<[ArtistShort, TrackShort[]]> {
    return combineLatest([ this.getArtistByID(artistID), this.getArtistTopTrackList(artistID) ])
  };

  getSuggestionsByKeyword(keyword: string): Observable<Song[]> {
    return this.http.get<SuggestionsResponse>(`${this._baseAPISpotify}/search?q=${keyword}&type=track&limit=10`)
              .pipe(
                map(({ tracks }) => {
                  // Song-card component receives data of 'Song' type. For this reason I do this.
                  const suggestionShort: Song[] = tracks.items.map(item => item.album);

                  return suggestionShort;
                })
              );
  };

  private getArtistByID(artistID: string): Observable<ArtistShort> {
    return this.http.get<ArtistResponse>(`${this._baseAPISpotify}/artists/${artistID}`)
              .pipe(
                map(({ id, name, images, external_urls }) => {
                  const artistShort: ArtistShort = {
                    id,
                    name,
                    images,
                    external_urls
                  };

                  return artistShort;
                })
              );
  };

  private getArtistTopTrackList(artistID: string): Observable<TrackShort[]> {
    return this.http.get<TracksResponse>(`${this._baseAPISpotify}/artists/${artistID}/top-tracks?market=ES`)
              .pipe(
                map(({ tracks }) => {
                  const tracksShort: TrackShort[] = tracks.map(track => {
                    return {
                      id: track.id,
                      songName: track.name,
                      albumName: track.album.name,
                      images: track.album.images,
                      songURI: track.uri
                    }
                  });

                  return tracksShort;
                })
              );
  };
}
