import { Component,Input,OnChanges } from '@angular/core';
import { result } from '../common/interfaces';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrl: './result-list.component.css'
})
export class ResultListComponent implements OnChanges {
@Input('results') results: result[] = [];

  constructor() {}
  
  ngOnChanges() {
    console.log(this.results)
  }

  
}
