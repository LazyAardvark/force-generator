import { Component, inject, Signal } from '@angular/core';
import { RolledRoster } from '../../../../core/interfaces/rolled-roster';
import { RollerFacadeService } from '../../../services/roller-facade.service';
import { RolledRosterComponent } from "../rolled-roster/rolled-roster.component";

@Component({
  selector: 'fg-rolled-roster-container',
  imports: [RolledRosterComponent],
  templateUrl: './rolled-roster-container.component.html'
})
export class RolledRosterContainerComponent {
    
      private rollerFacade = inject(RollerFacadeService);
      rolledRoster : Signal<RolledRoster> = this.rollerFacade.getRolledRosterSignal();
}
