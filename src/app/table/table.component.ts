// table.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() columns: string[] = [];
  @Output() toggleDetails: EventEmitter<string> = new EventEmitter();

  selectedRowId: string | null = null;

  onRowClick(row: any): void {
    this.selectedRowId = row.id;
    this.toggleDetails.emit(row.id);
  }

  isSelectedRow(row: any): boolean {
    return this.selectedRowId === row.id;
  }
}
