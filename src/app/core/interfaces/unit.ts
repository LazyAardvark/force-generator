import { UnitType } from "../enums/unit-type"

export interface Unit {
    battleValue : number
    type: UnitType
    name: String
    id: number
}
