import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../../models/trip';

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
    const baseUrl = '/images/';
    // Map trip codes to their corresponding reef images
    switch(code) {
      case 'GALR210214':
        return baseUrl + 'reef1.jpg';
      case 'DAWR210315':
        return baseUrl + 'reef2.jpg';
      case 'CRLR210415':
        return baseUrl + 'reef3.jpg';
      default:
        return baseUrl + 'dive-site.png'; // Default fallback image
    }
  }

  onEdit(): void {
    this.edit.emit(this.trip);
  }

  onDelete(): void {
    this.delete.emit(this.trip);
  }
} 