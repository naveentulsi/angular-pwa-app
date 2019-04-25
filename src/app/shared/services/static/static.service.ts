import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaticService {

  static serverURL = 'http://localhost:8081/rest/';

  constructor() { }

  public static getServerURL(): string {
    return StaticService.serverURL;
  }

  public static getServerURLFor(URI: string): string {
    const usr = StaticService.serverURL;
    const endPoint = usr.concat('/').concat(URI);
    return endPoint;
  }


}
