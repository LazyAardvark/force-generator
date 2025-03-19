import { Component } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'fg-side-panel',
  imports: [MatListModule, MatIconModule],
  templateUrl: './side-panel.component.html',
  styles: ''
})
export class SidePanelComponent {

}
