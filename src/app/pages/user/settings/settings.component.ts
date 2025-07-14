import {Component, OnInit, TemplateRef} from '@angular/core';
import {ManualToastService} from "../../../shared/ManualToastService";
import {MainPageService} from "../../../components/commercial-website/main-page/main-page.service";
import {PlayersService} from "../../../components/commercial-website/players-home/players.service";
import {Router} from "@angular/router";
import {Header2Component} from "../../../components/shared/header2/header2.component";
import {NgClass, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";

const ToastTypes: any = {
  SUCCESS: 'bg-success text-light',
  DANGER: 'bg-danger text-light'
};

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    Header2Component,
    NgForOf,
    NgIf,
    NgbToast,
    NgClass,
    NgTemplateOutlet
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  currentUser: any = false;
  extra: any = {};
  sportsData: any = [];

  constructor(
    protected toastService: ManualToastService,
    private mainService: MainPageService,
    private playersService: PlayersService,
    private router: Router
  ) {
    this.onGetCurrentUser();
  }

  ngOnInit() {
    this.getSportsData();
  }

  getSportsData() {
    this.playersService.getPlayData().subscribe(
      (data: any) => {
        if (data?.success === true && data?.status === 200) {
          // console.log("Get API Successful", data)
          // console.log(data.data)
          this.sportsData = data?.data
        }
      });
  }

  onGetCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    this.currentUser = token;
    this.onGetPlayerRoles(`api/v1/user-blocked-list`, 'data', 'blockedList');
    this.onGetPlayerRoles(`api/v1/user-report-list`, 'data', 'reportedList');
    // this.onGetPlayerRoles(`api/v1/player-list`,  'data', 'connectionList');
  }

  onGetPlayerRoles(endPoint: any, dataKey: any, extraKey: any, noUserId = false) {
    let token = localStorage.getItem('token');
    let currentUserID: any;
    let currentUser: any = localStorage.getItem('currentUser');
    if (currentUser) {
      currentUser = JSON.parse(currentUser);
      currentUserID = currentUser?.data[0] ? currentUser?.data[0]?.id : currentUser?.data?.id;
    }
    const obj = {user_id: currentUserID};
    this.mainService.onGetUsingToken(endPoint, noUserId ? {} : obj, token).subscribe((data) => {
      if (extraKey === 'connectionList') {
        console.log(data);
      }
      if (data && data[dataKey]) {
        this.extra[extraKey] = data[dataKey];
        console.log(this.extra);
      }
    });
  }

  async onPlayerDisconnect(id : any) {
    try {
      if (!id) {
        this.showToastMsg('No request were found', ToastTypes.DANGER);
        return;
      }
      const token = localStorage.getItem('token');
      if (!token) {
        this.showToastMsg('Please login again to continue', ToastTypes.DANGER);
        return;
      }
      let currentUser: any = localStorage.getItem('currentUser');
      if (!currentUser) {
        this.showToastMsg('You need to be logged in to continue', ToastTypes.DANGER);
        return;
      }
      currentUser = JSON.parse(currentUser);

      const queryParams = {
        other_user_id : id,
        unblocked_at: this.formatDate()
      };
      console.log(queryParams);
      this.mainService.onGetUsingToken('api/v1/user-connection-unblock', queryParams, token).subscribe((data) => {
        console.log(data);
        if (data?.status === 200) {
          (document?.getElementById('closeModal')?.click())
          this.showToastMsg('Connection has been disconnected ', ToastTypes.SUCCESS);
          this.onGetCurrentUser();
        } else {
          if (data?.message) {
            this.showToastMsg(data?.message, ToastTypes.DANGER);
          } else if (data?.errors && Array.isArray(data?.errors)) {
            for (let i = 0; i < data?.errors?.length; i++) {
              this.showToastMsg(data?.errors[i], ToastTypes.DANGER);
            }
          } else {
            this.showToastMsg('Something went wrong, please try again later', ToastTypes.DANGER);
          }
        }
        // this.isPlayersCard = true;
      });
    } catch (e) {
      console.log('Could not connect');
      console.log(e);
    }
  }

  showToastMsg(msg: any, type: any = ToastTypes.DANGER) {
    this.toastService.show(msg, {classname: type, delay: 3000});
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

  handlePlayerDetailsView(player: any) {
    this.router.navigate([`/player-details/${player}`]);
  }

  formatDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0];
  };

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }

  protected readonly Array = Array;
}
