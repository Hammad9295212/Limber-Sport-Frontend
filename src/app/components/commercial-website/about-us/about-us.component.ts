import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared.module';


@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  constructor(
    private router: Router
  ) {

  }

  navigateToHomePage() {
    this.router.navigate(['/home'])
  }
}
