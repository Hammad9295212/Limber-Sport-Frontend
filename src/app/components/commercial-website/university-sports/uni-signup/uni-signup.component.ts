import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../shared.module';
import { NgbCarouselModule, NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import {TestimonialsComponent} from "../../../../shared/testimonials/testimonials.component";

@Component({
  selector: 'app-uni-signup',
  standalone: true,
  imports: [SharedModule, NgbCarouselModule, TestimonialsComponent],
  templateUrl: './uni-signup.component.html',
  styleUrl: './uni-signup.component.css'
})
export class UniSignupComponent {
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  showNavigationIndicators = true;
  showNavigationArrows = false;
  wrap = true;

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  testimonials = [
    {
      "rating": 5,
      "quote": "We have more than 500 employees at our facility. Trying to get a round-robin game of any kind going for after work five-a-side football is practically a mess. Limber makes that so much easier with a unified platform we can all communicate through.",
      "author": "Charlotte Baker",
      "company": "Savills",
      "designation": "Senior Surveyor",
      "image": "https://i.ibb.co/y6f1QbC/corporate-1.jpg"
    },
    {
      "rating": 5,
      "quote": "Employees have been signing up to Limber and everyone is finding new people to play sport with, corporate teams have been set up and our employees' health and wellbeing have gone up reducing sick leave and improving company performance.",
      "author": "Roman Alexander",
      "company": "Bunzi",
      "designation": "Sales Director",
      "image": "/assets/corporate-sport/corporate_2.png"
    },
    {
      "rating": 5,
      "quote": "HR has never been easier. Using Limber to run our company tennis club has increased participation and networking within our company and reduced employee stress. Plus, the scheduling aspect is practically automatic through the app!",
      "author": "Ruby Webb",
      "company": "Barclays",
      "designation": "Profession",
      "image": "/assets/corporate-sport/corporate_3.png"
    },
    {
      "rating": 5,
      "quote": "We have more than 500 employees at our facility. Trying to get a round-robin game of any kind going for after work five-a-side football is practically a mess. Limber makes that so much easier with a unified platform we can all communicate through.",
      "author": "Charlotte Baker",
      "company": "Savills",
      "designation": "Senior Surveyor",
      "image": "https://i.ibb.co/y6f1QbC/corporate-1.jpg"
    },
    {
      "rating": 5,
      "quote": "Employees have been signing up to Limber and everyone is finding new people to play sport with, corporate teams have been set up and our employees' health and wellbeing have gone up reducing sick leave and improving company performance.",
      "author": "Roman Alexander",
      "company": "Bunzi",
      "designation": "Sales Director",
      "image": "/assets/corporate-sport/corporate_2.png"
    },
    {
      "rating": 5,
      "quote": "HR has never been easier. Using Limber to run our company tennis club has increased participation and networking within our company and reduced employee stress. Plus, the scheduling aspect is practically automatic through the app!",
      "author": "Ruby Webb",
      "company": "Barclays",
      "designation": "Profession",
      "image": "/assets/corporate-sport/corporate_3.png"
    },
    {
      "rating": 5,
      "quote": "We have more than 500 employees at our facility. Trying to get a round-robin game of any kind going for after work five-a-side football is practically a mess. Limber makes that so much easier with a unified platform we can all communicate through.",
      "author": "Charlotte Baker",
      "company": "Savills",
      "designation": "Senior Surveyor",
      "image": "https://i.ibb.co/y6f1QbC/corporate-1.jpg"
    },
    {
      "rating": 5,
      "quote": "Employees have been signing up to Limber and everyone is finding new people to play sport with, corporate teams have been set up and our employees' health and wellbeing have gone up reducing sick leave and improving company performance.",
      "author": "Roman Alexander",
      "company": "Bunzi",
      "designation": "Sales Director",
      "image": "/assets/corporate-sport/corporate_2.png"
    },
    {
      "rating": 5,
      "quote": "HR has never been easier. Using Limber to run our company tennis club has increased participation and networking within our company and reduced employee stress. Plus, the scheduling aspect is practically automatic through the app!",
      "author": "Ruby Webb",
      "company": "Barclays",
      "designation": "Profession",
      "image": "/assets/corporate-sport/corporate_3.png"
    },
  ]

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
