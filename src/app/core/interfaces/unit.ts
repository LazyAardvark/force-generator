import { UnitType } from "../enums/unit-type"

export interface Unit {
    battleValue : number
    type: UnitType | String
    name: String
    id?: number
}
