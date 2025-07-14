import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'landing-page',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  constructor(private router: Router) {}
}
