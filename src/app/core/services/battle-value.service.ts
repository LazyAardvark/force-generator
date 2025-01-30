import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BattleValueService {
  //Gunnery is rows, Piloting is columns
  multiplierTable: number[][] = [
    //p0    p1    p2    p3    p4    p5    p6    p7    p8
    [2.42, 2.31, 2.21, 2.21, 1.93, 1.75, 1.68, 1.59, 1.5], // Gunnery 0
    [2.21, 2.11, 2.02, 1.92, 1.76, 1.6,  1.54, 1.46, 1.38], // Gunnery 1
    [1.93, 1.85, 1.76, 1.68, 1.54, 1.4,  1.35, 1.28, 1.21], // Gunnery 2
    [1.66, 1.58, 1.51, 1.44, 1.32, 1.2,  1.16, 1.1,  1.04],
    [1.38, 1.32, 1.26, 1.2,  1.1,  1.0,  0.95, 0.9,  0.85],
    [1.31, 1.19, 1.13, 1.08, 0.99, 0.9,  0.86, 0.81, 0.77],
    [1.24, 1.12, 1.07, 1.02, 0.94, 0.85, 0.81, 0.77, 0.72],
    [1.17, 1.06, 1.01, 0.96, 0.88, 0.8,  0.76, 0.72, 0.68],
    [1.1,  0.99, 0.95, 0.9,  0.83, 0.75, 0.71, 0.68, 0.64],
  ];
  constructor() { }

  getBattleValueSkillMultiplier(gunnery: number, piloting: number) : number{
    let mp = 0
    if(this.multiplierTable[gunnery] && this.multiplierTable[gunnery][piloting] !== undefined){
      mp = this.multiplierTable[gunnery][piloting];
    }
      return mp;
  }
  
  calculateBattleValueSkill(gunnery: number, piloting: number, baseBattleValue : number) : number{
    let bv = 0;
    if(this.multiplierTable[gunnery] && this.multiplierTable[gunnery][piloting] !== undefined){
      bv = Math.round(this.multiplierTable[gunnery][piloting] * baseBattleValue);
    }
    return bv;
  }
}
