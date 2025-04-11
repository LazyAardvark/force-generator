import { Injectable } from '@angular/core';
import { UnitClass } from '../enums/unit-class';
import { MechType } from '../enums/mech-type';
import { UnitType } from '../enums/unit-type';
import { Mech } from '../interfaces/mech';
import { Unit } from '../interfaces/unit';
import { Role } from '../enums/role';

@Injectable({
  providedIn: 'root'
})
export class UnitFactoryService {

  constructor() { }

  createUnit(unitType: string, params: any): Unit {
    let newUnit: Unit = this.getEmptyUnit();
    if (unitType === UnitType.battlemech) {
      newUnit = this.createMech(params)
    }
    return newUnit;
  }

  private createMech(params: any): Mech {
    return {
            battleValue : 0,
            type: UnitType.battlemech,
            name: '',
            variant: '',
            tonnage: 0,
            mechtype: MechType.battle,
            class: UnitClass.light,
            role: Role.scout
        }
  }

  private getEmptyUnit(): Unit {
    return {
      battleValue: 0,
      type: UnitType.battlemech,
      name: '',
    }
  }
}
