import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import * as mockFlags from "../../../../data/feature-flags.json";

interface FeatureFlags {
  [key: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {
  private flags: FeatureFlags = {};
  private flags$ = new BehaviorSubject<FeatureFlags>({});
  private http : HttpClient = inject(HttpClient);
  public flagSignal : Signal<FeatureFlags> = signal(this.flags);

  constructor(){
    this.loadFlags()
  }
  private loadFlags() :void{
    if(environment.useMockData){
      this.flags = mockFlags;
      this.flags$.next(this.flags);
    }
    else this.http.get<FeatureFlags>('/assets/feature-flags.json').subscribe((flags) => {
        this.flags = flags;
        this.flags$.next(flags);
      });
  }
  isFeatureEnabled(feature: string): boolean {
    return !!this.flags[feature];
  }
  getFeatureflags(): Observable<FeatureFlags> {
    return this.flags$.asObservable();
  }
}
