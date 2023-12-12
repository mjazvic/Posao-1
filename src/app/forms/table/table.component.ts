import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() configuration: any[]=[];
  @Input() data: Observable<any[]>;

  constructor() { }

  ngOnInit(): void {}
}
