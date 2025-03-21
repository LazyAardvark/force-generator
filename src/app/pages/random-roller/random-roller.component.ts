import { Component } from '@angular/core';
import { RollerOutputComponent } from "../../shared/components/forms/roller-output/roller-output.component";
import { RollerSetupComponent } from "../../shared/components/forms/roller-setup/roller-setup.component";

@Component({
  selector: 'fg-random-roller',
  imports: [RollerOutputComponent, RollerSetupComponent],
  templateUrl: './random-roller.component.html'
})
export class RandomRollerComponent {

}
