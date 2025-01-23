import { Component, Input, Signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Roster } from '../../../../core/services/roster.service';


@Component({
  selector: 'fg-roster-table',
  imports: [MatTableModule],
  templateUrl: './roster-table.component.html',
  styles: ""
})
export class RosterTableComponent {
  displayedColumns: string[] = ['name', 'variant', 'tonnage', 'battlevalue'];
  @Input() dataSource!: Signal<Roster>;
}
