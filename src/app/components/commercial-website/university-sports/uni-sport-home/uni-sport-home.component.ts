import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared.module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-uni-sport-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './uni-sport-home.component.html',
  styleUrl: './uni-sport-home.component.css'
})
export class UniSportHomeComponent {
  constructor(
    private router: Router
  ) {

  }

  navigateToHomePage() {
    this.router.navigate(['/home'])
  }
}
