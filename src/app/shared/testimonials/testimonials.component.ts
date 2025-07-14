import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {NgbCarousel, NgbSlide, NgbSlideEvent, NgbSlideEventSource} from "@ng-bootstrap/ng-bootstrap";
import {ViewTypeService} from "../ViewTypeService";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [
    NgbCarousel,
    NgbSlide,
    NgIf,
    NgForOf
  ],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent implements OnInit{

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  showNavigationIndicators = true;
  showNavigationArrows = false;
  wrap = true;
  viewType: any;

  @Input() crouselData: any = [];
  backupdata: any = [];

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  constructor(
  ) {

  }

  ngOnInit() {
    this.updateViewType();
  }


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


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateViewType();
  }

  private updateViewType(): void {
    const width = window.innerWidth;
    if (width >= 1024) {
      this.viewType = 'desktop';
    } else if (width >= 768 && width < 1024) {
      this.viewType = 'middle';
    } else if (width >= 641 && width < 768) {
      this.viewType = 'tablet';
    } else {
      this.viewType = 'mobile';
    }
    const backupdata = this.rearrangeArray(this.viewType, this.crouselData);
    if (JSON.stringify(backupdata) !== JSON.stringify(this.backupdata)) {
      this.backupdata = backupdata;
    }
  }

  rearrangeArray(viewtype: any, array: any) {
    let groupSize;
    switch (viewtype) {
      case 'desktop':
        groupSize = 3;
        break;
      case 'middle':
        groupSize = 3;
        break;
      case 'tablet':
        groupSize = 2;
        break;
      case 'mobile':
        groupSize = 1;
        break;
      default:
        groupSize = 1;
    }
    const result = [];
    for (let i = 0; i < array.length; i += groupSize) {
      const nestedGroup = array.slice(i, i + groupSize);
      result.push({nestedData: nestedGroup});
    }

    return result;
  }

}
