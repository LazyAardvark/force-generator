import { Component, inject } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { SidenavService } from '../../../services/sidenav.service';

@Component({
  selector: 'fg-header',
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './header.component.html',
  styles: ''
})
export class HeaderComponent {
  sidenavService = inject(SidenavService);
}
