import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  // getting the cricketers Information
  @Input() chartData;

  // getting the chart Meta data
  @Input() chartMetaInfo;

  changeLog: string[] = [];
  context;

  constructor() {
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    // setting up the inital Context, Get the canvas element
    const canvas = document.getElementById('chart') as HTMLCanvasElement;
    // getContext will return the rendering context using it we can call the different methods and properties for creating shapes
    // we will be sending this context throught the methods to implement any drawing
    this.context = canvas.getContext('2d');
    // To set up the inital background color for the drawing area
    this.context.fillStyle = '#262a33';
    // fillRect will use the fillstyle color and starts from 0,0 position and draws a rectangle with the width and height provided in
    // metadata , This will set up the context will #262a33 backgound , on top of this we will start drawing.
    this.context.fillRect(0, 0, this.chartMetaInfo.chartWidth, this.chartMetaInfo.chartHeight);
    // The below 4 functions , contain the logic of drawing the chart I will be explaining them in Steps sections
    console.log('changes', changes.chartData.currentValue);
    this.drawBarChart(this.context, changes.chartData.currentValue);
    // this.drawBarChart(this.context, this.chartData);
    this.addTitleToChart(this.context);
    this.addFooterToChart(this.context);
    this.addHorizontalLines(this.context);


    // tslint:disable-next-line:forin
/*    for (const propName in changes) {
      const changedProp = changes[propName];
      const to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        const from = JSON.stringify(changedProp.previousValue);
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }
    this.changeLog.push(log.join(', '));*/
  }

  ngOnInit() {
    // setting up the inital Context, Get the canvas element
    const canvas = document.getElementById('chart') as HTMLCanvasElement;
    // getContext will return the rendering context using it we can call the different methods and properties for creating shapes
    // we will be sending this context throught the methods to implement any drawing
    this.context = canvas.getContext('2d');
    // To set up the inital background color for the drawing area
    this.context.fillStyle = '#262a33';
    // fillRect will use the fillstyle color and starts from 0,0 position and draws a rectangle with the width and height provided in
    // metadata , This will set up the context will #262a33 backgound , on top of this we will start drawing.
    this.context.fillRect(0, 0, this.chartMetaInfo.chartWidth, this.chartMetaInfo.chartHeight);
    // The below 4 functions , contain the logic of drawing the chart I will be explaining them in Steps sections
    this.drawBarChart(this.context, this.chartData);
    this.addTitleToChart(this.context);
    this.addFooterToChart(this.context);
    this.addHorizontalLines(this.context);

  }

  addTitleToChart(context) {
    context.font = this.chartMetaInfo.titleFont;
    context.fillStyle = this.chartMetaInfo.titleColor;
    context.fillText(this.chartMetaInfo.title, 100, 30);
  }

  addFooterToChart(context) {
    context.font = this.chartMetaInfo.footerFont;
    context.fillStyle = this.chartMetaInfo.footerColor;
    context.fillText(this.chartMetaInfo.footerTitle, this.chartMetaInfo.chartWidth / 2, this.chartMetaInfo.chartHeight - 10);
  }

  addColumnName(context, name, xpos, ypos) {
    context.font = this.chartMetaInfo.columnFont;
    context.fillStyle = this.chartMetaInfo.columnTitleColor;
    context.fillText(name, xpos, ypos);
  }

  addHorizontalLines(context) {
    context.font = this.chartMetaInfo.leftaxisFont;
    context.fillStyle = this.chartMetaInfo.leftaxisColor;

    for (let i = 0; i < 11; i++) {

      context.lineWidth = 0.5;
      context.beginPath();
      context.moveTo(25, (20 * i) + 40);
      context.lineTo(475, (20 * i) + 40);
      context.strokeStyle = this.chartMetaInfo.leftaxisColor;
      context.stroke();
    }
  }

  addColumnHead(context, name, xpos, ypos) {
    context.font = this.chartMetaInfo.columnFont;
    context.fillStyle = this.chartMetaInfo.columnTitleColor;
    context.fillText(name, xpos, ypos);
  }


  drawBarChart(context, chartData) {
    console.log('chart data in drowing', chartData);
    for (let cricketer = 0; cricketer < chartData.length; cricketer++) {
      context.fillStyle = '#36b5d8';
      const cricketerInfo = chartData[cricketer];
      context.fillRect(25 + cricketer * 100,
        this.chartMetaInfo.chartHeight - cricketerInfo.Bid * 2 - 60, 50,
        cricketerInfo.Bid * 2);
      this.addColumnName(context, cricketerInfo.MarketName, 25 + cricketer * 100, this.chartMetaInfo.chartHeight - 40);
      this.addColumnHead(context, cricketerInfo.Bid, 45 + cricketer * 100,
        this.chartMetaInfo.chartHeight - cricketerInfo.Bid * 2 - 65);
    }


  }
  /*
  drawBarChart(context) {
    console.log('chart data', this.chartData);
    for (let cricketer = 0; cricketer < this.chartData.length; cricketer++) {
      context.fillStyle = '#36b5d8';
      const cricketerInfo = this.chartData[cricketer];
      context.fillRect(25 + cricketer * 100,
        this.chartMetaInfo.chartHeight - cricketerInfo.centuries * 2 - 60, 50,
        cricketerInfo.centuries * 2);
      this.addColumnName(context, cricketerInfo.MarketName, 25 + cricketer * 100, this.chartMetaInfo.chartHeight - 40);
      this.addColumnHead(context, cricketerInfo.Bid, 45 + cricketer * 100,
        this.chartMetaInfo.chartHeight - cricketerInfo.centuries * 2 - 65);
    }


  }*/

}


/*
 for (let cricketer = 0; cricketer < this.chartData.length; cricketer++) {
      context.fillStyle = '#36b5d8';
      const cricketerInfo = this.chartData[cricketer];
      context.fillRect(25 + cricketer * 100,
        this.chartMetaInfo.chartHeight - cricketerInfo.centuries * 2 - 60, 50,
        cricketerInfo.centuries * 2);
      this.addColumnName(context, cricketerInfo.MarketName, 25 + cricketer * 100, this.chartMetaInfo.chartHeight - 40);
      this.addColumnHead(context, cricketerInfo.Bid, 45 + cricketer * 100,
        this.chartMetaInfo.chartHeight - cricketerInfo.centuries * 2 - 65);
    }
*/
