import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { VehicleListComponent } from './components/vehicle-list.component';  
import { ConfirmDeleteDialogComponent} from './components/confirm-delete-dialog.component';
import { VehicleService } from './services/vehicle.service';
import { routes } from './app.routes'; 
import { RouteHistoryAddComponent } from './components/route-history-add.component';
import { RouteHistoryListComponent } from './components/route-history-list.component';

@NgModule({
  declarations: [
    AppComponent,
    VehicleListComponent,
    RouteHistoryAddComponent,
    ConfirmDeleteDialogComponent,
    RouteHistoryListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    CommonModule,
    RouterModule,
    routes
  ],
  providers: [VehicleService, RouteHistoryListComponent],
  bootstrap: [AppComponent],
  
})
export class AppModule { }