import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../../models/trip';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class TripCardComponent {
  @Input() trip!: Trip;
  @Output() edit = new EventEmitter<Trip>();
  @Output() delete = new EventEmitter<Trip>();

  // defaultImage = 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=800&auto=format&fit=crop';

  getImageUrl(code: string): string {
    const serverUrl = environment.serverUrl; // This should be http://localhost:3000
    
    // First, check if the trip has an image property with a value
    if (this.trip.image && this.trip.image.trim() !== '') {
      // If image starts with http or https, use it as is
      if (this.trip.image.startsWith('http')) {
        return this.trip.image;
      }
      // Otherwise prepend the server URL
      return `${serverUrl}${this.trip.image}`;
    }

    // Fallback to code-based mapping if no image property
    const baseUrl = `${serverUrl}/images/`;
    // Map trip codes to their corresponding reef images
    switch(code) {
      case 'GALR210214':
        return baseUrl + 'reef1.jpg';
      case 'DAWR210315':
        return baseUrl + 'reef2.jpg';
      case 'CRLR210415':
      case 'CLER210621':
        return baseUrl + 'reef3.jpg';
      default:
        return baseUrl + 'dive-site.png'; // Default fallback image
    }
  }

  handleImageError(event: any): void {
    // If image fails to load, use a fallback image with full server URL
    const serverUrl = environment.serverUrl;
    event.target.src = `${serverUrl}/images/dive-site.png`;
  }

  onEdit(): void {
    this.edit.emit(this.trip);
  }

  onDelete(): void {
    this.delete.emit(this.trip);
  }
} 