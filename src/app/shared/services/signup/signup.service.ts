import { Injectable } from '@angular/core';
import { Singupdata } from '../../interfaces/singupdata';
import { HttpClient } from '@angular/common/http';
import { StaticService } from '../static/static.service';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private _httpClient: HttpClient) { }

  signup(signUpData: Singupdata) {
    const serverURL = StaticService.getServerURLFor('signup');
    return this._httpClient.post(serverURL, signUpData, {responseType: 'text'});
  }
}
