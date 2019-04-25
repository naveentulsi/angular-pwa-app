import { Injectable } from '@angular/core';
import { Singupdata } from '../../interfaces/singupdata';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { StaticService } from '../static/static.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private _httpClient: HttpClient) { }


  signup<T>(signUpData: Singupdata): Observable<T> {
    const serverURL = StaticService.getServerURLFor('auth');
    return this._httpClient.post(serverURL, signUpData).pipe(
      catchError((err: HttpErrorResponse, caught: Observable<any>) => {
        return Observable.create(function (fallback: Observer<string>) {
          fallback.next('Unable to signup now.');
        });
      })
    );
  }
}
