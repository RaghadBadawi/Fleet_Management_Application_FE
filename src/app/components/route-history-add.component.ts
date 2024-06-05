import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GVAR } from '../GVAR';
import { VehicleService } from '../services/vehicle.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
@Component({
  selector: 'app-route-history-add',
  templateUrl: '../views/route-history-add.component.html',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatOption
  ]
})
export class RouteHistoryAddComponent implements OnInit {
  vehicleNumber!: number;
  vehicles: any[] = [];
  @Output() routeHistoryAdded = new EventEmitter<any>();
  constructor(
    public dialogRef: MatDialogRef<RouteHistoryAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { driverId: number },
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    const gvar: GVAR = { DicOfDic: {}, DicOfDT: {} };

    this.vehicleService.getVehicles(gvar).subscribe(response => {
      const vehiclesData = response.DicOfDic['Vehicles'];
      if (vehiclesData) {
        this.vehicles = Object.keys(vehiclesData).map(key => JSON.parse(vehiclesData[key]));
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const data = { driverId: this.data.driverId, vehicleNumber: this.vehicleNumber };
    this.dialogRef.close(data);
    this.routeHistoryAdded.emit(data); 
  }
  
}
