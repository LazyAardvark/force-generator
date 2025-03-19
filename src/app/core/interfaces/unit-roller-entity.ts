import { Unit } from "./unit";

export interface UnitRollerEntity {
    unit: Unit;
    gunnerySkill: number;
    pilotSkill: number;
    adjustedBattleValue: number;
}