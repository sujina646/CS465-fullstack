import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Trip } from '../models/trip';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  // GET all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiBaseUrl}/trips`)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  // GET single trip
  getTrip(tripId: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiBaseUrl}/trips/${tripId}`)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  // POST new trip
  createTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.apiBaseUrl}/trips`, trip)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  // PUT update trip
  updateTrip(tripId: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiBaseUrl}/trips/${tripId}`, trip)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  // DELETE trip
  deleteTrip(tripId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/trips/${tripId}`)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  handleImageError(event: any): void {
    event.target.src = '/images/placeholder.jpg'; // Fallback image
  }

  // Error handler
  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      // Unauthorized - redirect to login
      this.authService.logout();
      this.router.navigate(['/login']);
      return throwError(() => new Error('Please log in to access this feature'));
    }
    
    // Default error handling
    console.error('API error:', error);
    return throwError(() => new Error(error.error?.message || 'Something went wrong. Please try again.'));
  }
}
