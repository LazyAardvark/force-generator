import { Component, inject } from '@angular/core';
import { Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { Roster } from '../../../../core/services/roster.service';
import { RollerFacadeService } from '../../../services/roller-facade.service';
import { NgFor } from '@angular/common';


@Component({
  selector: 'fg-roller-setup',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatSliderModule,
    NgFor],
  templateUrl: './roller-setup.component.html',
  styles: '',
})

export class RollerSetupComponent{
 
  private formBuilder = inject(FormBuilder);
  private rollerFacade = inject(RollerFacadeService);
  rosters : Roster[]

  constructor() {
    this.rosters = this.rollerFacade.getRosters();
  }
  forceBuilderForm = this.formBuilder.group({
    selectionRoster: ['', Validators.required],
    battleValue: ['0', Validators.required],
    battleValueTolerance: [''],
    baseGunnerySkill: [3],
    basePilotingSkill: [4],
    allowOfficers: [''],
    allowDuplicates: [''],
  });



  onSubmit() {
    const formValue = this.forceBuilderForm.value;
    console.log("Force Generator Configuration Value :", formValue);
    this.rollerFacade.updateRollerTable(formValue);
  }
  onRosterChange(event : any){
    this.rollerFacade.setRoster(event.value);
  }
}
