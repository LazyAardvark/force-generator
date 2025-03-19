import { UnitRollerEntity } from "../interfaces/unit-roller-entity";

export interface RolledRoster {
    name: string,
    rolledUnits: UnitRollerEntity[],
    battleValue: number,
  }
