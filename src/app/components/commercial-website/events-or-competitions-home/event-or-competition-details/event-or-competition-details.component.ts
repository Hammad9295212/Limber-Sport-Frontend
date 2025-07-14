import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../../../shared.module';

@Component({
  selector: 'app-event-or-competition-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './event-or-competition-details.component.html',
  styleUrl: './event-or-competition-details.component.css',
})
export class EventOrCompetitionDetailsComponent {
  items: { header: string; content: string; isOpen: boolean }[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items = [
      {
        header: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit ?',
        content:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis consequuntur, vero consequatur quam, modi nulla id expedita nam eaque, neque voluptas. Iusto nisi saepe quasi quod dolor! Doloribus, ipsam non?',
        isOpen: false,
      },
      {
        header: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit ?',
        content:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis consequuntur, vero consequatur quam, modi nulla id expedita nam eaque, neque voluptas. Iusto nisi saepe quasi quod dolor! Doloribus, ipsam non?',
        isOpen: false,
      },
      {
        header: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit ?',
        content:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis consequuntur, vero consequatur quam, modi nulla id expedita nam eaque, neque voluptas. Iusto nisi saepe quasi quod dolor! Doloribus, ipsam non?',
        isOpen: false,
      },
    ];
  }

  navigateToEventsBooking() {
    this.router.navigate(['/event-booking-details']);
  }

  toggleItem(item: any): void {
    item.isOpen = !item.isOpen;
  }

  skillOptions = [
    { id: 1, name: 'Beginner', selected: false },
    { id: 2, name: 'Intermediate', selected: false },
    { id: 3, name: 'Advanced', selected: false },
    { id: 4, name: 'Professional', selected: false },
  ];
  toggleSkillSelection(skillOptions: {
    id: number;
    name: string;
    selected: boolean;
  }) {
    skillOptions.selected = !skillOptions.selected;
  }

  ageOptions = [
    { id: 1, name: 'Kids', selected: false },
    { id: 2, name: 'Teenagers', selected: false },
    { id: 3, name: 'Adults', selected: false },
    { id: 4, name: 'Seniors', selected: false },
  ];
  toggleAgeSelection(ageOptions: {
    id: number;
    name: string;
    selected: boolean;
  }) {
    ageOptions.selected = !ageOptions.selected;
  }

  genderOptions = [
    { id: 1, name: 'Mixed', selected: false },
    { id: 2, name: 'Male', selected: false },
    { id: 3, name: 'Female', selected: false },
  ];
  toggleGenderSelection(genderOptions: {
    id: number;
    name: string;
    selected: boolean;
  }) {
    genderOptions.selected = !genderOptions.selected;
  }
}
