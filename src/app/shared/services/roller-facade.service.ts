import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Roster, RosterService } from '../../core/services/roster.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Roller, RollerService } from '../../core/services/roller.service';
import { RolledRoster } from '../../core/interfaces/rolled-roster';

@Injectable({
  providedIn: 'root'
})
export class RollerFacadeService {

  private rosterService = inject(RosterService);
  private rollerService = inject(RollerService)
  private rosters = toSignal(this.rosterService.get(), { initialValue: [] });
  private roster :  WritableSignal<Roster>;
  private rolledRoster :  WritableSignal<RolledRoster>;
  constructor (){
    this.roster = signal<Roster>(this.rosterService.getEmptyRoster());
    this.rolledRoster = signal<RolledRoster>({
      name: '',
      rolledUnits: [],
      battleValue: 0
    });
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
    this.rollTable();
  }
  rollTable() : void {
    this.rolledRoster.set(this.rollerService.rollRoster());
  }
  getRolledRosterSignal() : Signal<RolledRoster> {
    return this.rolledRoster;
  }
}
