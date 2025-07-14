import { Component, OnInit } from '@angular/core';
import { LocalPlayersService } from './local-players.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-local-players',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './local-players.component.html',
  styleUrl: './local-players.component.css'
})
export class LocalPlayersComponent implements OnInit {
  playerData: any

  constructor(
    private localPlayerService: LocalPlayersService
  ) { }


  ngOnInit(): void {
    this.getPlayerData()
  }

  getPlayerData() {
    this.localPlayerService.getPlayerData().subscribe(
      data => {
        if (data.status === 200) {
          console.log("Get API Successfull")
          // console.log(data.data)
          this.playerData = data.data.data;
          console.log(this.playerData);
        } else {
          console.log("Get API Not Successfull")
        }
      }
    )
  }
  getTruncatedTextByWords(text: string, wordLimit: number = 10): string {
    if (!text) return '';

    // Split the text into words
    const words = text.split(' ');

    // If the number of words is less than or equal to the limit, return the original text
    if (words.length <= wordLimit) return text;

    // Join the first 'wordLimit' words and add ellipsis
    return words.slice(0, wordLimit).join(' ') + '...';
  }

  returnImg(data: any) {
    let img;
    if (data?.player && Array.isArray(data?.player)) {
      img = data?.player[0]?.profile_image
    } else if (data?.player && typeof data?.player === 'object') {
      img = data?.player?.profile_image
    }
    if (!img) {
      img = '/assets/icons/default.jpg';
    }
    return img;
  }



}
