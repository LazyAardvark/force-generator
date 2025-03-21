import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'fg-main-content',
  imports: [RouterOutlet, ],
  templateUrl: './main-content.component.html',
  styles: 'main{margin:2rem}'
})
export class MainContentComponent {
  title = 'routing-app';
}
