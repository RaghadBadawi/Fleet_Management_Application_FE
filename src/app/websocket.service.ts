import { Injectable, OnDestroy } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy {
  private socket$: WebSocketSubject<any>;
  private connectionClosed$ = new Subject<void>();

  constructor() {
    // Replace with your actual WebSocket endpoint
    this.socket$ = new WebSocketSubject('ws://localhost:44388');

    // Optionally log the WebSocket connection status
    this.socket$.subscribe(
      (message) => console.log('Received message:', message),
      (err) => console.error('WebSocket error:', err),
      () => console.log('WebSocket connection closed')
    );
  }

  // Method to send a message through the WebSocket
  sendMessage(message: any): void {
    this.socket$.next(message);
  }

  // Method to return the WebSocket messages as an observable
  getMessages(): Observable<any> {
    return this.socket$.asObservable();
  }

  // Ensure WebSocket connection is closed when the service is destroyed
  ngOnDestroy(): void {
    this.socket$.complete();
    this.connectionClosed$.next();
    this.connectionClosed$.complete();
  }
}