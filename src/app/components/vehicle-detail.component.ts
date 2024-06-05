import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VehicleService } from '../services/vehicle.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common'; 
import { GVAR } from '../GVAR';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: '../views/vehicle-detail.component.html',
  standalone: true,
  imports: [
    MatSelectModule,
    CommonModule 
  ],
})
export class VehicleDetailComponent implements OnInit {
  vehicleInfo: any;

  constructor(
    private vehicleService: VehicleService,
    public dialogRef: MatDialogRef<VehicleDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vehicleId: number }
  ) {}

  ngOnInit(): void {
    this.loadVehicleInfo(this.data.vehicleId);
  }

  loadVehicleInfo(vehicleId: number): void {
    const gvar: GVAR = { DicOfDic: {}, DicOfDT: {} };

    this.vehicleService.getVehiclesInfo(gvar).subscribe(response => {
      const vehicleInfoData = response.DicOfDic['VehicleInformations'];
      if (vehicleInfoData) {
        const vehicleInfos = Object.keys(vehicleInfoData).map(key => JSON.parse(vehicleInfoData[key]));
        this.vehicleInfo = vehicleInfos.find(info => info.VehicleID === vehicleId);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
