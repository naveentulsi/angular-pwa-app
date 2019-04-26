import { Injectable } from '@angular/core';
import { Userdata } from '../../interfaces/userdata';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { StaticService } from '../static/static.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _httpClient: HttpClient) { }

  public login<T>(loginData: Userdata): Observable<T> {
    const serverURL = StaticService.getServerURLFor('auth');
    return this._httpClient.post(serverURL, loginData, {
      responseType: 'text'
    }).pipe(
      catchError((err: HttpErrorResponse, caught: Observable<any>) => {
        return Observable.create(function (fallback: Observer<string>) {
          fallback.next('Unable to Login now.');
        });
      })
    );
  }

}
