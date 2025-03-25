import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from '../interfaces/can-component-deactivate';

export const SaveGuard: CanDeactivateFn<CanComponentDeactivate> = (component: CanComponentDeactivate, currentRoute, currentState, nextState) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};


/**
 * {
  path: 'edit-profile',
  component: EditProfileComponent,
  canDeactivate: [PendingChangesGuard]
}
 */