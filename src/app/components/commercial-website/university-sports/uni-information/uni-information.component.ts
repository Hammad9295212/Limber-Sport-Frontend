import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../shared.module';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {TestimonialsComponent} from "../../../../shared/testimonials/testimonials.component";

@Component({
  selector: 'app-uni-information',
  standalone: true,
  templateUrl: './uni-information.component.html',
  styleUrl: './uni-information.component.css',
  imports: [SharedModule, NgbCarouselModule, TestimonialsComponent]
})
export class UniInformationComponent {

  testimonials = [
    {
      author: "Molly Robb",
      designation: "University of Bath Netball Club, Secretary",
      quote: "I'm amazed how many students had never heard of the all the different college & university sports, clubs and organisations available on campus. Limber helped us promote our club leading to an increase in members of 30% from previous year.",
      image: "assets/University-sports/review-1.jpg"
    },
    {
      author: "Ryan Williams",
      designation: "Cardiff University Mens Football Club, Mens 1st XI Captain",
      quote: "Limber is great for promoting and selling tickets for our matches and events and registrations for competitions we organise! This year alone our club revenues and attendance have increased by over double and we are only half way through the year!",
      image: "assets/University-sports/review-2.jpg"
    },
    {
      author: "Sienna Burton",
      designation: "Oxford University Sport, General Manager",
      quote: "It only took a day to get used to using Limber for our facilities management and enroll or the university sports clubs and students. We were able to sign up the clubs and students. We were able to sign up the clubs and students in no time! The ease of finding availability and booking means availability has decreased for courts, pitches and sports halls!",
      image: "assets/University-sports/review-3.jpg"
    },
    {
      author: "Sienna Burton",
      designation: "Oxford University Sport, General Manager",
      quote: "It only took a day to get used to using Limber for our facilities management and enroll or the university sports clubs and students. We were able to sign up the clubs and students. We were able to sign up the clubs and students in no time! The ease of finding availability and booking means availability has decreased for courts, pitches and sports halls!",
      image: "assets/University-sports/review-3.jpg"
    },
    {
      author: "Molly Robb",
      designation: "University of Bath Netball Club, Secretary",
      quote: "I'm amazed how many students had never heard of the all the different college & university sports, clubs and organisations available on campus. Limber helped us promote our club leading to an increase in members of 30% from previous year.",
      image: "assets/University-sports/review-1.jpg"
    },
    {
      author: "Ryan Williams",
      designation: "Cardiff University Mens Football Club, Mens 1st XI Captain",
      quote: "Limber is great for promoting and selling tickets for our matches and events and registrations for competitions we organise! This year alone our club revenues and attendance have increased by over double and we are only half way through the year!",
      image: "assets/University-sports/review-2.jpg"
    },
  ];


  constructor(
    private router: Router
  ) {

  }

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  showNavigationIndicators = true;
  showNavigationArrows = false;
  wrap = true;

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

  navigateToHomePage() {
    this.router.navigate(['/home'])
  }
}
