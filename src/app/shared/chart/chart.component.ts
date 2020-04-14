import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input() chartData;
  @Input() chartMetaInfo;


  public context;

  constructor() {
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.chartConfig(changes.chartData.currentValue);
  }

  ngOnInit() {
    this.chartConfig(this.chartData);
  }

  chartConfig(chartData) {
    const canvas = document.getElementById('chart') as HTMLCanvasElement;

    this.context = canvas.getContext('2d');

    this.context.fillStyle = '#262a33';

    this.context.fillRect(0, 0, this.chartMetaInfo.chartWidth, this.chartMetaInfo.chartHeight);

    this.drawBarChart(this.context, chartData);
    this.addTitleToChart(this.context);
    this.addFooterToChart(this.context);
    this.addHorizontalLines(this.context);
  }

  addTitleToChart(context) {
    context.font = this.chartMetaInfo.titleFont;
    context.fillStyle = this.chartMetaInfo.titleColor;
    context.fillText(this.chartMetaInfo.title, 250, 30);
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

    for (let i = 0; i < 21; i++) {

      context.lineWidth = 0.5;
      context.beginPath();
      context.moveTo(25, (20 * i) + 40);
      context.lineTo(775, (20 * i) + 40);
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
    for (let market = 0; market < chartData.length; market++) {
      context.fillStyle = '#36b5d8';
      const marketInfo = chartData[market];
      context.fillRect(25 + market * 100,
        this.chartMetaInfo.chartHeight - marketInfo.Bid / 100 * 5 - 60, 50,
        marketInfo.Bid / 100 * 5);
      this.addColumnName(context, marketInfo.MarketName, 25 + market * 100, this.chartMetaInfo.chartHeight - 40);
      this.addColumnHead(context, marketInfo.Bid, 28 + market * 100,
        this.chartMetaInfo.chartHeight - marketInfo.Bid / 100 * 5 - 65);
    }
  }

}

