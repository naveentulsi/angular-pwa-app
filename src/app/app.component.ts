import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private swUpdate: SwUpdate) {
    this.swUpdate.available.subscribe(() => {
      if (confirm('Update PWA to new version ?')) {
        window.location.reload();
      }
    });
  }

  title = 'angular-pwa-app';
  ngOnInit(): void {
  }
}
