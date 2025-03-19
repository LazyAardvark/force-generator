import { UnitRollerEntity } from "../interfaces/unit-roller-entity";
import { UnitRollerFactory } from "./unit-roller-factory";

describe('UnitRollerEntity', () => {
  it('should create an instance', () => {
    expect(new UnitRollerFactory()).toBeTruthy();
  });
});
