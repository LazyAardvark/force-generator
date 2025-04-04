import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Mech } from '../interfaces/mech';

import * as mechsMockList from "../../../data/mocks/mechs.json";
import { UnitService } from './unit.service';
import { MechType } from '../enums/mech-type';
import { UnitClass } from '../enums/unit-class';
import { Role } from '../enums/role';
import { UnitType } from '../enums/unit-type';


@Injectable({
  providedIn: 'root'
})
export class MechService extends UnitService<Mech> {
  private readonly baseUrl = '/api/rosters';
  private readonly useMocks = environment.useMockData;
  private readonly mockData : Mech[] = mechsMockList; 
  private http = inject(HttpClient);
  
  constructor() {
    super();
  }
  get(): Observable<Mech[]> {
    if(this.useMocks){
      return of(this.mockData);
    }
    return this.http.get<Mech[]>(this.baseUrl);
  }

  getById(id: string): Observable<Mech> {
    if(this.useMocks){
      return of(this.mockData[0]);
    }
    return this.http.get<Mech>(`${this.baseUrl}/${id}`);
  }

  create(item: Mech): Observable<Mech> {
    return this.http.post<Mech>(this.baseUrl, item);
  }

  update(id: string, item: Mech): Observable<Mech> {
    return this.http.put<Mech>(`${this.baseUrl}/${id}`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getEmptyMech() : Mech {
    return{
        battleValue : 0,
        type: UnitType.battlemech,
        name: '',
        variant: '',
        tonnage: 0,
        mechtype: MechType.battle,
        class: UnitClass.light,
        role: Role.scout
    }
  }
}
