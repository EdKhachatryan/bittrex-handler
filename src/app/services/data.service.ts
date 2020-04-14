import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getMarketSummaries(): Observable<any> {
    return this.http.get(environment.api.base + environment.api.public + 'getmarketsummaries');
  }

  getmarkets(): Observable<any> {
    return this.http.get(environment.api.base + environment.api.public + 'getmarkets');
  }

  getticker(): Observable<any> {
    return this.http.get('https://api.bittrex.com/api/v1.1/public/getticker?market=BTC-USDS');
  }
}
