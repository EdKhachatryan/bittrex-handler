import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {interval, Observable, of, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {MarketModel} from '../../models/market.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public marketSummeries;
  public markets$: Observable<Array<MarketModel>>;
  public filteredData;
  public marketArray = [ 'USD-BTC', 'USD-ETH', 'USD-BSV', 'USD-USDT', 'USD-LINK', 'USD-DASH', 'USD-DCR'];
/* */


  public metaInfo;

  constructor(private dataService: DataService) {
    this.getMarkets();
    this.getMarketsSummery();
    this.metaInfo = {
      chartWidth: (this.marketArray.length * 100 + 150),
      chartHeight: '500',
      title: '',
      titleColor: 'white',
      titleFont: '20px sans-serif',
      columnTitleColor: 'white',
      columnFont: '12px sans-serif',
      footerTitle: '',
      footerColor: '#c1d0cd',
      footerFont: '12px sans-serif',
      leftaxisColor: '#c1d0cd',
      leftaxisFont: '12px sans-serif',
    };


  }

  ngOnInit( ) {
    this.subscription = interval(5000).subscribe(() => {
      this.getMarketsSummery();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getMarketsSummery() {
    this.dataService.getMarketSummaries().subscribe(data => {
      this.marketSummeries = data.result;
      // console.log(this.marketSummeries);
      this.filterData();
    });
  }

  getMarkets() {
    this.markets$ = this.dataService.getmarkets().pipe(map(res => res.result));
  }

  addSerries(marketName) {
    this.marketArray.push(marketName);
    this.metaInfo.chartWidth = (this.marketArray.length * 100 + 150)
    console.log('array after push ', this.marketArray);
    console.log('meta info after push ', this.metaInfo);
    this.getMarketsSummery();
  }

  filterData() {
    if (this.marketSummeries) {
      this.filteredData = this.marketSummeries.filter( x => this.marketArray.map(y => y).includes(x.MarketName));
      console.log('Filtered data', this.filteredData);
    }
  }

}
