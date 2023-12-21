import {Component, Input, OnInit} from '@angular/core';

export interface sortConfiguration {
  name:string;
  action: (row: any) => void;
  label?:string;
  value:string;
}
@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  @Input() configuration:any;
  public sort:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  public showSort():void{
    this.sort=!this.sort;
  }


}
