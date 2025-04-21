import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class TripFormComponent implements OnInit {
  @Input() trip?: Trip;
  @Output() save = new EventEmitter<Trip>();
  @Output() cancel = new EventEmitter<void>();

  tripForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.tripForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.trip) {
      // Format date for the input field
      const formattedTrip = { ...this.trip };
      if (formattedTrip.start instanceof Date) {
        const date = new Date(formattedTrip.start);
        formattedTrip.start = date.toISOString().split('T')[0] as any;
      }
      this.tripForm.patchValue(formattedTrip);
    }
  }

  onSubmit(): void {
    if (this.tripForm.valid) {
      const tripData = this.tripForm.value;
      if (this.trip?._id) {
        tripData._id = this.trip._id;
      }
      this.save.emit(tripData);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
} 