import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { SongsService } from '../../modules/songs/services/songs.service';

@Injectable()
export class SongInterceptor implements HttpInterceptor {

  private _spotifyToken: string = environment.spotifyToken;

  constructor(private songsService: SongsService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const clonedRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this._spotifyToken}`)
    });

    return next.handle(clonedRequest)
               .pipe(
                 catchError((err: HttpErrorResponse) => {
                   this.songsService.expiredTokenObservableData = true;
                   return throwError(err)
                 })
               );
  };
}
