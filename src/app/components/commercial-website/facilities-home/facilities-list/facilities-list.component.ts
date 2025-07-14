import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facilities-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './facilities-list.component.html',
  styleUrl: './facilities-list.component.css',
})
export class FacilitiesListComponent {
  constructor(private router: Router) {}

  isFacilitiesList: string = 'List';

  handleFacilitiesView(a: string) {
    if (a === 'List') {
      this.isFacilitiesList = 'List';
    } else if (a === 'Card') {
      this.isFacilitiesList = 'Card';
    }
  }

  // handleEventDetailsView() {
  //   this.router.navigate(['/facilities-details'])
  // }
}
