import {Component, OnInit} from '@angular/core';
import { SharedModule } from '../../../../shared.module';
import { PlayersService } from '../players.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.css'
})
export class PlayerDetailsComponent implements OnInit {
  userId: any
  playerDetailsData: any;

  constructor(
    private playersService: PlayersService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.getIdFromURL()
    this.getPlayersData()
  }

  getIdFromURL() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.userId = id;
    });
  }

  getPlayersData() {
    this.playersService.getPlayerDetails(this.userId).subscribe(
      data => {
        if (data?.success === true && data?.status === 200) {
          console.log("Get API Successful", data)
          console.log(data.data)
          this.playerDetailsData = data?.data
        } else {
          console.log("Get API Not Successful", data)
        }
      })
  }
}
