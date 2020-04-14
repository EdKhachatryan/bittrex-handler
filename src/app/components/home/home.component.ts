import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public marketSummeries;
  public filteredData;
  public marketArray = [ 'USD-BTC', 'USD-ETH', 'USD-BSV', 'USD-USDT', 'USD-LINK', ];
/*'USD-BTC',*/


  public metaInfo;

  constructor(private dataService: DataService) {
    this.getMarketsSummery();
    this.metaInfo = {
      chartWidth: '800',
      chartHeight: '500',
      title: 'Bittrex current market data by value',
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
      console.log(this.marketSummeries);
      this.filterData();
    });
  }

  filterData() {
    if (this.marketSummeries) {
      this.filteredData = this.marketSummeries.filter( x => this.marketArray.map(y => y).includes(x.MarketName));
      console.log('Filtered data', this.filteredData);
    }
  }

}
