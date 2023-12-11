import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() columns: any[] = [];
  @Input() data: Observable<any[]>;
  @Output() outAction:any=new EventEmitter<any>();
  @Input() rowDetails: Observable<any[]>;
  @Input() actionId:any;
  column:any;
  newId:any;
  selectedValue: any;

  expandedRows: Set<any> = new Set<any>();


  constructor() { }

  ngOnInit(): void {
  }


  action(id){
    this.outAction.emit(id)
    console.log("This is id:",this.newId)
  }
    findId(){
      for (const column of this.columns) {
        if (column.header === 'id') {
          this.newId=column.field;
        }
      }
}



}
