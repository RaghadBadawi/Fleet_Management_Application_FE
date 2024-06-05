import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { RouteHistoryService } from '../services/route-history.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { VehicleDetailComponent } from './vehicle-detail.component';
import { VehicleAddComponent } from './vehicle-add.component';
import { VehicleEditComponent } from './vehicle-edit.component';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';
import { GVAR } from '../GVAR';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: '../views/vehicle-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule
  ]
})
export class VehicleListComponent implements OnInit {
  displayedColumns: string[] = ['VehicleID', 'VehicleNumber', 'VehicleType', 'Status', 'LastDirection', 'LastAddress', 'LastLatitude', 'LastLongitude', 'Actions'];
  vehicles: any[] = [];

  constructor(
    private routeHistoryService: RouteHistoryService,
    private vehicleService: VehicleService,
    public dialog: MatDialog,
    private router: Router 
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

  addVehicle(): void {
    const dialogRef = this.dialog.open(VehicleAddComponent, {
      width: '600px',
      data: { vehicle: {} }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const vehicleData = {
          VehicleNumber: result.VehicleNumber,
          VehicleType: result.VehicleType,
          Status: result.Status
        };
  
        
        this.vehicleService.addVehicle({ DicOfDic: { Vehicle: vehicleData } }).subscribe({
          next: response => {
            const vehicleID = response.VehicleID;
  
            
            const vehicleInfo = {
              VehicleID: vehicleID,
              DriverID: result.DriverID,
              VehicleMake: result.VehicleMake,
              VehicleModel: result.VehicleModel,
              PurchaseDate: result.PurchaseDate
            };
  
            this.vehicleService.addVehicleInfo({ DicOfDic: { VehicleInfo: vehicleInfo } }).subscribe({
              next: () => {
                
                const routeHistory = {
                  VehicleID: vehicleID,
                  VehicleDirection: result.VehicleDirection,
                  Status: result.Status,
                  VehicleSpeed: result.VehicleSpeed,
                  Epoch: result.Epoch,
                  Address: result.Address,
                  Latitude: result.Latitude,
                  Longitude: result.Longitude
                };
  
                this.routeHistoryService.addRouteHistory({ DicOfDic: { RouteHistory: routeHistory } }).subscribe({
                  next: () => {
                    
                    this.loadVehicles();
                  },
                  error: err => {
                    console.error('Error adding route history:', err);
                  }
                });
              },
              error: err => {
                console.error('Error adding vehicle info:', err);
              }
            });
          },
          error: err => {
            console.error('Error adding vehicle:', err);
          }
        });
      }
    });
  }
  
  
  
  editVehicle(vehicle: any): void {
    const dialogRef = this.dialog.open(VehicleEditComponent, {
        width: '600px',
        data: { vehicle: { ...vehicle } }
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            console.log('Dialog result:', result);

            // Retrieve Route History ID and Vehicle Info ID
            Promise.all([
                this.getRouteHistoryId(vehicle.VehicleID),
                this.getVehicleInfoId(vehicle.VehicleID)
            ]).then(([routeHistoryId, vehicleInfoId]) => {
                // Update the vehicle, vehicle info, and route history
                this.updateVehicle(vehicle.VehicleID, result).then(() => {
                    this.updateVehicleInfo(vehicleInfoId, result).then(() => {
                        this.updateRouteHistory(routeHistoryId, result).then(() => {
                            console.log('All updates successful');
                            this.loadVehicles();
                        }).catch(error => {
                            console.error('Error updating route history:', error);
                        });
                    }).catch(error => {
                        console.error('Error updating vehicle info:', error);
                    });
                }).catch(error => {
                    console.error('Error updating vehicle:', error);
                });
            }).catch(error => {
                console.error('Error retrieving IDs:', error);
            });
        }
    });
}

getRouteHistoryId(vehicleId: number): Promise<number> {
 
    return new Promise((resolve, reject) => {
        this.routeHistoryService.getRouteHistoryByVehicleId(vehicleId).subscribe({
            next: response => {
                const routeHistoryId = response.DicOfDic?.RouteHistories?.RouteHistory_0?.RouteHistoryID;
                console.log(routeHistoryId);
                if (routeHistoryId) {
                    resolve(routeHistoryId);
                } else {
                    reject('Route history ID not found');
                }
            },
            error: error => reject(error)
        });
    });
}

getVehicleInfoId(vehicleId: number): Promise<number> {
    return new Promise((resolve, reject) => {
        this.vehicleService.getVehicleInfoByVehicleId(vehicleId).subscribe({
            next: response => {
                const vehicleInfoId = response.DicOfDic?.VehicleInfos?.VehicleInfo_0?.ID;
                if (vehicleInfoId) {
                    resolve(vehicleInfoId);
                } else {
                    reject('Vehicle info ID not found');
                }
            },
            error: error => reject(error)
        });
    });
}


updateVehicle(vehicleId: number, newData: any): Promise<void> {
    const gvar = { DicOfDic: { Vehicle: { ...newData, VehicleID: vehicleId } } };
    return new Promise((resolve, reject) => {
        this.vehicleService.updateVehicle(gvar).subscribe({
            next: () => resolve(),
            error: error => reject(error)
        });
    });
}

updateVehicleInfo(vehicleInfoId: number, newData: any): Promise<void> {
    const vehicleInfo = {
        ID: vehicleInfoId,
        VehicleID: newData.VehicleID,
        DriverID: newData.DriverID,
        VehicleMake: newData.VehicleMake,
        VehicleModel: newData.VehicleModel,
        PurchaseDate: newData.PurchaseDate
    };
    const gvar = { DicOfDic: { VehicleInfo: vehicleInfo } };
    return new Promise((resolve, reject) => {
        this.vehicleService.updateVehicleInfo(gvar).subscribe({
            next: () => resolve(),
            error: error => reject(error)
        });
    });
}

updateRouteHistory(routeHistoryId: number, newData: any): Promise<void> {
    const routeHistory = {
        RouteHistoryID: routeHistoryId,
        VehicleID: newData.VehicleID,
        Timestamp: newData.Timestamp,
        Latitude: newData.Latitude,
        Longitude: newData.Longitude,
        VehicleDirection: newData.VehicleDirection,
        Status: newData.Status,
        VehicleSpeed: newData.VehicleSpeed,
        Epoch: newData.Epoch,
        Address: newData.Address
    };
    const gvar = { DicOfDic: { routeHistory: routeHistory } };
    return new Promise((resolve, reject) => {
        this.routeHistoryService.updateRouteHistory(gvar).subscribe({
            next: () => resolve(),
            error: error => reject(error)
        });
    });
}

  
  

  deleteVehicle(vehicleId: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '250px',
      data: { vehicleId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const gvar = { DicOfDic: { Vehicle: { VehicleID: vehicleId } } };
        this.vehicleService.deleteVehicle(gvar).subscribe(() => this.loadVehicles());
      }
    });
  }

  showMore(vehicleId: number): void {
    this.dialog.open(VehicleDetailComponent, {
      width: '300px',
      data: { vehicleId }
    });
  }
  

  goToDriverList(): void {
    this.router.navigate(['/drivers']);
  }
  
  goToGeofenceList(): void {
    this.router.navigate(['/geofence']);
  }
}
