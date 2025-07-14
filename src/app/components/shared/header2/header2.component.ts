import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {MainPageService} from "../../commercial-website/main-page/main-page.service";
import {ToastService} from "angular-toastify";
import {LogoutService} from "../header/header.service";
import {ManualToastService} from "../../../shared/ManualToastService";
import {end} from "@popperjs/core";

@Component({
  selector: 'app-header2',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './header2.component.html',
  styleUrl: './header2.component.css'
})
export class Header2Component implements OnInit {
  playerDetailsData: any;
  logoutPopup = false;
  isUser: any;
  currentUserID: any;
  extra: any = {};
  total_notifications = 0;
  @Input() notification_toast: any = true;
  @Output() onPlayConnect = new EventEmitter<any>();
  @Output() handleCompleteProfile = new EventEmitter<any>();


  constructor(
    private mainService: MainPageService,
    private router: Router,
    private _toastService: ToastService,
    private logoutService: LogoutService,
    protected toastService: ManualToastService,
  ) {
    this.onGetPlayerDetail();
  }

  ngOnInit() {
    this.onGetPlayerRoles(`api/v1/notification-list`, 'data', 'notificationList');
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
      if (extraKey === 'notificationList') {
        // console.log(data);
      }
      if (data && data[dataKey]) {
        this.extra[extraKey] = data[dataKey];
        if (extraKey === 'notificationList') {
          const readNotifications = new Set(
            JSON.parse(localStorage.getItem('readNotifications') || '[]').map(String) // Convert all to string for consistent comparison
          );
          const notifications = data[dataKey];
          const unreadNotifications = notifications.filter(
            (notification: any) => !readNotifications.has(String(notification.id))
          );
          this.total_notifications = unreadNotifications.length;
        }
        // console.log(this.extra);
      }
    });
  }

  onNavigate() {
    let currentUser: any = localStorage.getItem('currentUser');
    if (currentUser) {
      currentUser = JSON.parse(currentUser);
    }
    if (!currentUser) {
      alert('Please login to continue');
      return;
    }
    let uri = '';
    console.log({
      ype: currentUser.data[0].profile_type,
      user: currentUser
    })
    switch (currentUser.data[0].profile_type) {
      case 'Player':
        uri = '/edit-player/';
        break;
      case 'Coach':
        uri = '/edit-coach/';
        break;
    }
    if (!uri) {
      alert('Something went wrong');
      return;
    }
    const url = window.location.href;
    const link = `${uri}${this.currentUserID}`;
    if (
      url.includes('edit-player') ||
      url.includes('edit-coach')
    ) {
      this.handleCompleteProfile.emit();
    } else {
      this.router.navigate([link]);
    }

    // console.log('--------------');
    // console.log(this.currentUserID);
  }

  handlePlayerDetailsView(id: any) {
    console.log(id);
    // this.router.navigate([`/edit-player/${id}`]);
  }

  onGetPlayerDetail() {
    let currentUserID: any;
    let currentUser: any = localStorage.getItem('currentUser');
    if (currentUser) {
      currentUser = JSON.parse(currentUser);
      currentUserID = currentUser?.data[0] ? currentUser?.data[0]?.id : currentUser?.data?.id;
    }
    const token = localStorage.getItem('token');
    if (token) {
      this.isUser = token;
    }
    this.currentUserID = currentUserID;
    const profile_type = (currentUser && currentUser?.data && currentUser?.data[0]) ? currentUser?.data[0]?.profile_type : 'Player';
    let endPoint = '';
    if (profile_type === 'Coach') {
      endPoint = `api/v1/get-coach-details`
    } else {
      endPoint = `api/v1/get-player-details`;
    }
    this.mainService.onGetUsingToken(endPoint, {user_id: currentUserID}, token).subscribe((data) => {
      this.playerDetailsData = data['data'];
      console.log(this.playerDetailsData);
    }, (err: any) => {
      console.log(err);
    });
  }


  handleLogout() {
    localStorage.clear();
    this.toastService.clear();
    this.logoutService.logoutUser().subscribe((
      (data) => {
        if (data.status === 200) {
          this._toastService.success(data.message);
          this.router.navigate(['/login']);
        } else {
          this._toastService.error(data.message);
        }
      }
    ))

  }

  viewPlayerFilter() {
    const queryParams: any = {'role_id': '1'};
    this.router.navigate(['/players-list'], {queryParams});
  }

  viewCoachFilter() {
    const queryParams: any = {'role_id': '4'};
    this.router.navigate(['/coaches-list'], {queryParams});
  }


}
