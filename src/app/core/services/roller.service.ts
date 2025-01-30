import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Roster, RosterService } from './roster.service';
import { RollTable } from '../models/roll-table';
import { RolledRoster } from '../interfaces/rolled-roster';

export interface Roller {
  selectionRoster: Roster,
  battleValue: number,
  battleValueTolerance: number,
  baseGunnerySkill: number,
  basePilotingSkill: number,
  allowOfficers: boolean,
  allowDuplicates: boolean,
}

@Injectable({
  providedIn: 'root'
})

export class RollerService {

  private rosterService = inject(RosterService);
  private rollTable = inject(RollTable);
  private rollerConfig: WritableSignal<Roller>;
  private roster: WritableSignal<Roster>;
  private rolledRoster: WritableSignal<RolledRoster>;

  constructor() {
    this.rollerConfig = signal<Roller>(this.getEmptyRoller());
    this.roster = signal<Roster>({ name: "None", mechs: [] });
    this.rolledRoster = signal<RolledRoster>({ name: "None", rolledUnits: [], battleValue: 0 });
  }

  getEmptyRoller(): Roller {
    return {
      selectionRoster: this.rosterService.getEmptyRoster(),
      battleValue: 0,
      battleValueTolerance: 0,
      baseGunnerySkill: 4,
      basePilotingSkill: 5,
      allowOfficers: false,
      allowDuplicates: false,
    }
  }
  getRoller(): Signal<Roller> {
    return this.rollerConfig;
  }

  setRoller(formRoller: Roller) {
    this.rollerConfig.set(formRoller);
    this.setRollTable();
  }

  getRoster(): Signal<Roster> {
    return this.roster;
  }

  setRoster(roster: Roster) {
    this.roster.set(roster);
  }

  getRolledRoster(): Signal<RolledRoster> {
    return this.rolledRoster;
  }

  setRolledRoster(rolledRoster: RolledRoster) {
    this.rolledRoster.set(rolledRoster);
  }

  private setRollTable(): void {
    this.rollTable.setRollTable(this.rollerConfig());
  }

  rollRoster(): RolledRoster {
    return this.rollTable.rollRoster(this.rollerConfig());
  }

}
