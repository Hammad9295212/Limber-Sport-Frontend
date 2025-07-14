import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-or-competitions-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './events-or-competitions-list.component.html',
  styleUrl: './events-or-competitions-list.component.css'
})
export class EventsOrCompetitionsListComponent {
  constructor(
    private router: Router
  ) {

  }

  isEventsList: boolean = true;
  isEventsCard: boolean = false

  handleEventsView(a: string) {
    if (a === "List") {
      this.isEventsCard = false
      this.isEventsList = true
    } else if (a === "Card") {
      this.isEventsList = false
      this.isEventsCard = true
    }
  }
  handleEventDetailsView() {
    this.router.navigate(['/event-details'])
  }
}
