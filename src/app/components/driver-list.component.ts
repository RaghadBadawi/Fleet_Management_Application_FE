import { Component, OnInit } from '@angular/core';
import { DriverService } from '../services/driver.service';
import { VehicleService } from '../services/vehicle.service';
import { RouteHistoryService } from '../services/route-history.service';
import { MatDialog } from '@angular/material/dialog';
import { DriverEditComponent } from './driver-edit.component';
import { RouteHistoryAddComponent } from './route-history-add.component';
import { GVAR } from '../GVAR';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';

@Component({
  selector: 'app-driver-list',
  templateUrl: '../views/driver-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule
  ]
})
export class DriverListComponent implements OnInit {
  displayedColumns: string[] = [
    'DriverID', 'DriverName', 'PhoneNumber', 'VehicleNumber', 
    'Timestamp', 'Latitude', 'Longitude', 
    'VehicleDirection', 'Status', 'VehicleSpeed', 'Epoch', 'Address', 'Actions'
  ];
  drivers: any[] = [];
  vehicleNumbers: { VehicleID: number, VehicleNumber: string }[] = [];
  selectedVehicle: { [key: number]: number } = {};
  routeHistories: any[] = [];
  constructor(
    private driverService: DriverService,
    private vehicleService: VehicleService,
    private routeHistoryService: RouteHistoryService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadDrivers();
    this.loadVehicleNumbers();
  }

  loadDrivers(): void {
    const gvar: GVAR = { DicOfDic: {}, DicOfDT: {} };
    this.driverService.getAllDrivers(gvar).subscribe(response => {
      const driversData = response.DicOfDic['Drivers'];
      if (driversData) {
        this.drivers = Object.keys(driversData).map(key => JSON.parse(driversData[key]));
      }
    });
  }

  loadVehicleNumbers(): void {
    const gvar: GVAR = { DicOfDic: {}, DicOfDT: {} };
    this.vehicleService.getVehicles(gvar).subscribe(response => {
      const vehicleData = response.DicOfDic['Vehicles'];
      if (vehicleData) {
        this.vehicleNumbers = Object.keys(vehicleData).map(key => {
          const vehicle = JSON.parse(vehicleData[key]);
          return {
            VehicleID: vehicle.VehicleID,
            VehicleNumber: vehicle.VehicleNumber.toString()
          };
        });
      }
    });
  }

  addDriver(): void {
    const dialogRef = this.dialog.open(DriverEditComponent, {
      width: '300px',
      data: { driver: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const gvar = { DicOfDic: { Driver: result } };
        this.driverService.addDriver(gvar).subscribe(() => this.loadDrivers());
      }
    });
  }

  editDriver(driver: any): void {
    const dialogRef = this.dialog.open(DriverEditComponent, {
      width: '300px',
      data: { driver }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const gvar = { DicOfDic: { Driver: { ...result, DriverID: driver.DriverID } } };
        this.driverService.updateDriver(gvar).subscribe(() => this.loadDrivers());
      }
    });
  }

  addRouteHistory(driverId: number): void {
    const dialogRef = this.dialog.open(RouteHistoryAddComponent, {
      width: '300px',
      data: { driverId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { driverId, vehicleNumber } = result;
        this.routeHistoryService.setSelectedVehicleId(vehicleNumber);
      }
    });
  }

  loadRouteHistories(driverId: number): void {
    const vehicleId = this.selectedVehicle[driverId];
    if (vehicleId) {
      this.routeHistoryService.getRouteHistoryByVehicleId(vehicleId).subscribe(response => {
        if (response.DicOfDic && response.DicOfDic["RouteHistories"]) {
          this.routeHistories[driverId] = Object.values(response.DicOfDic["RouteHistories"]).map(history => JSON.parse(history as string));
        }
      });
    } else {
      this.routeHistories[driverId] = []; 
    }
  }
  

  onVehicleNumberChange(driverId: number, vehicleId: number): void {
    this.selectedVehicle[driverId] = vehicleId;
    this.loadRouteHistories(driverId);
  }

  deleteDriver(driverId: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '250px',
      data: { driverId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const gvar = { DicOfDic: { Driver: { DriverID: driverId } } };
        this.driverService.deleteDriver(gvar).subscribe(() => this.loadDrivers());
      }
    });
  }
  
}