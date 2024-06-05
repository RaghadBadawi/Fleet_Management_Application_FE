import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GVAR } from '../GVAR';

@Injectable({
  providedIn: 'root'
})
export class GeofenceService {
  private apiUrl = 'https://localhost:44388/api/geofence';

  constructor(private http: HttpClient) {}

  getAllGeofences(gvar: GVAR): Observable<GVAR> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<GVAR>(`${this.apiUrl}/getAll`, gvar, { headers });
  }
  
}
