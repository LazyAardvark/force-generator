import { inject, Injectable } from "@angular/core";
import { Unit } from "../interfaces/unit";
import { Roller } from "../services/roller.service";
import { UnitRollerEntity, UnitRollerFactory } from "../services/unit-roller-factory";
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

  rollRoster(): RolledRoster {
    let newRoster: RolledRoster = {
      name: '',
      rolledUnits: [],
      battleValue: 0
    };
    let maxBv: number = this.maxBv;
    while (newRoster.battleValue < maxBv) {
      let unit: UnitRollerEntity = this.getUnitFromRollTable();
      if ((newRoster.battleValue + unit.adjustedBattleValue) < maxBv) {
        newRoster.rolledUnits.push(unit);
        newRoster.battleValue = newRoster.battleValue + unit.adjustedBattleValue;
      }
      this.pruneRollRoster(maxBv - newRoster.battleValue);
      if (this.rollTable.length == 0) {
        break;
      }
    }
    console.log(newRoster);
    return newRoster;
  }

  private pruneRollRoster(maxBv: number): void {
    let newRoster: UnitRollerEntity[] = this.rollTable;
    newRoster.forEach((unit, index) => {
      if (unit.unit.battleValue > maxBv) {
        newRoster.splice(index, 1);
      }
    });
  }

  private createUnitForRollTable(unit : Unit, gunnery : number, piloting : number) : UnitRollerEntity {
    return this.unitRollerFactory.getUnitRollerEntity(unit, gunnery, piloting)
  }

  private getUnitFromRollTable(): UnitRollerEntity {
    const randomIndex = Math.floor(Math.random() * (this.rollTable.length));
    const unit : UnitRollerEntity = this.rollTable[randomIndex];
    return unit;
  }
  
  private getMaxBv(rollerConfig: Roller): number {
    return rollerConfig.battleValueTolerance ? (rollerConfig.battleValue + Math.abs(rollerConfig.battleValueTolerance)) : rollerConfig.battleValue;
  }

}

