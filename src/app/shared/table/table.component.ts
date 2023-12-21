import {Component, Input, OnInit} from '@angular/core';


export interface TableAttribute{
  width?:number;
}
export interface TableColumn {
  type: 'column' | 'action' | 'exData' | 'bind';
  header: string;
  field?: string;
  field3?: string;
  field1?: string;
  field2?: string;
  format?:string;
  grant?: boolean;
  checkField?: string;
  action?: (row: any) => void;
  image?: string;
  tableWidth?:number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() columnConfiguration: any[]=[];
  @Input() attributeConfiguration:any;
  @Input() data: any[]=[];


  constructor() { }

  ngOnInit(): void {}
  public getRowId(index: number, row: any): any {
    return row.id;
  }


}
