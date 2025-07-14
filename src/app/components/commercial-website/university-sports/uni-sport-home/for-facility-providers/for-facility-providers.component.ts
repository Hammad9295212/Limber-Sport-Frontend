import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../../shared.module';
import { NgbCarouselModule, NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import {TestimonialsComponent} from "../../../../../shared/testimonials/testimonials.component";

@Component({
  selector: 'app-for-facility-providers',
  standalone: true,
  imports: [SharedModule, NgbCarouselModule, TestimonialsComponent],
  templateUrl: './for-facility-providers.component.html',
  styleUrl: './for-facility-providers.component.css'
})
export class ForFacilityProvidersComponent {
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
      author: "Goals",
      image: "/assets/WEBSITE - HOW IT WORKS FOR IMAGES/For Facility Providers/review-1.jpg",
      quote: "Excellent tool for management and social booking of the pitches. All our staff are very happy and the users, especially for the social features!"
    },
    {
      author: "Watlington Tennis Club",
      image: "/assets/WEBSITE - HOW IT WORKS FOR IMAGES/For Facility Providers/review-2.jpg",
      quote: "we were immediately convinced to adpot to Limber in our clubs. In a few quick we have revolutionised the way we interact with our customers and the best is yet to come."
    },
    {
      author: "Susan Cheshire",
      image: "/assets/WEBSITE - HOW IT WORKS FOR IMAGES/For Facility Providers/review-3.jpg",
      quote: "It has lightened and made our transparent the management of customer and the class booking systems in our facilities. A great tool for rewarding customer and promoting special events!"
    },
    {
      author: "Peak Climbing School",
      image: "/assets/how-it-works/facility/facility_h_1.png",
      quote: "Limber has saved our life! Managing bookings manually had become a double job, now everything is easier, everything in the platform and App! Fantastic!"
    },
    {
      author: "Goals",
      image: "/assets/WEBSITE - HOW IT WORKS FOR IMAGES/For Facility Providers/review-1.jpg",
      quote: "Excellent tool for management and social booking of the pitches. All our staff are very happy and the users, especially for the social features!"
    },
    {
      author: "Watlington Tennis Club",
      image: "/assets/WEBSITE - HOW IT WORKS FOR IMAGES/For Facility Providers/review-2.jpg",
      quote: "we were immediately convinced to adpot to Limber in our clubs. In a few quick we have revolutionised the way we interact with our customers and the best is yet to come."
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
