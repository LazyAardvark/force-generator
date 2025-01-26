import { computed, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Roster, RosterService } from './roster.service';
import { RollTable, UnitRollerEntity } from '../models/roll-table';
import { Mech } from '../interfaces/mech';

export interface Roller {
  selectionRoster: Roster,
  battleValue: number,
  battleValueTolerance: number,
  baseGunnerySkill: number,
  basePilotingSkill: number,
  allowOfficers: boolean,
  allowDuplicates: boolean,
}

export interface RolledRoster {
  name: string,
  rolledUnits: UnitRollerEntity[],
  battleValue: number,
}

@Injectable({
  providedIn: 'root'
})

export class RollerService {

  private rosterService = inject(RosterService);
  private roller: WritableSignal<Roller>;
  private rollTable: WritableSignal<RollTable>;
  private rolledRoster: WritableSignal<Roster>;
  constructor() {
    this.roller = signal<Roller>(this.getEmptyRoller());
    this.rollTable = signal<RollTable>({ roster: [] });
    this.rolledRoster = signal<Roster>({ name: "None", mechs: [] });
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
    return this.roller;
  }

  getRollTable(): Signal<RollTable> {
    this.rollTable.set(this.createRollTable());
    console.log("Roller Signal is :");
    console.log(this.rollTable());
    return this.rollTable;
  }

  createRollTable(): RollTable {
    let rollTable: RollTable = new RollTable();
    let mechRoster: Mech[] = this.roller().selectionRoster.mechs;
    const maxBV = this.getMaxBv();

    for (let x in mechRoster) {
      let additions: any[] = [];
      let unit: UnitRollerEntity;
      if (this.roller().allowOfficers) {
        //TODO add BV calculations
        unit = { unit: mechRoster[x], gunnerySkill: this.roller().baseGunnerySkill - 1, pilotSkill: this.roller().basePilotingSkill - 1 }
        additions.push(unit);
      }
      //TODO account for a range of skill values
      unit = { unit: mechRoster[x], gunnerySkill: this.roller().baseGunnerySkill, pilotSkill: this.roller().basePilotingSkill };
      additions.push(unit);
      for (let y in additions) {
        if (additions[y].unit.battleValue < maxBV)
          rollTable.roster.push(additions[y]);
      }
    }
    console.log(rollTable);
    return rollTable;
  }

  updateRoller(formRoller: Roller) {
    this.roller.set(formRoller);
  }

  private getMaxBv(): number {
    let maxBV = 0;
    maxBV = this.roller().battleValueTolerance ? (this.roller().battleValue + Math.abs(this.roller().battleValueTolerance)) : this.roller().battleValue
    return maxBV;
  }

  getRolledRoster(): Signal<Roster> {
    return this.rolledRoster;
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
      if (this.rollTable().roster.length == 0) {
        break
      }
    }
    console.log(newRoster);

  }

  private getUnitFromRoller(): UnitRollerEntity {
    const randomIndex = Math.floor(Math.random() * this.rollTable().roster.length);
    return this.rollTable().roster[randomIndex];
  }

  private pruneRollRoster(maxBv: number): void {
    let newRoster: UnitRollerEntity[] = this.rollTable().roster;
    newRoster.forEach((unit, index) => {
      if (unit.unit.battleValue > maxBv) {
        newRoster.splice(index, 1);
      }
    });
    this.rollTable.set({
      roster: newRoster
    })
  }



}
