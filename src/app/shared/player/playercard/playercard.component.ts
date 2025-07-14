import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-playercard',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgStyle,
    NgClass
  ],
  templateUrl: './playercard.component.html',
  styleUrl: './playercard.component.css'
})
export class PlayercardComponent implements OnInit {

  @Input() player: any;
  @Input() sportsData: any;
  @Input() listView: any;
  @Input() width: any;
  @Input() gridViewHeight: any;
  @Input() connectionVisible: any = true;
  @Output() onPlayConnect = new EventEmitter<any>();

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
    console.log(this.gridViewHeight)
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

  onConnect(otherPlayer: any) {
    this.onPlayConnect.emit(otherPlayer);
  }

  onFindSport(ids: any) {
    let selSport;
    for (let i  = 0; i < ids?.length; i++) {
      if (!selSport) {
        const id = ids[i]?.play?.id;
        selSport = this.sportsData.find((currentSport: any) => currentSport?.id === id)?.name
      }
    }
    return selSport;
  }

  onGetSport(ids: any[]): string {
    let selSport = '';
    if (ids?.length) {
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i]?.play?.id;
        const sportName = this.sportsData.find((currentSport: any) => currentSport?.id === id)?.name;

        if (sportName) {
          selSport += (selSport ? ', ' : '') + sportName;
        }
      }
    }
    return selSport;
  }

  getTruncatedText(text: string, limit: number): string {
    if (text && text.length > limit) {
      return text.slice(0, limit - 3) + '...'; // Truncate and add ellipses if exceeding the limit
    }
    return text; // Return text as is if under the limit
  }

  handlePlayerDetailsView() {
    let currentUser: any = localStorage.getItem('currentUser');
    if (currentUser) {
      let userId = this.player.user?.id;
      let endPoint = '';
      if (userId) {
        userId = this.player.user?.id;
        endPoint = '/edit-coach';
      } else {
        userId = this.player?.player?.user_id;
        endPoint = '/player-details';
      }
      this.router.navigate([`${endPoint}/${userId}`]);
    } else {
      this.router.navigate(['/login']);
    }


  }

  getCurrentUser() {
    let currentUserID: any;
    let currentUser: any = localStorage.getItem('currentUser');
    if (currentUser) {
      currentUser = JSON.parse(currentUser);
      currentUserID = currentUser?.data[0] ? currentUser?.data[0]?.id : currentUser?.data?.id;
    }
    return currentUserID;
  }

  protected readonly Number = Number;
  protected readonly Math = Math;
}
