import { Component, inject } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidenavService } from '../../../services/sidenav.service';
import { FeatureFlagDirective } from '../../../directives/feature-flag.directive';
import { RoleAuthDirective } from '../../../directives/role-auth.directive';


@Component({
  selector: 'fg-side-panel',
  imports: [MatListModule, MatIconModule, RouterLink, RouterLinkActive, FeatureFlagDirective, RoleAuthDirective ],
  templateUrl: './side-panel.component.html',
  styles: ''
})
export class SidePanelComponent {
  sidenavService = inject(SidenavService);
}
