import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private _isOpen: WritableSignal<boolean> = signal(false);
  public isOpen : Signal<boolean> = this._isOpen.asReadonly();

  toggle() : void  {
    this._isOpen.set(!this._isOpen());
  }

  open() : void  {
    this._isOpen.set(true);
  }

  close() : void {
    this._isOpen.set(false);
  }
}
