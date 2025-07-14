import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.css'
})
export class AvailabilityComponent implements OnInit {

  @Input() scheduleList: any = [];
  @Input() availability: any = [];
  @Input() onEdit: any;
  @Output() onEditAvailability = new EventEmitter<any>();
  @Input() content: any;

  ngOnInit() {
    console.log({
      avail: this.availability,
      schedule: this.scheduleList
    });
  }


  onFIndSchedule(schedule_id: any) {
    return this?.availability?.find((schedule: any) => schedule?.schedule_id === schedule_id);
  }

  public editAvailability(schedule: any) {
    // this.onEdit(this.content, 'availability', { schedule_id: schedule?.id, id: this.onFIndSchedule(schedule?.id)?.id });
    this.onEditAvailability.emit(schedule); // Emit the schedule data
  }

}
