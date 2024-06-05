import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { GVAR } from '../GVAR';

@Injectable({
  providedIn: 'root'
})

export class RouteHistoryService {
  private apiUrl = 'https://localhost:44388/api/routeHistory';

  private selectedVehicleIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  selectedVehicleId$: Observable<number> = this.selectedVehicleIdSubject.asObservable();

  constructor(private http: HttpClient) {}

  getRouteHistoryByVehicle(gvar: GVAR): Observable<GVAR> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<GVAR>(`${this.apiUrl}/getAll`, gvar, { headers });
  }

  getRouteHistoryByVehicleId(vehicleId: number): Observable<GVAR> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const gvar = new GVAR();
    gvar.DicOfDic = { "RouteHistory": { "VehicleID": vehicleId.toString() } };
    return this.http.post<GVAR>(`${this.apiUrl}/getByVehicleId`, gvar, { headers });
  }

  addRouteHistory(gvar: any): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/add`, gvar, { headers });
  }

  updateRouteHistory(gvar: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/update`, gvar, { headers });
  }

  setSelectedVehicleId(vehicleId: number): void {
    this.selectedVehicleIdSubject.next(vehicleId);
  }

  getSelectedVehicleId(): Observable<number> {
    return this.selectedVehicleIdSubject.asObservable();
  }
}
