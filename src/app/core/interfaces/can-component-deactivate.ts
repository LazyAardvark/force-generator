import { Observable } from "rxjs";

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
  }

  /**
   * export class EditProfileComponent implements CanComponentDeactivate {
  formDirty = true; // Example condition

  canDeactivate(): boolean {
    if (this.formDirty) {
      return confirm('You have unsaved changes! Do you really want to leave?');
    }
    return true;
  }
}
   */