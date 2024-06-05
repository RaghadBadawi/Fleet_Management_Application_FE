import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'vehicle-add',
  templateUrl: '../views/vehicle-add.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
})
export class VehicleAddComponent {
  vehicle: any = {};

  constructor(
    public dialogRef: MatDialogRef<VehicleAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.vehicle) {
      this.vehicle = { ...data.vehicle };
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.vehicle);
  }
}