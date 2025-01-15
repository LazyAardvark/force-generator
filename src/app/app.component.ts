import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/components/layout/footer/footer.component";
import { HeaderComponent } from './shared/components/layout/header/header.component';
import { MainContentComponent } from './shared/components/layout/main-content/main-content.component';
import { SidePanelComponent } from './shared/components/layout/side-panel/side-panel.component';

@Component({
  selector: 'fg-root',
  imports: [FooterComponent, HeaderComponent, MainContentComponent, SidePanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
