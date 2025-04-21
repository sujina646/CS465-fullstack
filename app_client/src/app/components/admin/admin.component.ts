import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TripListComponent } from '../trip-list/trip-list.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [CommonModule, TripListComponent]
})
export class AdminComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
} 