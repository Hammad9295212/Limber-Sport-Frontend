import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachesService } from '../coaches.service';

@Component({
  selector: 'app-coach-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './coach-details.component.html',
  styleUrl: './coach-details.component.css'
})
export class CoachDetailsComponent {
  items: { header: string, content: string, isOpen: boolean }[] = [];
  userId: any
  coachDetailsData: any;


  constructor(
    private coachesService: CoachesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.items = [
      { header: 'What age groups and skill levels do you coach?', content: ' I coach players of all ages and skill levels, from young beginners to advanced competitive athletes. Whether you are picking up a racket for the first time or aiming to improve your competitive edge, I tailor my coaching to meet your individual needs and goals.', isOpen: true },
      { header: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit ?', content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis consequuntur, vero consequatur quam, modi nulla id expedita nam eaque, neque voluptas. Iusto nisi saepe quasi quod dolor! Doloribus, ipsam non?', isOpen: false },
      { header: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit ?', content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis consequuntur, vero consequatur quam, modi nulla id expedita nam eaque, neque voluptas. Iusto nisi saepe quasi quod dolor! Doloribus, ipsam non?', isOpen: false },
    ];

    this.getIdFromURL()
    this.getCoachesListData()
  }

  getIdFromURL() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      // console.log(id);
      this.userId = id;
    });
  }

  getCoachesListData() {
    this.coachesService.getCoachDetails(this.userId).subscribe(
      data => {
        if (data?.success === true && data?.status === 200) {
          // console.log("Get API Successful", data)
          // console.log(data.data)
          this.coachDetailsData = data?.data
        } else {
          console.log("Get API Not Successful", data)
        }
      })
  }

  navigateToCoachBooking() {
    this.router.navigate(["/coach-booking-details"])
  }

  toggleItem(item: any): void {
    item.isOpen = item.isOpen;
  }
}
