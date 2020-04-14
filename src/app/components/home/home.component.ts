import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {interval, Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public marketSummeries;
  public filteredData; // : Subject<Array<any>>;
  public marketArray = [ 'USD-ETH', 'USD-BSV', 'USD-USDT', 'USD-LINK'];
/*'USD-BTC',*/

  // object contains the name,centures of the cricketers this is the data we will use to draw the chart
  cricketersInfo;
  // meta Info object holds lot of properties describes the title and color and othe meta info for chart
  metaInfo;

  constructor(private dataService: DataService) {
    this.getMarketsSummery();

    // adding data
    this.cricketersInfo = [
      {name: 'Sachin T', centuries: 49},
      {name: 'Kohli  V', centuries: 43},
      {name: 'Rohit  S', centuries: 28},
      {name: ' Ganguly ', centuries: 22},
      {name: 'Dhawan', centuries: 17},
    ];

    // Metadata for the chart like width and height of the chart, Title for the chart, Title color etc..
    this.metaInfo = {
      chartWidth: '800',
      chartHeight: '800',
      title: 'Indian cricketers with Most Centuries',
      titleColor: 'white',
      titleFont: '20px sans-serif',
      columnTitleColor: 'white',
      columnFont: '12px sans-serif',
      footerTitle: 'Cricketer',
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
    // this.filteredData = new Subject<Array<any>>();
    if (this.marketSummeries) {
      this.filteredData = this.marketSummeries.filter( x => this.marketArray.map(y => y).includes(x.MarketName));
      // this.filteredData.next(this.marketSummeries.filter( x => this.marketArray.map(y => y).includes(x.MarketName))) ;
      console.log('Filtered data', this.filteredData);
    }
  }

}
