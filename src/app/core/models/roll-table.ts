import { Unit } from "../interfaces/unit";


export interface UnitRollerEntity {
    unit : Unit,
    gunnerySkill : number,
    pilotSkill : number
}

export class RollTable {
  roster: UnitRollerEntity[] = [];
}
