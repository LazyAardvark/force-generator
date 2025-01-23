import { inject, Injectable } from '@angular/core';
import { Roster, RosterService } from './roster.service';

export interface Roller {
  selectionRoster: Roster,
  battleValue: number,
  battleValueTolerance?: number,
  baseGunnerySkill: number,
  basePilotingSkill: number,
  allowOfficers: boolean,
  allowDuplicates: boolean,
  rolledRoster ?: Roster
}

@Injectable({
  providedIn: 'root'
})

export class RollerService {

  private rosterService = inject(RosterService);
  
  getEmptyRoller(){
    return {
      selectionRoster: this.rosterService.getEmptyRoster() ,
      battleValue: 0,
      battleValueTolerance: 0,
      baseGunnerySkill: 4,
      basePilotingSkill: 5,
      allowOfficers: false,
      allowDuplicates: false,
    }
  }
}
