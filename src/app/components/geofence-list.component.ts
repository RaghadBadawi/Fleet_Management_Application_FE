import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GeofenceService } from '../services/geofence.service';
import { GVAR } from '../GVAR';

@Component({
  selector: 'app-geofence-list',
  templateUrl: '../views/geofence-list.component.html',
  
  standalone: true,
  imports: [
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
   
  ]
})
export class GeofenceListComponent implements OnInit {
  geofences: any[] = [];
  displayedColumns: string[] = ['GeofenceID', 'GeofenceType', 'AddedDate', 'StrokeColor', 'StrokeOpacity', 'StrokeWeight', 'FillColor', 'FillOpacity'];

  constructor(private geofenceService: GeofenceService) { }

  ngOnInit(): void {
    this.loadGeofences();
  }

  loadGeofences(): void {
    const gvar: GVAR = { DicOfDic: {}, DicOfDT: {} };

    this.geofenceService.getAllGeofences(gvar).subscribe(response => {
      const geofencesData = response.DicOfDic['Geofences'];
      if (geofencesData) {
        this.geofences = Object.keys(geofencesData).map(key => JSON.parse(geofencesData[key]));
      }
    });
  }
}
