import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../../models/trip';
import { TripFormComponent } from '../trip-form/trip-form.component';

@Component({
  selector: 'app-trip-modal',
  standalone: true,
  imports: [CommonModule, TripFormComponent],
  templateUrl: './trip-modal.component.html',
  styleUrls: ['./trip-modal.component.css']
})
export class TripModalComponent {
  @Input() trip?: Trip;
  @Input() isOpen = false;
  @Input() modalTitle = 'Add Trip';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Trip>();

  onSave(trip: Trip): void {
    this.save.emit(trip);
    this.onClose();
  }

  onClose(): void {
    this.close.emit();
  }
} 