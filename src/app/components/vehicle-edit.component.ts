import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'vehicle-edit',
  templateUrl: '../views/vehicle-edit.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
})
export class VehicleEditComponent {
  vehicle: any;

  constructor(
    public dialogRef: MatDialogRef<VehicleEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.vehicle = { ...data.vehicle };
  }

  onSaveClick(): void {
    this.dialogRef.close(this.vehicle);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}