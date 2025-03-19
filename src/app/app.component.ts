import { Component, inject} from '@angular/core';
import { FooterComponent } from "./shared/components/layout/footer/footer.component";
import { HeaderComponent } from './shared/components/layout/header/header.component';
import { MainContentComponent } from './shared/components/layout/main-content/main-content.component';
import { SidePanelComponent } from './shared/components/layout/side-panel/side-panel.component';
import { MatSidenavModule}  from '@angular/material/sidenav';
import { BreakpointService } from './shared/services/breakpoint.service';
import { SidenavService } from './shared/services/sidenav.service';

@Component({
  selector: 'fg-root',
  imports: [FooterComponent, HeaderComponent, MainContentComponent, SidePanelComponent, MatSidenavModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  currentScreenSize: any;
  breakpointService = inject(BreakpointService);
  sidenavService = inject(SidenavService);

  constructor(){
  }
}