import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-clubs-home',
  standalone: true,
  imports: [],
  templateUrl: './clubs-home.component.html',
  styleUrl: './clubs-home.component.css'
})
export class ClubsHomeComponent {

  constructor(
    private router: Router
  ) {
  }

  viewCoachDetail() {
    const queryParams: any = {'role_id': '4'};
    this.router.navigate(['/players-list'], {queryParams});
  }

}
