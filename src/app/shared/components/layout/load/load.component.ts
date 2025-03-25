import { Component } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'fg-load',
  imports: [MatProgressSpinnerModule],
  templateUrl: './load.component.html'
})
export class LoadComponent {}
