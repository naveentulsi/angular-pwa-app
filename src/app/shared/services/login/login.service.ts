import { Injectable } from '@angular/core';
import { Userdata } from '../../interfaces/userdata';
import { catchError } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, Observer } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _httpClient: HttpClient) { }

  public login<T>(loginData: Userdata): Observable<T> {
    let serverURL = "";
    let requestBody;
    try {
      requestBody = JSON.stringify(loginData);
    } catch (e) {
      console.log(' to parse data');
      return Observable.create(function(fallback: Observer<string>) {
        fallback.next(" to Login now.");
      })
    }
    return this._httpClient.post(serverURL, requestBody, {
      responseType: 'text'
    }).pipe(
      catchError((err: HttpErrorResponse, caught: Observable<any>) => {
        return Observable.create(function(fallback: Observer<string>) {
          fallback.next("Unable to Login now.");
        })
      })
    );
  }

}
