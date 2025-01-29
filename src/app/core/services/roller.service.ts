import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Roster, RosterService } from './roster.service';
import { RolledRoster, RollTable, UnitRollerEntity } from '../models/roll-table';
import { Unit } from '../interfaces/unit';

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

  getRollTable(): Signal<UnitRollerEntity[]> {
    return signal(this.rollTable.getRollTable());
  }

  setRollTable(): void {
    const unitRoster: Unit[] = this.rollerConfig().selectionRoster.mechs;
    const maxBV = this.getMaxBv();
    const rollTable: UnitRollerEntity[] = [];
    for (let x in unitRoster) {
      let additions: UnitRollerEntity[] = [];
      let unit: UnitRollerEntity;
      if (this.rollerConfig().allowOfficers) {
        //TODO add BV calculations
        unit = { unit: unitRoster[x], gunnerySkill: this.rollerConfig().baseGunnerySkill - 1, pilotSkill: this.rollerConfig().basePilotingSkill - 1 }
        additions.push(unit);
      }
      //TODO account for a range of skill values
      unit = { unit: unitRoster[x], gunnerySkill: this.rollerConfig().baseGunnerySkill, pilotSkill: this.rollerConfig().basePilotingSkill };
      additions.push(unit);
      for (let y in additions) {
        if (additions[y].unit.battleValue < maxBV)
          rollTable.push(additions[y]);
      }
    }
    this.rollTable.setRollTable(rollTable);
  }

  private getMaxBv(): number {
    let maxBV = 0;
    maxBV = this.rollerConfig().battleValueTolerance ? (this.rollerConfig().battleValue + Math.abs(this.rollerConfig().battleValueTolerance)) : this.rollerConfig().battleValue
    return maxBV;
  }

  rollRoster(): void {
    let newRoster: RolledRoster = {
      name: '',
      rolledUnits: [],
      battleValue: 0
    };
    let maxBv: number = this.getMaxBv();
    while (newRoster.battleValue < maxBv) {
      let unit: UnitRollerEntity = this.getUnitFromRoller();
      if ((newRoster.battleValue + unit.unit.battleValue) < maxBv) {
        newRoster.rolledUnits.push(unit);
        newRoster.battleValue = newRoster.battleValue + unit.unit.battleValue;
      }
      this.pruneRollRoster(maxBv - newRoster.battleValue);
      if (this.rollTable.getRollTable().length == 0) {
        break;
      }
    }
    console.log(newRoster)
    this.setRolledRoster(newRoster);
  }

  private getUnitFromRoller(): UnitRollerEntity {
    const randomIndex = Math.floor(Math.random() * (this.rollTable.getRollTable().length));
    const unit : UnitRollerEntity = this.rollTable.getRollTable()[randomIndex];
    return unit;
  }

  private pruneRollRoster(maxBv: number): void {
    let newRoster: UnitRollerEntity[] = this.rollTable.getRollTable();
    newRoster.forEach((unit, index) => {
      if (unit.unit.battleValue > maxBv) {
        newRoster.splice(index, 1);
      }
    });
    this.rollTable.setRollTable(newRoster)
  }
}
