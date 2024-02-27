import { Component,Input,OnChanges } from '@angular/core';
import { result } from '../common/interfaces';
@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrl: './result-item.component.css'
})
export class ResultItemComponent implements OnChanges {
@Input('result') result: result=<result>{};

  constructor() {}

  ngOnChanges() {
    console.log(this.result)
  }
}
