import { inject, Injectable } from "@angular/core";
import { Unit } from "../interfaces/unit";
import { Roller } from "../services/roller.service";
import { UnitRollerFactory } from "../services/unit-roller-factory";
import { UnitRollerEntity } from "../interfaces/unit-roller-entity";
import { RolledRoster } from "../interfaces/rolled-roster";

@Injectable({
  providedIn: 'root'
})

export class RollTable {
  private unitRollerFactory = inject(UnitRollerFactory);
  private rollTable: UnitRollerEntity[] = [];
  private maxBv: number = 0;

  setRollTable(rollerConfig : Roller): void {
    const unitRoster: Unit[] = rollerConfig.selectionRoster.mechs;
    this.maxBv = this.getMaxBv(rollerConfig);
    for (let x in unitRoster) {
      let additions: UnitRollerEntity[] = [];
      let unit: UnitRollerEntity;
      if (rollerConfig.allowOfficers) {
        unit = this.createUnitForRollTable(unitRoster[x], rollerConfig.baseGunnerySkill - 1, rollerConfig.basePilotingSkill - 1)
        additions.push(unit);
      }
      unit = this.createUnitForRollTable(unitRoster[x], rollerConfig.baseGunnerySkill, rollerConfig.basePilotingSkill)
      additions.push(unit);
      for (let y in additions) {
        if (additions[y].unit.battleValue < this.maxBv)
          this.rollTable.push(additions[y]);
      }
    }
  }

  rollRoster(rollerConfig : Roller): RolledRoster {
    let tempRollTable = this.rollTable;
    let newRoster: RolledRoster = {
      name: '',
      rolledUnits: [],
      battleValue: 0
    };
    let maxBv: number = this.maxBv;
    while (newRoster.battleValue < maxBv) {
      let unit: UnitRollerEntity = this.getUnitFromRollTable(tempRollTable);
      console.log(tempRollTable)
      if ((newRoster.battleValue + unit.adjustedBattleValue) < maxBv) {
        newRoster.rolledUnits.push(unit);
        if(!rollerConfig.allowDuplicates){
          tempRollTable = this.pruneRollRosterDuplicate(tempRollTable, unit.unit.name);
        }
        newRoster.battleValue = newRoster.battleValue + unit.adjustedBattleValue;
      }
      tempRollTable = this.pruneRollRosterbyBv(tempRollTable, maxBv - newRoster.battleValue);
      if (tempRollTable.length == 0) {
        break;
      }
    }
    console.log(newRoster);
    return newRoster;
  }

  private pruneRollRosterDuplicate(rollTable : UnitRollerEntity[], name: String):  UnitRollerEntity[] {
    let newRoster: UnitRollerEntity[] = rollTable;
    newRoster.forEach((unit, index) => {
      if (unit.unit.name == name) {
        newRoster.splice(index, 1);
      }
    });
    return newRoster;
  }

  private pruneRollRosterbyBv(rollTable : UnitRollerEntity[], maxBv: number):  UnitRollerEntity[] {
    let newRoster: UnitRollerEntity[] = rollTable;
    newRoster.forEach((unit, index) => {
      if (unit.adjustedBattleValue > maxBv) {
        newRoster.splice(index, 1);
      }
    });
    return newRoster;
  }

  private createUnitForRollTable(unit : Unit, gunnery : number, piloting : number) : UnitRollerEntity {
    return this.unitRollerFactory.getUnitRollerEntity(unit, gunnery, piloting)
  }

  private getUnitFromRollTable(rollTable : UnitRollerEntity[] ): UnitRollerEntity {
    const randomIndex = Math.floor(Math.random() * (rollTable.length));
    const unit : UnitRollerEntity = rollTable[randomIndex];
    return unit;
  }
  
  private getMaxBv(rollerConfig: Roller): number {
    return rollerConfig.battleValueTolerance ? (rollerConfig.battleValue + Math.abs(rollerConfig.battleValueTolerance)) : rollerConfig.battleValue;
  }

}

