import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { computed, inject, Injectable, OnDestroy, signal, Signal, WritableSignal } from '@angular/core';
import { distinctUntilChanged, Subject, takeUntil, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService implements OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);
  private destroy$ = new Subject<void>();
  readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, '(min-width: 500px)'])
    .pipe(
      //tap(value => console.log(value)),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    );

  private _isHandset: WritableSignal<boolean> = signal(false);
  public isHandset : Signal<boolean> = this._isHandset.asReadonly();
  private _isTablet: WritableSignal<boolean> = signal(false);
  public isTablet : Signal<boolean> = this._isTablet.asReadonly();
  private _isWeb: WritableSignal<boolean> = signal(false);
  public isWeb: Signal<boolean> = computed(() => !this._isTablet() && !this.isHandset());
  public isMobile: Signal<boolean> = computed(() => this._isTablet() || this.isHandset());
  private _currentBreakpoint: WritableSignal<string> = signal('Unknown');
  public currentBreakpoint : Signal<string> = this._currentBreakpoint.asReadonly();

  constructor() {
    this.breakpoint$
      .subscribe(() => {
        this.breakpointChecks()
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private breakpointChecks(): void {
    this._isHandset.set(!!this.breakpointObserver.isMatched(Breakpoints.Tablet));
    this._isTablet.set(!!this.breakpointObserver.isMatched(Breakpoints.Handset));
    this._isWeb.set(!!this.breakpointObserver.isMatched(Breakpoints.Web));
    if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
      this._currentBreakpoint.set('Handset');
    } else if (this.breakpointObserver.isMatched(Breakpoints.Tablet)) {
      this._currentBreakpoint.set('Tablet');
    } else if (this.breakpointObserver.isMatched(Breakpoints.Web)) {
      this._currentBreakpoint.set('Web');
    } else {
      this._currentBreakpoint.set('Unknown');
    }
  }
}