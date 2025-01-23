import { Component, inject, Signal } from '@angular/core';
import { RosterTableComponent } from "../roster-table/roster-table.component";
import { Roster } from '../../../../core/services/roster.service';
import { RollerFacadeService } from '../../../services/roller-facade.service';

@Component({
  selector: 'fg-roller-roster-container',
  imports: [RosterTableComponent],
  templateUrl: './roller-roster-container.component.html'
})
export class RollerRosterContainerComponent {

  private rollerFacade = inject(RollerFacadeService);
  roster : Signal<Roster> = this.rollerFacade.getRosterSignal();
 
}
