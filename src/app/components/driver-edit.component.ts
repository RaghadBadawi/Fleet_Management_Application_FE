// src/app/components/driver-edit.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-driver-edit',
  templateUrl: '../views/driver-edit.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
})
export class DriverEditComponent {
  driver: any;

  constructor(
    public dialogRef: MatDialogRef<DriverEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.driver = { ...data.driver };
  }

  onSaveClick(): void {
    this.dialogRef.close(this.driver);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
