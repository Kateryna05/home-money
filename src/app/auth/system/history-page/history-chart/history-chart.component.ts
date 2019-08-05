import { Component, Input } from '@angular/core';

@Component({
  selector: 'wfm-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent{
 
  @Input() data;

  colorScheme = {
    domain: ['#85D2ED', '#2FB7E4', '#0093C4', '#2FB7E4', '#85D2ED','#0093C4']
  };

}
