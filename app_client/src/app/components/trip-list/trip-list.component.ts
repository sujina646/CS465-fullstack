import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../../models/trip';
import { TripService } from '../../services/trip.service';
import { TripCardComponent } from '../trip-card/trip-card.component';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css'],
  imports: [CommonModule, TripCardComponent],
  standalone: true
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    this.loadTrips();
  }

  onAddTrip(): void {
    // TODO: Implement add trip functionality
    console.log('Add trip clicked');
  }

  onEditTrip(trip: Trip): void {
    console.log('Edit trip:', trip);
  }

  onDeleteTrip(trip: Trip): void {
    if (confirm(`Are you sure you want to delete ${trip.name}?`)) {
      this.tripService.deleteTrip(trip._id!).subscribe({
        next: () => {
          this.trips = this.trips.filter(t => t._id !== trip._id);
        },
        error: (err) => {
          console.error('Error deleting trip:', err);
          this.error = 'Failed to delete trip. Please try again later.';
        }
      });
    }
  }

  private loadTrips(): void {
    this.isLoading = true;
    this.error = null;
    
    this.tripService.getTrips().subscribe({
      next: (trips) => {
        this.trips = trips;
        this.isLoading = false;
        console.log('Loaded trips:', this.trips);
      },
      error: (err) => {
        console.error('Error loading trips:', err);
        this.error = 'Failed to load trips. Please try again later.';
        this.isLoading = false;
      }
    });
  }
}
