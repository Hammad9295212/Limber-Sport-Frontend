import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../../shared.module';
import { NgbCarouselModule, NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import {TestimonialsComponent} from "../../../../../shared/testimonials/testimonials.component";

@Component({
  selector: 'app-for-partners-and-advertisers',
  standalone: true,
  imports: [SharedModule, NgbCarouselModule, TestimonialsComponent],
  templateUrl: './for-partners-and-advertisers.component.html',
  styleUrl: './for-partners-and-advertisers.component.css'
})
export class ForPartnersAndAdvertisersComponent {
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
      quote: "“Being an online-retailer for racket spo Limber has provided us with laser focused and targeted advertising campaigns to racket sports players and community on the Limber App! Significant increased visits to our website and sales for us!”",
      author: "Framework Sports",
      image: "/assets/how-it-works/partners/partner_h_1.png"
    },
    {
      quote: "“Promoting our Ripe specialist Sports Insurance to the Limber community has been a gamechanger for us. As a result of our campaigns on Limber we have experienced increased enquiries, sales and more brand awareneness”",
      author: "Ripe Sports Insurance",
      image: "/assets/how-it-works/partners/partner_h_2.jpg"
    },
    {
      quote: "“Quite simply we cannot believe how we all managed before Limber and it has done wonders for our business. Increased sales of our rehydration drink and an expanded customer loyalty base all resulting from the Limber Easy to run advertising campaigns.”",
      author: "Dynaforce",
      image: "https://i.ibb.co/QbdZG9y/partner-h-3.jpg"
    },
    {
      quote: "“Since using Limber to promote our Sports Store in Oxfordshire and advertise special offers brand awareness has increased and we are seeing many new customers walk into our store! It's so easy to use, very useful analytics and increased revenues!”",
      author: "MP Sports",
      image: "/assets/how-it-works/partners/partner_h_4.png"
    },
    {
      quote: "“Being an online-retailer for racket spo Limber has provided us with laser focused and targeted advertising campaigns to racket sports players and community on the Limber App! Significant increased visits to our website and sales for us!”",
      author: "Framework Sports",
      image: "/assets/how-it-works/partners/partner_h_1.png"
    },
    {
      quote: "“Promoting our Ripe specialist Sports Insurance to the Limber community has been a gamechanger for us. As a result of our campaigns on Limber we have experienced increased enquiries, sales and more brand awareneness”",
      author: "Ripe Sports Insurance",
      image: "/assets/how-it-works/partners/partner_h_2.jpg"
    },
    {
      quote: "“Quite simply we cannot believe how we all managed before Limber and it has done wonders for our business. Increased sales of our rehydration drink and an expanded customer loyalty base all resulting from the Limber Easy to run advertising campaigns.”",
      author: "Dynaforce",
      image: "https://i.ibb.co/QbdZG9y/partner-h-3.jpg"
    }
]

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
