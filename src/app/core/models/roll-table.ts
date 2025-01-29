import { Injectable } from "@angular/core";
import { Unit } from "../interfaces/unit";


export interface UnitRollerEntity {
    unit : Unit,
    gunnerySkill : number,
    pilotSkill : number
}

export interface RolledRoster {
  name: string,
  rolledUnits: UnitRollerEntity[],
  battleValue: number,
}

@Injectable({
  providedIn: 'root'
})

export class RollTable {
  private rollTable: UnitRollerEntity[] = [];

  getRollTable(): UnitRollerEntity[] {
    return this.rollTable;
  }
  setRollTable(rollTable: UnitRollerEntity[]): void {
    this.rollTable = rollTable;
  }
}

