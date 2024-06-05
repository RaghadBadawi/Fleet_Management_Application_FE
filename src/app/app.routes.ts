import { Routes } from '@angular/router';
import { VehicleListComponent } from './components/vehicle-list.component';
import { DriverListComponent } from './components/driver-list.component';
import { GeofenceListComponent } from './components/geofence-list.component';
import { RouteHistoryListComponent } from './components/route-history-list.component';

export const routes: Routes = [
    { path: 'vehicles', component: VehicleListComponent },
  { path: 'drivers', component: DriverListComponent },
  { path: 'geofence', component: GeofenceListComponent }, 
  { path:'routeHistories',component:RouteHistoryListComponent},
  { path: '', redirectTo: '/vehicles', pathMatch: 'full' }
   
];
