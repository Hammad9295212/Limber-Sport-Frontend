import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../../shared.module';
import { NgbCarouselModule, NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import {TestimonialsComponent} from "../../../../../shared/testimonials/testimonials.component";

@Component({
  selector: 'app-for-coaches',
  standalone: true,
  imports: [SharedModule, NgbCarouselModule, TestimonialsComponent],
  templateUrl: './for-coaches.component.html',
  styleUrl: './for-coaches.component.css'
})
export class ForCoachesComponent {
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  showNavigationIndicators = true;
  showNavigationArrows = false;
  wrap = true;
  testimonials = [
    {
      rating: 5,
      quote: "“Brilliant Solution! I have now abandoned pen and paper and everything done in App! Organisation is a breeze now!”",
      author: "Richard Smith",
      designation: "Tennis Pro",
      image: "assets/WEBSITE - HOW IT WORKS FOR IMAGES/For Coaches/review-1.jpg"
    },
    {
      rating: 5,
      quote: "“I have managed to find many new clients through the Limber App and it has been super useful for me in promoting my Half Term Kids Gold Academies! A definite must for any golf coach!”",
      author: "Thomas Lambert",
      designation: "Golf Pro",
      image: "assets/how-it-works/coaches/coaches_h_2.png"
    },
    {
      rating: 5,
      quote: "“Super easy for me to communicate with my clients wanting to arrange private swimming lessons for their children! I have always been bad at accounts and this aspect has made my life easy!”",
      author: "Susan Cheshire",
      designation: "Swimming Coach",
      image: "assets/WEBSITE - HOW IT WORKS FOR IMAGES/For Coaches/review-2.jpg"
    },
    {
      rating: 5,
      quote: "“Organising my climbing groups and group sessions is so easy now. Cancellations decreased, sessions booked increased and brilliant for building my localised climbing community.”",
      author: "Neil Gresham",
      designation: "Climbing Coach",
      image: "assets/WEBSITE - HOW IT WORKS FOR IMAGES/For Coaches/review-3.jpg"
    },
    {
      rating: 5,
      quote: "“Brilliant Solution! I have now abandoned pen and paper and everything done in App! Organisation is a breeze now!”",
      author: "Richard Smith",
      designation: "Tennis Pro",
      image: "assets/WEBSITE - HOW IT WORKS FOR IMAGES/For Coaches/review-1.jpg"
    },
    {
      rating: 5,
      quote: "“I have managed to find many new clients through the Limber App and it has been super useful for me in promoting my Half Term Kids Gold Academies! A definite must for any golf coach!”",
      author: "Thomas Lambert",
      designation: "Golf Pro",
      image: "assets/how-it-works/coaches/coaches_h_2.png"
    }
  ];


  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }
}
