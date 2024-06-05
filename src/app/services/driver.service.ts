// src/app/services/driver.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GVAR } from '../GVAR';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private apiUrl = 'https://localhost:44388/api/driver';

  constructor(private http: HttpClient) {}

  getAllDrivers(gvar: GVAR): Observable<GVAR> {
    return this.http.post<GVAR>(`${this.apiUrl}/getAll`, gvar, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  addDriver(gvar: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/add`, gvar, { headers });
  }

  updateDriver(gvar: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/update`, gvar, { headers });
  }

  deleteDriver(gvar: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/delete`, gvar, { headers });
  }
}
