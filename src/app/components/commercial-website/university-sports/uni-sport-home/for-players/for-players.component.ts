import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../../shared.module';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import {TestimonialsComponent} from "../../../../../shared/testimonials/testimonials.component";

@Component({
  selector: 'app-for-players',
  standalone: true,
  imports: [SharedModule, NgbCarouselModule, TestimonialsComponent],
  templateUrl: './for-players.component.html',
  styleUrl: './for-players.component.css'
})

export class ForPlayersComponent {
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
      quote: "“This Limber app is fantastic for tennis! I've easily found people to play with and joined several exciting competitions. It's perfect for connecting with fellow tennis enthusiasts and improving my game. Highly recommend!”",
      author: "Raul Espinoza",
      designation: "Tennis Player",
      image: "assets/how-it-works/players/player_h_1.png"
    },
    {
      rating: 5,
      quote: "“Thanks to the Limber app, I've found amazing hiking buddies: Its easy to connect with fellow hikers, andiVe discovered new trails with great company. Perfect for outdoor enthusiasts like me!”",
      author: "Anna Seccombe",
      designation: "Hiking",
      image: "assets/how-it-works/players/player_h_2.png"
    },
    {
      rating: 5,
      quote: "“Super easy for me to communicate with my open water swimming friends and tell them about idyllic new swimming spots and arrange get togethers. I love Limber and cannot stop talking about the App  with everyone I know and meet!”",
      author: "Maria Stancikoba",
      designation: "Open Water Swimming",
      image: "assets/how-it-works/players/player_h_3.jpg"
    },
    {
      rating: 5,
      quote: "“This Limber climbing app is a game-changer! I've discovered amazing new climbing sites and easily connected with a skilled climbing teacher. Perfect for anyone looking to elevate their climbing experience!”",
      author: "Brew Leahy",
      designation: "Climbing",
      image: "assets/how-it-works/players/player_h_4.png"
    },
    {
      rating: 5,
      quote: "“This Limber app is fantastic for tennis! I've easily found people to play with and joined several exciting competitions. It's perfect for connecting with fellow tennis enthusiasts and improving my game. Highly recommend!”",
      author: "Raul Espinoza",
      designation: "Tennis Player",
      image: "assets/how-it-works/players/player_h_1.png"
    },
    {
      rating: 5,
      quote: "“Thanks to the Limber app, I've found amazing hiking buddies: Its easy to connect with fellow hikers, andiVe discovered new trails with great company. Perfect for outdoor enthusiasts like me!”",
      author: "Anna Seccombe",
      designation: "Hiking",
      image: "assets/how-it-works/players/player_h_2.png"
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
