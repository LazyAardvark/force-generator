import { Component, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderDirective } from '../../../directives/loader.directive';

@Component({
  selector: 'fg-main-content',
  imports: [RouterOutlet, LoaderDirective],
  templateUrl: './main-content.component.html',
  styles: 'main{margin:2rem}'
})
export class MainContentComponent {
  title = 'routing-app';
  loaded : Signal<boolean> = signal(true);
}
