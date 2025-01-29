import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Roster, RosterService } from '../../core/services/roster.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Roller, RollerService } from '../../core/services/roller.service';

@Injectable({
  providedIn: 'root'
})
export class RollerFacadeService {

  private rosterService = inject(RosterService);
  private rollerService = inject(RollerService)
  private rosters = toSignal(this.rosterService.get(), { initialValue: [] });
  private roster :  WritableSignal<Roster>;
  constructor (){
    this.roster = signal<Roster>(this.rosterService.getEmptyRoster());
  }

  getRosters(): Roster[] {
    return this.rosters();
  }
  getRostersSignal(): Signal<Roster[]> {
    return this.rosters;
  }

  setRoster(newRoster : Roster){
      this.roster.set(newRoster);
  }
  getRoster(): Roster {
    return this.roster();
  }
  getRosterSignal(): Signal<Roster> {
    return this.roster;
  }
  updateRollerTable(formValues : any ) : void { 
    let formRoller : Roller = {
      selectionRoster: this.roster(),
      battleValue: formValues.battleValue,
      battleValueTolerance: formValues.battleValueTolerance,
      baseGunnerySkill: formValues.baseGunnerySkill,
      basePilotingSkill: formValues.basePilotingSkill,
      allowOfficers: formValues.allowOfficers,
      allowDuplicates: formValues.allowDuplicates,
    }
    this.rollerService.setRoller(formRoller);
    this.rollerService.setRollTable();
    this.rollerService.rollRoster();
  }
  rollTable() : any {
    return this.rollerService.getRollTable();
  }
}
