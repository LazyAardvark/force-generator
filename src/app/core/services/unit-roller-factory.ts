import { inject, Injectable } from "@angular/core";
import { Unit } from "../interfaces/unit"
import { BattleValueService } from "./battle-value.service";
import { UnitRollerEntity } from "../interfaces/unit-roller-entity";

@Injectable({
    providedIn: 'root'
  })
export class UnitRollerFactory {
    private battleValueService = inject(BattleValueService);
    constructor() {
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

