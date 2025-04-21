import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../../models/trip';
import { TripService } from '../../services/trip.service';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripModalComponent } from '../trip-modal/trip-modal.component';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css'],
  imports: [CommonModule, TripCardComponent, TripModalComponent],
  standalone: true
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  isLoading = true;
  error: string | null = null;
  
  // Modal properties
  isModalOpen = false;
  selectedTrip?: Trip;
  modalTitle = 'Add New Trip';

  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    this.loadTrips();
  }

  onAddTrip(): void {
    this.selectedTrip = undefined;
    this.modalTitle = 'Add New Trip';
    this.isModalOpen = true;
  }

  onEditTrip(trip: Trip): void {
    this.selectedTrip = trip;
    this.modalTitle = `Edit Trip: ${trip.name}`;
    this.isModalOpen = true;
  }

  onDeleteTrip(trip: Trip): void {
    if (confirm(`Are you sure you want to delete ${trip.name}?`)) {
      this.tripService.deleteTrip(trip._id!).subscribe({
        next: () => {
          this.trips = this.trips.filter(t => t._id !== trip._id);
          this.showSuccess(`Trip "${trip.name}" has been deleted.`);
        },
        error: (err) => {
          console.error('Error deleting trip:', err);
          this.error = 'Failed to delete trip. Please try again later.';
        }
      });
    }
  }

  onCloseModal(): void {
    this.isModalOpen = false;
  }

  onSaveTrip(trip: Trip): void {
    if (trip._id) {
      // Update existing trip
      this.tripService.updateTrip(trip._id, trip).subscribe({
        next: (updatedTrip) => {
          this.trips = this.trips.map(t => t._id === updatedTrip._id ? updatedTrip : t);
          this.isModalOpen = false;
          this.showSuccess(`Trip "${updatedTrip.name}" has been updated.`);
        },
        error: (err) => {
          console.error('Error updating trip:', err);
          this.error = 'Failed to update trip. Please try again later.';
        }
      });
    } else {
      // Create new trip
      this.tripService.createTrip(trip).subscribe({
        next: (newTrip) => {
          this.trips.push(newTrip);
          this.isModalOpen = false;
          this.showSuccess(`Trip "${newTrip.name}" has been added.`);
        },
        error: (err) => {
          console.error('Error creating trip:', err);
          this.error = 'Failed to create trip. Please try again later.';
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

  private showSuccess(message: string): void {
    this.error = null;
    // You can implement a more sophisticated notification system here
    console.log('Success:', message);
  }
}
