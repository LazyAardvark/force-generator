import { inject, Injectable } from '@angular/core';
import * as mockAgoacRoster from "../../../data/mocks/agoac.json";
import * as noneMockRoster from "../../../data/mocks/none.json";
import { AbstractDataService } from './abstract-data.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from "../../../environments/environment";
import { Unit } from '../interfaces/unit';


export interface Roster {
    name: String,
    mechs : Unit[]
}

@Injectable({
  providedIn: 'root'
})

export class RosterService extends AbstractDataService<Roster> {
  private readonly baseUrl = '/api/rosters';
  private readonly useMocks = environment.useMockData;
  private readonly mockData : Roster[] = [noneMockRoster, mockAgoacRoster, ]
  private http = inject(HttpClient);
  
  constructor() {
    super();
  }

  get(): Observable<Roster[]> {
    if(this.useMocks){
      return of(this.mockData);
    }
    return this.http.get<Roster[]>(this.baseUrl);
  }

  getById(id: string): Observable<Roster> {
    if(this.useMocks){
      return of(this.mockData[0]);
    }
    return this.http.get<Roster>(`${this.baseUrl}/${id}`);
  }

  create(item: Roster): Observable<Roster> {
    return this.http.post<Roster>(this.baseUrl, item);
  }

  update(id: string, item: Roster): Observable<Roster> {
    return this.http.put<Roster>(`${this.baseUrl}/${id}`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getEmptyRoster() : Roster {
    return {name : "", mechs : []}
  }
}

