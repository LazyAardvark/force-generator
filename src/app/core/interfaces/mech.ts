import { MechType } from "../enums/mech-type";
import { Role } from "../enums/role";
import { UnitClass } from "../enums/unit-class";
import { Unit } from "./unit";

export interface Mech extends Unit{
    variant: string,
    tonnage: number;
    mechtype?: MechType;
    class?: UnitClass
    role?: Role,
}
