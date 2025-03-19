import { Component, Input, Signal } from '@angular/core';
import { RolledRoster } from '../../../../core/interfaces/rolled-roster';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'fg-rolled-roster',
  imports: [MatTableModule],
  templateUrl: './rolled-roster.component.html'
})
export class RolledRosterComponent {
  displayedColumns: string[] = ['name', 'variant', 'gunnerySkill', "pilotSkill", 'battlevalue'];
  @Input() dataSource!: Signal<RolledRoster>;
}
