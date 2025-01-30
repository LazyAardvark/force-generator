import { UnitRollerEntity } from "../services/unit-roller-factory";

export interface RolledRoster {
    name: string,
    rolledUnits: UnitRollerEntity[],
    battleValue: number,
  }
