import { Component, inject } from '@angular/core';
import { RolledRosterContainerComponent } from "../../roster/rolled-roster-container/rolled-roster-container.component";
import { RollerFacadeService } from '../../../services/roller-facade.service';

@Component({
  selector: 'fg-roller-output',
  imports: [RolledRosterContainerComponent],
  templateUrl: './roller-output.component.html'
})
export class RollerOutputComponent {

}
