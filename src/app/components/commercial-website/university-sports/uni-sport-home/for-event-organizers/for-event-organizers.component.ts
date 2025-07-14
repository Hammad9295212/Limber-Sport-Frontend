import {Component, ViewChild} from '@angular/core';
import {SharedModule} from '../../../../../shared.module';
import {NgbCarouselModule, NgbCarousel, NgbSlideEvent, NgbSlideEventSource} from '@ng-bootstrap/ng-bootstrap';
import {TestimonialsComponent} from "../../../../../shared/testimonials/testimonials.component";

@Component({
  selector: 'app-for-event-organizers',
  standalone: true,
  imports: [SharedModule, NgbCarouselModule, TestimonialsComponent],
  templateUrl: './for-event-organizers.component.html',
  styleUrl: './for-event-organizers.component.css'
})
export class ForEventOrganizersComponent {
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
      quote: "Limber has been a great solution for our online entry portal! The layout and functionality is easy to use from an organisers perspective and we've had great feedback from our runners, cyclists and swimmers!",
      author: "Breca Swim Run",
      image: "/assets/how-it-works/event-organise/event_1.png"
    },
    {
      rating: 5,
      quote: "As an organisation with over 50 sports events, races, special events and socials each year it was an absolute breath of fresh air to discover Limber to help us promote, manage and sell tickets for them all! Perfect solution!",
      author: "CSS Sports and Leisure",
      image: "https://i.ibb.co/8NjYrG9/event-2.jpg"
    },
    {
      rating: 5,
      quote: "Limber are quite simply a great team to work with, Dynamic, forward thinking, responsive with a great support team, who deliver!! Increased participation substantially in our event!",
      author: "Bike Oxford",
      image: "/assets/how-it-works/event-organise/event_3.jpg"
    },
    {
      rating: 5,
      quote: "Limber has freed up our time! Managing registration manually had become a double job: now everything is easier, everything in the platform and App! Many more sales too! Fantastic!",
      author: "Color Obstacle Rush",
      image: "/assets/how-it-works/event-organise/event_4.jpg"
    },
    {
      rating: 5,
      quote: "Limber has been a great solution for our online entry portal! The layout and functionality is easy to use from an organisers perspective and we've had great feedback from our runners, cyclists and swimmers!",
      author: "Breca Swim Run",
      image: "/assets/how-it-works/event-organise/event_1.png"
    },
    {
      rating: 5,
      quote: "As an organisation with over 50 sports events, races, special events and socials each year it was an absolute breath of fresh air to discover Limber to help us promote, manage and sell tickets for them all! Perfect solution!",
      author: "CSS Sports and Leisure",
      image: "https://i.ibb.co/8NjYrG9/event-2.jpg"
    },
  ];


  @ViewChild('carousel', {static: true}) carousel: NgbCarousel;

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
