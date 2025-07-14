import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { BannerComponent } from '../banner/banner.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-or-competitions-home',
  standalone: true,
  imports: [SharedModule,NgbCarouselModule, BannerComponent],
  templateUrl: './events-or-competitions-home.component.html',
  styleUrl: './events-or-competitions-home.component.css'
})
export class EventsOrCompetitionsHomeComponent {
  constructor(
    private router: Router
  ) {
  }
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover: boolean = true;
  pauseOnFocus: boolean = false;
  showNavigationIndicators = true;
  showNavigationArrows = false;
  wrap = true;
  isCoachesListView: boolean = false;

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

  handleEventsOrCompListPage() {
    this.router.navigate(['/events-list'])
  }

}