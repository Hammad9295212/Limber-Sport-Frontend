import { Component, ViewChild } from '@angular/core';
import {
  NgbCarousel,
  NgbCarouselModule,
  NgbSlideEvent,
  NgbSlideEventSource,

} from '@ng-bootstrap/ng-bootstrap';
import {TestimonialsComponent} from "../../../shared/testimonials/testimonials.component";



@Component({
  selector: 'app-top-reviews',
  standalone: true,
  imports: [NgbCarouselModule, TestimonialsComponent,],
  templateUrl: './top-reviews.component.html',
  styleUrl: './top-reviews.component.css'
})

export class TopReviewsComponent {
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
      author: "Adam Mellor",
      designation: "London",
      rating: 5,
      image: "/assets/main-page/home_testimonial_1.png",
      quote: "I have not always been the most outgoing of sorts, but love a good badminton match. Limber introduced me to a local club where I am now designated keeper.",
    },
    {
      author: "Conor Corcoran",
      designation: "Bath",
      rating: 5,
      image: "/assets/main-page/home_testimonial_2.png",
      quote: "There is nothing better than a rough Rugby match and a pint to share with friends afterwards. Couldn't be happier with joining Limber. Cheer mates!",
    },
    {
      author: "Julia Morton",
      designation: "Reigate",
      rating: 5,
      image: "/assets/main-page/home_testimonial_3.png",
      quote: "I just returned from a semester abroad and was thrilled to find a local cycling club through Limber. I get to stay fit and meet an amazing group of friends!",
    },
    {
      author: "Adam Mellor",
      designation: "London",
      rating: 5,
      image: "/assets/main-page/home_testimonial_1.png",
      quote: "I have not always been the most outgoing of sorts, but love a good badminton match. Limber introduced me to a local club where I am now designated keeper.",
    },
    {
      author: "Conor Corcoran",
      designation: "Bath",
      rating: 5,
      image: "/assets/main-page/home_testimonial_2.png",
      quote: "There is nothing better than a rough Rugby match and a pint to share with friends afterwards. Couldn't be happier with joining Limber. Cheer mates!",
    },
    {
      author: "Julia Morton",
      designation: "Reigate",
      rating: 5,
      image: "/assets/main-page/home_testimonial_3.png",
      quote: "I just returned from a semester abroad and was thrilled to find a local cycling club through Limber. I get to stay fit and meet an amazing group of friends!",
    },
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

