import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import {
  NgbCarousel,
  NgbCarouselModule,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { BannerComponent } from '../banner/banner.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facilities-home',
  standalone: true,
  imports: [SharedModule, NgbCarouselModule, BannerComponent],
  templateUrl: './facilities-home.component.html',
  styleUrl: './facilities-home.component.css',
})
export class FacilitiesHomeComponent {
  constructor(private router: Router) {}
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
    this.router.navigate(['/home']);
  }

  handleFacilitiesListPage() {
    this.router.navigate(['/facilities-list']);
  }
}
