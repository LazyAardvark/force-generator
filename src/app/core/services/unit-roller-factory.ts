import { inject, Injectable } from "@angular/core";
import { Unit } from "../interfaces/unit"
import { BattleValueService } from "./battle-value.service";

export interface UnitRollerEntity {
    unit: Unit;
    gunnerySkill: number;
    pilotSkill: number;
    adjustedBattleValue: number;
}

@Injectable({
    providedIn: 'root'
  })
export class UnitRollerFactory {
    constructor(private battleValueService: BattleValueService) {
    }
    getUnitRollerEntity(unit : Unit, gunnerySkill : number, pilotSkill: number): UnitRollerEntity {
        return {
            unit: unit,
            gunnerySkill : gunnerySkill,
            pilotSkill : pilotSkill,
            adjustedBattleValue : this.battleValueService.calculateBattleValueSkill(gunnerySkill, pilotSkill, unit.battleValue)
        }
    }
};
