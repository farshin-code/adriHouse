import { Component, ElementRef, ViewChild } from '@angular/core';
import { SearchService } from '../services/search.service';
import { result } from '../common/interfaces';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  results: result[] = [];
  searchBox:string = '';
  @ViewChild('search') search: ElementRef | undefined;
  constructor(private searchService: SearchService) {}

  iconToDisplay = 'search';
  messages=[
    {
        "role": "system",
        "content": "you are a database admin,your answer to questions should be only sql query, the table is : properties :  beds,baths,postedBy,imgPath,address,price,postedFor,city.",
    }
    
]
  onReset() {
    this.iconToDisplay = 'search';
    this.messages = [{
        "role": "system",
        "content": "you are a database admin,your answer to questions should be only sql query, the table is : properties :  beds,baths,postedBy,imgPath,address,price,postedFor,city.",
    }]
    this.searchBox = '';
    const inputElement: HTMLInputElement = this.search?.nativeElement;
          inputElement.focus();
          inputElement.placeholder = ' I\'m looking for 2 beds, 2 baths in GTA, with parking space. something around 4000 sqft.';
  }
  onSearch(searchText: string) {

    if (searchText) {

      this.messages.push({
        "role": "user",
        "content": this.messages.length === 1 ? `write a query for : ${searchText} ` : searchText
      })


      this.searchService.getSqlStatement(this.messages).subscribe({
        next:data =>{
          this.results = JSON.parse(data)['recordset']
          console.log("results in home", this.results)
          // this.results.forEach((element: any) => {
          //   console.log(element)
          // })
          this.iconToDisplay = 'reset'
          this.searchBox =''
          const inputElement: HTMLInputElement = this.search?.nativeElement;
          inputElement.focus();
          inputElement.placeholder = 'Continue your questions or press reset to start again';

        },
        error:err =>{
          console.log("oh my god", err)
          // this.loginError = true
        }
      })
    }

  }
}
