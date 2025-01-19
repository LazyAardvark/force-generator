import { Component, inject } from '@angular/core';
import { Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';


@Component({
  selector: 'fg-roller-setup',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatSliderModule,
  ],
  templateUrl: './roller-setup.component.html',
  styles: '',


})
export class RollerSetupComponent {

  private formBuilder = inject(FormBuilder);

  forceBuilderForm = this.formBuilder.group({
    selectionRoster: ['', Validators.required],
    battleValue: ['0', Validators.required],
    battleValueTolerance: [''],
    baseGunnerySkill: [3],
    basePilotingSkill: [4],
    allowOfficers: [''],
    allowDuplicates: [''],
  });

  rosters: String[] = [
    "AGoAC Box",
    "Beginner Box",
    "Mercenaries Box",
    "Clan Invasion Box"
  ];


  onSubmit() {
    const formValue = this.forceBuilderForm.value;
    console.log("Force Generator Configuration Value :", formValue);
  }
}
