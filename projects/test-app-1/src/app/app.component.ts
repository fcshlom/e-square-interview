import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'projects/logging-lib/src/lib/services/logger.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'test-app-1';
  constructor(private loggerService: LoggerService, private http: HttpClient) {}

  ngOnInit(): void {
    const url = 'Some wrong url for test purpose';
    this.http.get(url).pipe(take(1)).subscribe();
    setTimeout(() => {
      throw Error('test error1');
    }, 6000);
  }
}
