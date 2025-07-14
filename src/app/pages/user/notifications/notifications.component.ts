import {Component, Input, TemplateRef} from '@angular/core';
import {Router} from "@angular/router";
import {NgClass, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {Header2Component} from "../../../components/shared/header2/header2.component";
import {MainPageService} from "../../../components/commercial-website/main-page/main-page.service";
import {ToastService} from "angular-toastify";
import {ManualToastService} from "../../../shared/ManualToastService";
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";

const ToastTypes: any = {
  SUCCESS: 'bg-success text-light',
  DANGER: 'bg-danger text-light'
};

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    NgIf,
    Header2Component,
    NgForOf,
    NgbToast,
    NgTemplateOutlet,
    NgClass
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  extra: any = {};
  currentUser: any = false;
  headerShown: any = false;
  total_notifications = 0;


  constructor(
    private router: Router,
    private mainService: MainPageService,
    private _toastService: ToastService,
    protected toastService: ManualToastService,
  ) {
    this.onGetCurrentUser();
  }


  onGetCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      // alert('Please login again to continue');
      return;
    }
    this.currentUser = token;
    if (!this.currentUser) {
      this.router.navigate(['/']);
    }
    this.onGetPlayerRoles(`api/v1/notification-list`, 'data', 'notificationList');
    this.onGetPlayerRoles(`api/v1/user-connection-list`, 'data', 'connectionList');

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
        if (Array.isArray(this.extra[extraKey]) && this.extra[extraKey].every((item: any) => item?.created_at)) {
          this.extra[extraKey].sort((a: { created_at: string | number | Date; }, b: { created_at: string | number | Date; }) => {
            const dateA: any = new Date(a.created_at);
            const dateB: any = new Date(b.created_at);
            return dateB - dateA;
          });
        }
        if (extraKey === 'notificationList') {
          const readNotifications: any = [];
          const notifications = data[dataKey];
          notifications.forEach((notification: any) => {
            readNotifications.push(notification.id);
          });
          localStorage.setItem('readNotifications', JSON.stringify(readNotifications));
        }
      }
      this.headerShown = true;
    }, (err: any) => {
      this.headerShown = true;
    });
  }

  timeAgo(dateString: any) {
    const date: any = new Date(dateString);
    const now: any = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const units = [
      {name: "year", seconds: 31536000},
      {name: "month", seconds: 2592000},
      {name: "week", seconds: 604800},
      {name: "day", seconds: 86400},
      {name: "hour", seconds: 3600},
      {name: "minute", seconds: 60},
      {name: "second", seconds: 1},
    ];
    for (let unit of units) {
      const interval = Math.floor(diffInSeconds / unit.seconds);
      if (interval >= 1) {
        return `${interval} ${unit.name}${interval > 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  }

  onAcceptRejectFriendRequest(connection_id: any, type: any) {
    try {
      if (this.extra.loading) {
        console.log('Please Wait...');
        return;
      }
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login to continue');
      }
      let endPoint = `api/v1/user-connection-response`;
      let obj: any = {
        id: connection_id
      };

      /*   const connectionStatus = this.extra.connectionList?.find(((currentConnection: any) => currentConnection?.id === obj?.id));

         if (!connectionStatus) {
           throw new Error('The request no longer exists.');
         }*/
      if (!type) {
        throw new Error('Please specify what you would like to do with the request?');
      }

      if (type === 'accept') {
        obj.accepted_at = this.formatDate();
      } else if (type === 'rejected') {
        obj.rejected_at = this.formatDate();
      } else {
        obj.removed_at = this.formatDate();
      }

      this.extra.loading = true;

      this.mainService.onPostUsingToken(endPoint, obj, token).subscribe(
        (data: any) => {
          this.extra.loading = false;
          if (data.status === 200) {
            this.showToastMsg(data.message || "Updated Successfully", ToastTypes.SUCCESS);
            this.onGetCurrentUser();
          } else {
            this.showToastMsg(data.message || "Something went wrong");
          }
        }, (e: any) => {
          this.extra.loading = false;
          console.log(`--------------------Err while updating-`);
          this.showToastMsg(e?.message || (typeof e === 'string' ? e : 'Something went wrong'), ToastTypes.DANGER)
        });

    } catch (e: any) {
      this.showToastMsg(e?.message || (typeof e === 'string' ? e : 'Something went wrong'), ToastTypes.DANGER)
    } finally {
      //   this.extra.loading = false;
    }
  }

  showToastMsg(msg: any, type: any = ToastTypes.DANGER) {
    this.toastService.show(msg, {classname: type, delay: 3000});
  }

  formatDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0];
  };


  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }


}
