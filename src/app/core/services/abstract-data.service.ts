import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractDataService<T> {

  abstract get(): Observable<T[]>;

 
  abstract getById(id: string): Observable<T>;


  abstract create(item: T): Observable<T>;


  abstract update(id: string, item: T): Observable<T>;


  abstract delete(id: string): Observable<void>;

}
