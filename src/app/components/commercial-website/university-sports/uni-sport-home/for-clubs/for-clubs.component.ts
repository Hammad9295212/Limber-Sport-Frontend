import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../../shared.module';
import { NgbCarouselModule, NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import {TestimonialsComponent} from "../../../../../shared/testimonials/testimonials.component";

@Component({
  selector: 'app-for-clubs',
  standalone: true,
  imports: [SharedModule, NgbCarouselModule, TestimonialsComponent],
  templateUrl: './for-clubs.component.html',
  styleUrl: './for-clubs.component.css'
})
export class ForClubsComponent {
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
      quote: "“Limber has been a greater solution for our club making it super easy for new members to join, pay annual membership fees and find out events and competitions and new friends to play with. We love it!”",
      author: "St Andrews University Squash Club",
      image: "https://i.ibb.co/h1Kcr2Y/club-5.jpg"
    },
    {
      quote: "“Super easy to use and setup within and hour! All of our members love being able to find out about competitions and people looking for a game. We couldn't survive without it”",
      author: "Princes Risborough Golf Club",
      image: "/assets/how-it-works/club/club_4.jpg"
    },
    {
      quote: "“Quite simply we cannot believe how we all managed bedore Limber and it has done wonders for our business. Increased Membership, Increased number for training sessions and best of all built us a awesome community”",
      author: "On your Bike Fitness Club",
      image: "/assets/how-it-works/club/club_1.jpg"
    },
    {
      quote: "“Since adopting the software we have seen increased payment collection by 15% and collect payment 3x fater than ever before. If that wasn't good enough, it has also reduced my time spent on admin by 80%. We think those results speak for themselves”",
      author: "Haddenham Tennis Club",
      image: "/assets/how-it-works/club/club_3.jpg"
    },
    {
      quote: "“Limber has been a greater solution for our club making it super easy for new members to join, pay annual membership fees and find out events and competitions and new friends to play with. We love it!”",
      author: "St Andrews University Squash Club",
      image: "https://i.ibb.co/h1Kcr2Y/club-5.jpg"
    },
    {
      quote: "“Super easy to use and setup within and hour! All of our members love being able to find out about competitions and people looking for a game. We couldn't survive without it”",
      author: "Princes Risborough Golf Club",
      image: "/assets/how-it-works/club/club_4.jpg"
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
