import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() searchItem: object;
  sourcePlace: string;
  destPlace: string;
  numOfRequests: string;

  constructor() { }

  ngOnInit(): void {
    console.log('input data' + this.searchItem)
    if (this.searchItem) {
      this.sourcePlace = this.searchItem['source'];
      this.destPlace = this.searchItem['destination'];
      this.numOfRequests = this.searchItem['hits'];;
    }
  }

}
