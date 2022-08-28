import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng2-charts-demo';
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  socket = io('http://localhost:3000/vote');

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['🌮 VS 🍕'],
    datasets: [
      { data: [0], label: '🌮', backgroundColor: '#e2b538' },
      { data: [0], label: '🍕', backgroundColor: '#bf1f0d' },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,

    plugins: {
      title: {
        display: true,
        text: 'Taco vs Pizza',
        font: { size: 64 },
      },

      legend: {
        title: {
          font: {
            size: 24,
          },
        },
        labels: {
          font: {
            size: 48,
          },
        },
      },
    },
  };

  constructor() {
    this.socket.on('votesToClient', (votes) => {
      this.barChartData.datasets[0].data[0] = votes.taco;
      this.barChartData.datasets[1].data[0] = votes.pizza;
      this.chart?.update();
    });
  }

  startVote() {
    this.socket.emit('startVote');
  }

  voteTaco() {
    this.socket.emit('voteToServer', 'taco');
  }
  votePizza() {
    this.socket.emit('voteToServer', 'pizza');
  }
}
