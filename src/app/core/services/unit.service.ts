import { Injectable } from '@angular/core';
import { AbstractDataService } from './abstract-data.service';
import { Unit } from '../interfaces/unit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class UnitService<T> extends AbstractDataService<Unit> {
}
