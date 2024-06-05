import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GVAR } from '../GVAR';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'https://localhost:44388/api/vehicle';
  private apiInfoUrl = 'https://localhost:44388/api/vehicleinfo'; 

  constructor(private http: HttpClient) {}

  getVehicles(gvar: GVAR): Observable<GVAR> {
    return this.http.post<GVAR>(`${this.apiUrl}/getAll`, gvar, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  getVehiclesInfo(gvar: GVAR): Observable<GVAR> {
    return this.http.post<GVAR>(`${this.apiInfoUrl}/getAll`, gvar, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  getVehicleInfoByVehicleId(vehicleId: number): Observable<GVAR> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const gvar = new GVAR();
    gvar.DicOfDic = { "VehicleInfo": { "VehicleID": vehicleId.toString() } };
    return this.http.post<GVAR>(`${this.apiInfoUrl}/getById`, gvar, { headers });
  }

  addVehicle(gvar: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/add`, gvar, { headers });
  }

  addVehicleInfo(gvar: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiInfoUrl}/add`, gvar, { headers });
  }

  updateVehicle(gvar: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/update`, gvar, { headers });
  }
  updateVehicleInfo(gvar: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiInfoUrl}/update`, gvar, { headers });
  }

  deleteVehicle(gvar: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/delete`, gvar, { headers });
  }
}
