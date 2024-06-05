import { Component, OnInit } from '@angular/core';
import { RouteHistoryService } from '../services/route-history.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatOption } from '@angular/material/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-route-history-list',
  templateUrl: '../views/route-history-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatOption
  ]
})
export class RouteHistoryListComponent implements OnInit {
  routeHistories: any[] = [];
  selectedVehicleID!: number;
  selectedVehicleIDSubscription: Subscription | undefined;

  constructor(private routeHistoryService: RouteHistoryService) {}

  ngOnInit(): void {
    
    this.selectedVehicleIDSubscription = this.routeHistoryService.selectedVehicleId$.subscribe((vehicleId) => {
      this.selectedVehicleID = vehicleId;
      
      this.loadRouteHistories();
    });
  }

  ngOnDestroy(): void {
    
    if (this.selectedVehicleIDSubscription) {
      this.selectedVehicleIDSubscription.unsubscribe();
    }
  }

  loadRouteHistories(): void {
    if (!this.selectedVehicleID) {
      return;
    }

    const gvar = { DicOfDic: { VehicleID: this.selectedVehicleID }, DicOfDT: {} };
    this.routeHistoryService.getRouteHistoryByVehicle(gvar).subscribe(data => {
      this.routeHistories = Object.values(data.DicOfDic["RouteHistories"]);
    });
  }
}
