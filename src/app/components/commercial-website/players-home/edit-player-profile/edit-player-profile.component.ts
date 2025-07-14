import {Component, NgZone, OnInit} from '@angular/core';
import {SharedModule} from '../../../../shared.module';
import {FormBuilder, Validators} from '@angular/forms';
import {PlayersService} from '../players.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularToastifyModule, ToastService} from 'angular-toastify';
import {MainPageService} from "../../main-page/main-page.service";
import {LogoutService} from "../../../shared/header/header.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {ManualToastService} from "../../../../shared/ManualToastService";
import {Header2Component} from "../../../shared/header2/header2.component";
import {AvailabilityComponent} from "../../../../shared/player/availability/availability.component";
import {CustomSpinnerComponent} from "../../../../shared/custom-spinner/custom-spinner.component";

declare let google: any;

@Component({
  selector: 'app-edit-player-profile',
  standalone: true,
  imports: [SharedModule, AngularToastifyModule, NgSelectModule, Header2Component, AvailabilityComponent, CustomSpinnerComponent],
  templateUrl: './edit-player-profile.component.html',
  styleUrl: './edit-player-profile.component.css'
})

export class EditPlayerProfileComponent implements OnInit {
  formSubmitted = false
  isCompleteProfile: boolean = false;
  userId: any
  extra: any = {
    fieldsToRender: [],
    mode: null,
  };
  placeSuggesiton: any = [];
  playerDetailsData: any;
  playerDetailsForm: any;
  genderList: any;
  schoolList: any;
  universityList: any;
  companyList: any
  isUser: any = false;
  logoutPopup: any = false;
  currentUser: any = null;
  sportsData: any = [];
  abilityData: any = [];
  pictures: any = {};
  contact: any = {};
  canEditProfile: any = false;

  // sportsToPlayModal: boolean = false

  constructor(
    private fb: FormBuilder,
    private playersService: PlayersService,
    private route: ActivatedRoute,
    private _toastService: ToastService,
    private mainService: MainPageService,
    private logoutService: LogoutService,
    private router: Router,
    private modalService: NgbModal,
    protected toastService: ManualToastService,
    private ngZone: NgZone
  ) {
    ngZone.run(() => {
      this.getIdFromURL();
      const user = localStorage.getItem('token');
      // console.log(user);
      if (user) {
        this.isUser = user;
      }
    });
  }

  ngOnInit(): void {

  }

  createForm() {
    console.log("Players Details", this.playerDetailsData)
    const userUpdateName = (this.playerDetailsData?.user?.first_name || '') + " " +
      (this.playerDetailsData?.user?.last_name || '');
    this.playerDetailsForm = this.fb.group({
      user_id: [this.userId || '', Validators.required],
      gender_id: [this.playerDetailsData.gender_id || '', Validators.required],
      id: [this.playerDetailsData.id || '', Validators.required],
      profile_image: [this.playerDetailsData.profile_image || '', Validators.required],
      banner_image: [this.playerDetailsData.banner_image || '', Validators.required],
      dob: [this.playerDetailsData.age || '', Validators.required],
      ethnicity_id: [this.playerDetailsData.ethnicity_id || '', Validators.required],
      school_id: [this.playerDetailsData.school_id || '', Validators.required],
      university_id: [this.playerDetailsData.university_id || '', Validators.required],
      company_id: [this.playerDetailsData.company_id || '', Validators.required],
      location: [this.playerDetailsData.location || '', Validators.required],
      heading_tagline: [this.playerDetailsData.heading_tagline || '', Validators.required],
      about_me: [this.playerDetailsData.about_me || '', Validators.required],
      name: [userUpdateName || '', Validators.required],
      website_link: [this.playerDetailsData.website_link || '', Validators.required],
    });
  }

  getIdFromURL() {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      let currentUserID: any;
      let currentUser: any = localStorage.getItem('currentUser');
      if (currentUser) {
        currentUser = JSON.parse(currentUser);
        currentUserID = currentUser?.data[0] ? currentUser?.data[0]?.id : currentUser?.data?.id;
      }
      this.userId = params.get('id');
      this.canEditProfile = currentUserID === this.userId;
      console.log(currentUserID);
      this.getVarousData();
    });
  }

  async getVarousData() {
    this.playersService.getGenderList().subscribe(
      data => {
        if (data?.success === true && data?.status === 200) {
          // console.log("Get API Successful", data)
          this.genderList = data?.data
        } else {
          console.log("Get Gender Not Successful", data)
        }
      })
    this.playersService.getSchoolList().subscribe(
      data => {
        if (data?.success === true && data?.status === 200) {
          // console.log("Get API Successful", data)
          this.schoolList = data?.data
        } else {
          console.log("Get School Not Successful", data)
        }
      })
    this.playersService.getUniversityList().subscribe(
      data => {
        if (data?.success === true && data?.status === 200) {
          // console.log("Get API Successful", data)
          this.universityList = data?.data
        } else {
          console.log("Get University Not Successful", data)
        }
      })
    this.playersService.getCompanyList().subscribe(
      data => {
        if (data?.success === true && data?.status === 200) {
          // console.log("Get API Successful", data)
          this.companyList = data?.data
        } else {
          console.log("Get Company Not Successful", data)
        }
      });
    this.playersService.getPlayData().subscribe(
      data => {
        if (data?.success === true && data?.status === 200) {
          // console.log("Get API Successful", data)
          // console.log(data.data)
          this.sportsData = data?.data;
          console.log(this.sportsData);
        }
      });
    this.playersService.getAbilityData().subscribe(
      data => {
        if (data?.success === true && data?.status === 200) {
          // console.log("Get API Successful", data)
          // console.log(data.data)
          this.abilityData = data?.data;
          console.log(this.abilityData);
        }
      });
    let token = localStorage.getItem('token');
    if (token) {
      if (!this.canEditProfile) {
        token = '';
      }
      // console.log(token);
      this.onGetPlayerDetail(token);
      this.onGetPlayerRoles(`api/v1/sport-list`, token, 'data', 'playerRoles');
      this.onGetPlayerRoles(`api/v1/user-sports-club-list`, token, 'data', 'sportsClubList');
      // this.onGetPlayerRoles(`api/auth/user-list`, token, 'data', 'connectionList');
      this.onGetPlayerRoles(`api/v1/user-sport-list`, token, 'data', 'sportList');
      this.onGetPlayerRoles(`api/v1/schedule-list`, token, 'data', 'scheduleList');
      this.onGetPlayerRoles(`api/v1/get-contacts`, token, 'data', 'contactsData');
      this.onGetPlayerRoles(`api/v1/clubList-list`, token, 'data', 'clubList');
      this.onGetPlayerRoles(`api/v1/brand-list`, token, 'data', 'brandList');
      this.onGetPlayerRoles(`api/v1/activity-list`, token, 'data', 'activityList', true);
      this.onGetPlayerRoles(`api/v1/user-connection-list`, token, 'data', 'connectionList');
      this.onGetPlayerRoles(`api/v1/get-user-review`, token, 'data', 'reviews', true);
      this.onGetPlayerRoles(`api/v1/get-availability`, token, 'data', 'availability', true);
      this.onGetPlayerRoles(`api/v1/user-gallery-list`, token, 'data', 'gallery', true);
      this.onGetPlayerRoles(`api/v1/activity-type-list`, token, 'data', 'activityTypeList', true);
    }

  }

  onSaveData() {
    try {
      if (this.extra.loading) {
        console.log('Please Wait...');
        return;
      }
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login to continue');
      }
      let endPoint;
      let obj: any = {};

      for (let i = 0; i < this.extra.fieldsToRender?.length; i++) {
        const field = this.extra.fieldsToRender[i];
        if (field && field?.required && !this.extra[field?.key]) {
          throw new Error(`Please enter your ${field?.label}`);
        } else {
          if (this.extra.mode === 'availability') {
            obj[field?.key] = this.extra[field?.key] ? 'Yes' : 'No';
          } else {
            obj[field?.key] = this.extra[field?.key];
          }
        }
      }

      switch (this.extra.mode) {
        case 'sports':
          obj.play_id = this.extra.play_id;
          obj.ability_id = this.extra.ability_id;
          if (!obj.play_id) {
            throw new Error('Please choose your sport');
          }
          if (!obj?.ability_id) {
            throw new Error('Please choose your ability');
          }
          if (
            this.extra.modeType === 'update'
          ) {
            endPoint = 'api/v1/update-sport';
            obj.id = this.extra.modeTypeKey;
          } else {
            endPoint = 'api/v1/create-sport';
          }
          break;
        case 'club':
          if (
            this.extra.modeType === 'update'
          ) {
            endPoint = 'api/v1/update-user-sports-club';
            obj.id = this.extra.modeTypeKey;
          } else {
            endPoint = 'api/v1/create-user-sports-club';
          }
          break;
        case 'add-review':
          endPoint = 'api/v1/create-user-review';
          if (this.canEditProfile) {
            throw new Error('You cannot review yourself');
            return;
          }
          if (!obj.rating) {
            obj.rating = 0;
          }
          obj.user_id = this.userId;
          break;
        case 'highlights':
          endPoint = 'api/v1/create-user-gallery';
          break;
        case 'sportList':
          endPoint = 'api/v1/create-user-sport';
          break;
        case 'brand':
          endPoint = 'api/v1/create-brand';
          break;
        case 'activityList':
          endPoint = 'api/v1/create-activity';
          break;
        case 'availability':
          obj.schedule_id = this.extra.schedule_id;
          endPoint = 'api/v1/update-availability';
          if (!this.extra.id) {
            endPoint = 'api/v1/create-availability';
          } else {
            obj.id = this.extra.id;
            if (!obj?.id) {
              throw new Error('Please select availability first');
            }
          }
          if (!obj?.schedule_id) {
            throw new Error('Please select schedule first');
          }
          break;
        default:
          endPoint = null;
          obj = {};
      }


      if (Object.keys(obj)?.length < 1 || !endPoint) {
        throw new Error('Please fill all the required fields');
      }

      let newData: any = new FormData();
      if (this.extra.mode === 'club') {
        obj['club_id'] = this.extra['club_id'];
        if (!obj['club_id']) {
          throw new Error('Please select club first');
        }
      }
      if (this.extra.mode === 'sportList') {
        obj['play_id'] = this.extra['play_id'];
        if (!obj['play_id']) {
          throw new Error('Please select sport first');
        }
        obj['club_id'] = this.extra['club_id'];
        if (!obj['club_id']) {
          throw new Error('Please select club first');
        }
      }
      if (this.extra.mode === 'activityList') {
        obj['play_id'] = this.extra['play_id'];
        if (!obj['play_id']) {
          throw new Error('Please select sport first');
        }
        obj['activity_type_id'] = this.extra['activity_type_id'];
        if (!obj['activity_type_id']) {
          throw new Error('Please select Activity Type first');
        }
      }

      if (
        this.extra.mode === 'highlights' ||
        this.extra.mode === 'brand' ||
        this.extra.mode === 'activityList'
      ) {
        for (const key in obj) {
          if (key.includes('gallery_image') && obj[key][0] && obj[key][0]?.name) {
            let updatedFiles: any = [...obj[key]]
            updatedFiles.forEach((file: any) => {
              // Append each file with the key 'gallery_image[]'
              newData.append('gallery_image[]', file, file.name);
            });
            /* let updatedFiles: any = [...obj[key]]
             if (obj[key]?.length === 1) {
               newData.append(key, updatedFiles[0]);
             } else {
               newData.append(key, updatedFiles);
             }*/
          } else {
            newData.append(key, obj[key]);
          }
        }
      }
      let isFormData = false;
      if (
        this.extra.mode === 'highlights' ||
        this.extra.mode === 'brand' ||
        this.extra.mode === 'activityList'
      ) {
        isFormData = true;
      }

      this.extra.loading = true;

      this.mainService.onPostUsingToken(endPoint, isFormData ? newData : obj, token).subscribe(
        (data: any) => {
          this.extra.loading = false;
          this.extra = {
            fieldsToRender: [],
            mode: null,
          };
          if (data.status === 200) {
            (document.getElementById('closeModal')?.click());
            this._toastService.success(data.message || "Updated Successfully");
            this.onGetPlayerDetail(token);
            this.getVarousData();
          } else {
            this._toastService.error(data.message || "Something went wrong");
          }
        }, (err: any) => {
          this.extra.loading = false;
          console.log(`--------------------Err while updating-`);
          this._toastService.error(err?.message || (typeof err === 'string' ? err : JSON.stringify(err)));
        });

    } catch (e: any) {
      this._toastService.error(e?.message || (typeof e === 'string' ? e : 'Something went wrong'));
    } finally {
      //  this.extra.loading = false;
    }
  }

  onDeleteData(type: any, obj: any) {
    try {
      if (this.extra.loading) {
        console.log('Please Wait...');
        return;
      }
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login to continue');
      }

      let endPoint: any;
      switch (type) {
        case 'sports':
          endPoint = 'api/v1/delete-sport';
          break;
        case 'club':
          endPoint = 'api/v1/delete-user-sports-club';
          break;
        case 'highlights':
          endPoint = 'api/v1/delete-user-gallery-image';
          break;
        case 'sportList':
          endPoint = 'api/v1/delete-user-sport';
          break;
        case 'brand':
          endPoint = 'api/v1/delete-brand';
          break;
        case 'activityList':
          endPoint = 'api/v1/delete-activity';
          break;
        default:
          console.log('No endpoint specified');
          return;
      }

      const confirmed = window.confirm("Are you sure you want to delete this?");
      if (!confirmed) {
        return;
      }
      // console.log(endPoint);
      // console.log(obj);

      this.mainService.onGetUsingToken(endPoint, obj, token).subscribe(
        (data: any) => {
          this.extra.loading = false;
          if (data.status === 200) {
            (document.getElementById('closeModal')?.click());
            this._toastService.success(data.message || "Updated Successfully");
            this.onGetPlayerDetail(token);
            this.getVarousData();
          } else {
            this._toastService.error(data.message || "Something went wrong");
          }
        }, (err: any) => {
          this.extra.loading = false;
          console.log(`--------------------Err while deleting-`);
          this._toastService.error(err?.message || (typeof err === 'string' ? err : JSON.stringify(err)));
        });
    } catch (e: any) {
      this._toastService.error(e?.message || (typeof e === 'string' ? e : 'Something went wrong'));
    } finally {
      //  this.extra.loading = false;
    }
  }

  onGetPlayerDetail(token: any) {
    let endPoint: any;
    let params: any = {};
    let tuk: any = token;
    if (token && token?.trim()?.length > 0) {
      params.user_id = this.userId;
      endPoint = `api/v1/get-player-details`;
    } else {
      params.user_id = this.userId;
      endPoint = `api/v1/get-player-details-by-id`;
      tuk = null;
    }
    this.mainService.onGetUsingToken(endPoint, params, tuk).subscribe((data) => {
      this.playerDetailsData = data['data'];
      console.log(this.playerDetailsData);
      if (endPoint === `api/v1/get-player-details-by-id`) {
        if (this.playerDetailsData.review) {
          this.extra.reviews = this.playerDetailsData.review;
        }
        if (this.playerDetailsData.contacts) {
          this.extra.contactsData = this.playerDetailsData.contacts;
        }
      }
      console.log(this.extra.reviews);
      this.createForm();
      console.log(data);
    }, (err: any) => {
      console.log(err);
    });
  }

  onGetPlayerRoles(endPoint: any, token: any, dataKey: any, extraKey: any, noUserId = false) {
    const obj = {user_id: this.userId};
    this.mainService.onGetUsingToken(endPoint, noUserId ? {} : obj, token).subscribe((data) => {
      if (extraKey === 'clubList') {
        console.log(data);
      }
      if (data && data[dataKey]) {
        this.extra[extraKey] = data[dataKey];
      }
    });
  }

  handleCompleteProfile() {
    this.isCompleteProfile = !this.isCompleteProfile;
    if (this.isCompleteProfile) {
      this.createForm();
      (document.getElementById('myForm')?.scrollIntoView());
    }
  }

  // handleSportsToPlayModal() {
  //   this.sportsToPlayModal = !this.sportsToPlayModal
  // }

  async handleSavePlayerData() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to login again to continue');
        return;
      }
      this.formSubmitted = true
      console.log(this.playerDetailsForm);
      const valid = true; // this.playerDetailsForm.valid
      if (valid) {
        this.playersService.validateAllFormFields(this.playerDetailsForm)
        let obj = {
          ...this.playerDetailsForm.value
        }
        if (!obj?.name || obj?.name?.trim()?.length < 1) {
          alert('Please enter a valid name')
          return;
        }
        obj.first_name = obj?.name.split(' ')[0] || '';
        obj.last_name = obj?.name.split(' ')[1] || '';
        delete obj?.name;

        if (!obj?.location) {
          this._toastService.error('Please enter a valid location')
          return;
        }
        if (this.pictures.profile_image) {
          obj.profile_image = this.pictures.profile_image;
        }
        if (this.pictures.banner_image) {
          obj.banner_image = this.pictures.banner_image;
        }


        const coordinates = await this.getCoordinatesFromAddress(obj?.location);
        obj = {
          ...obj,
          ...coordinates
        };
        if (obj.dob) {
          obj.dob = this.formatDate2(obj.dob)
        }

        this.onUpdatePlayerContact(token);

        const newObj = new FormData();
        for (const key in obj) {
          newObj.append(key, obj[key]);
        }

        console.log(newObj);

        this.mainService.onPostUsingToken('api/v1/update-player-details', newObj, token).subscribe(
          (data: any) => {
            console.log(data)
            if (data.status === 200) {
              this._toastService.success(data.message || "Updated Successfully");
              this.onGetPlayerDetail(token);
              this.handleCompleteProfile();
              this.getVarousData();

            } else {
              this._toastService.error(data.message || "Something went wrong");
            }
          }, (err: any) => {
            console.log(`--------------------Err while updating-`);
            this._toastService.error(err?.message || (typeof err === 'string' ? err : JSON.stringify(err)));
          })
      } else {
        this.displayValidationErrors();
        // this._toastService.error('Pleas update all required fields');
      }
    } catch (e: any) {
      this._toastService.error(e?.message || e);
    } finally {
      this.formSubmitted = false
    }
  }

  calculateAge(birthDate: any): number {
    // Check if birthDate is provided and is a valid date
    if (!birthDate) {
      return 0;
    }

    // Parse the birthDate into a Date object
    const birthDateObj = new Date(birthDate);

    // Check if the parsed date is valid
    if (isNaN(birthDateObj.getTime())) {
      return 0;
    }

    // Get today's date
    const today = new Date();

    // Calculate the difference in years
    let age = today.getFullYear() - birthDateObj.getFullYear();

    // Check if the birthday has not occurred yet this year
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    const dayDifference = today.getDate() - birthDateObj.getDate();

    // If the current month is before the birth month, or it's the same month but the current date is before the birth date, subtract one year
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    // Return the calculated age
    return age >= 0 ? age : 0;
  }

  getAbilityByName(id: any) {
    return this.abilityData.find((a: any) => a.id == id);
  }

  onUpdatePlayerContact(token: any) {
    const obj: any = {
      contact_number1: '',
      contact_number2: '',
      contact_number3: '',
      facebook_link: '',
      instagram_link: '',
      twitter_link: '',
      youtube_link: '',
      linkedin_link: '',
      email: '',
      website_link1: '',
      website_link2: '',
      website_link3: '',
      video_profile_link: '',
    };
    for (const key in obj) {
      let newKey = key;
      if (newKey === 'email') {
        newKey = 'contactEmail';
      }
      obj[key] = ((document.getElementById(newKey) as HTMLInputElement)?.value) || '';
    }
    console.log(obj);
    this.mainService.onPostUsingToken('api/v1/update-contacts', obj, token).subscribe(
      (data: any) => {
        console.log(data)
      }, (err: any) => {
        console.log(`--------------------Err updating contact-`)
        console.log(err)
      })
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

  onEditAvailability(schedule: any, content: any) {
    console.log(schedule);
    this.openCenteredModal(content, 'availability', {
      schedule_id: schedule?.id,
      id: this.onFIndSchedule(schedule?.id)?.id
    });
  }

  openCenteredModal(content: any, type: any, extraData: any = {}, mode = 'add') {
    this.extra.mode = type;
    for (const key in extraData) {
      this.extra[key] = extraData[key];
    }
    this.extra.modeType = mode;
    switch (type) {
      case 'club':
        this.extra.fieldsToRender = [
          {key: 'title', label: 'Title', type: 'text', required: true},
          {key: 'description', label: 'Description', type: 'text', required: true},
          {key: 'address', label: 'Address', type: 'text', required: true},
        ];
        if (mode === 'update') {
          this.extra.title = extraData?.title;
          this.extra.description = extraData.description;
          this.extra.address = extraData.address;
          this.extra.club_id = extraData.club_id;
          this.extra.modeTypeKey = extraData?.id;
        }
        break;
      case 'sports':
        if (mode === 'update') {
          this.extra.ability_id = extraData.ability?.id;
          this.extra.play_id = extraData.play?.id;
          this.extra.modeTypeKey = extraData?.id;
        }
        break;
      case 'highlights':
        this.extra.fieldsToRender = [
          {key: 'title', label: 'Title', type: 'text', required: true},
          {key: 'description', label: 'Description', type: 'text', required: true, textarea: true},
          {
            key: 'gallery_image',
            label: 'Gallery Images',
            type: 'file',
            required: true,
            accept: 'image/*',
            multiple: true,
          },
        ];
        break;
      case 'activityList':
        this.extra.fieldsToRender = [
          {key: 'title', label: 'Activity Title', type: 'text', required: true},
          {key: 'date', label: 'Activity Date', type: 'date', required: true},
          {
            key: 'activity_image',
            label: 'Activity Image',
            type: 'file',
            required: true,
            accept: 'image/*',
            multiple: false,
          },
        ];
        break;
      case 'sportList':
        this.extra.fieldsToRender = [
          {key: 'title', label: 'Title', type: 'text', required: true},
          {key: 'description', label: 'Description', type: 'text', required: true, textarea: true},
          {key: 'address', label: 'Address', type: 'text', required: true},
        ];
        break;
      case 'add-review':
        this.extra.fieldsToRender = [
          {key: 'title', label: 'Title', type: 'text', required: true},
          {key: 'review', label: 'Your review', type: 'text', required: true, textarea: true},
          {key: 'rating', label: 'Rating', type: 'rating-picker', required: false},
        ];
        break;
      case 'brand':
        this.extra.fieldsToRender = [
          {key: 'brand_name', label: 'Title', type: 'text', required: true},
          {key: 'web_link', label: 'Description', type: 'text', required: true, textarea: true},
          {
            key: 'brand_image',
            label: 'Brand Image',
            type: 'file',
            required: true,
            accept: 'image/*',
            multiple: false,
          },
        ];
        break;
      case 'availability':
        const preFilledData = this.onFIndSchedule(extraData?.schedule_id);
        this.extra.fieldsToRender = [
          {key: 'sun', label: 'Sunday', type: 'checkbox', checked: (preFilledData?.sun === 'Yes')},
          {key: 'mon', label: 'Monday', type: 'checkbox', checked: (preFilledData?.mon === 'Yes')},
          {key: 'tue', label: 'Tuesday', type: 'checkbox', checked: (preFilledData?.tue === 'Yes')},
          {key: 'wed', label: 'Wednesday', type: 'checkbox', checked: (preFilledData?.wed === 'Yes')},
          {key: 'thu', label: 'Thursday', type: 'checkbox', checked: (preFilledData?.thu === 'Yes')},
          {key: 'fri', label: 'Friday', type: 'checkbox', checked: (preFilledData?.fri === 'Yes')},
          {key: 'sat', label: 'Saturday', type: 'checkbox', checked: (preFilledData?.sat === 'Yes')},
        ];
        for (let i = 0; i < this.extra?.fieldsToRender?.length; i++) {
          const field = this.extra?.fieldsToRender[i];
          if (field) {
            this.extra[field?.key] = field?.checked;
          }
        }
        console.log(this.extra);
        break;
      case 'report':
        this.extra.fieldsToRender = [
          {key: 'title', label: 'Title', type: 'text', required: true},
          {key: 'description', label: 'Description', type: 'text', required: true},
          {key: 'address', label: 'Address', type: 'text', required: true},
        ];
        return;
        break;
      default:
        this.extra.fieldsToRender = [];
        break;
    }
    console.log(type);
    console.log(this.extra.fieldsToRender);
    this.modalService.open(content, {centered: true});
  }

  onImagePick(ev: any, key: any, multiple: any) {
    if (key?.type !== 'file') {
      return;
    }
    if (!multiple) {
      if (!ev?.target?.files[0]) {
        return;
      }
      this.extra[key?.key] = ev?.target ? ev?.target?.files[0] : [];
    } else {
      this.extra[key?.key] = ev?.target ? ev?.target?.files : [];
    }
  }

  onImagePickUsingFormControl(ev: any, key: any) {
    this.pictures[key] = (ev?.target ? ev?.target?.files[0] : []);
    // this.playerDetailsForm.set(key, ev?.target ? ev?.target?.files[0] : []);
  }

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            resolve({latitude, longitude});
          },
          (error) => {
            console.error('Error getting location:', error);
            resolve(null);
          }
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
        resolve(null);
      }
    });
  }

  getCoordinatesFromAddress(address: string): Promise<{ latitude: number; longitude: number } | null> {
    return new Promise((resolve, reject) => {
      if (!address) {
        reject('Address is required to get coordinates.');
        return;
      }

      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({address}, (results: any, status: any) => {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
          const location = results[0].geometry.location;
          resolve({latitude: location.lat(), longitude: location.lng()});
        } else {
          console.error('Geocoding service failed:', status);
          reject(`Failed to get coordinates: ${status}`);
        }
      });
    });
  }

  getbannerImage() {
    return this.playerDetailsData?.banner_image ? `url('${this.playerDetailsData?.banner_image}')` : `url('/assets/WEBSITE\ -\ HOW\ IT\ WORKS\ FOR\ IMAGES/For\ Players/section-01-bg.png')`;
  }

  formatDate(dateString: any) {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString(undefined, {month: 'long'});
    const year = date.getFullYear();
    let dayWithSuffix;
    if (day === 1 || day === 21 || day === 31) {
      dayWithSuffix = `${day}st`;
    } else if (day === 2 || day === 22) {
      dayWithSuffix = `${day}nd`;
    } else if (day === 3 || day === 23) {
      dayWithSuffix = `${day}rd`;
    } else {
      dayWithSuffix = `${day}th`;
    }

    return `${dayWithSuffix} ${month} ${year}`;
  }

  viewPlayerFilter() {
    const queryParams: any = {'role_id': '1'};
    this.router.navigate(['/players-list'], {queryParams});
  }

  private displayValidationErrors() {
    Object.keys(this.playerDetailsForm.controls).forEach((key) => {
      const control = this.playerDetailsForm.get(key);
      if (control && control.invalid) {
        control.markAsTouched();
      }
    });
    const errorMessages = this.getFormErrorMessages();
    errorMessages.forEach((error) => {
      this._toastService.error(error);
    });
  }

  private getFormErrorMessages(): string[] {
    const messages: string[] = [];
    Object.keys(this.playerDetailsForm.controls).forEach((key) => {
      const control = this.playerDetailsForm.get(key);
      const label = this.fieldLabels[key] || key; // Use friendly label or fallback to key if not found

      if (control && control.errors) {
        if (control.errors.required) {
          messages.push(`${label} is required.`);
        }
        if (control.errors.minlength) {
          messages.push(
            `${label} must be at least ${control.errors.minlength.requiredLength} characters long.`
          );
        }
        if (control.errors.maxlength) {
          messages.push(
            `${label} cannot be more than ${control.errors.maxlength.requiredLength} characters long.`
          );
        }
        if (control.errors.email) {
          messages.push(`Invalid email format for ${label}.`);
        }
      }
    });
    return messages;
  }

  private fieldLabels: { [key: string]: string } = {
    user_id: 'User ID',
    gender_id: 'Gender',
    id: 'ID',
    profile_image: 'Profile Image',
    banner_image: 'Banner Image',
    dob: 'Date of Birth',
    ethnicity_id: 'Ethnicity',
    school_id: 'School',
    university_id: 'University',
    company_id: 'Company',
    location: 'Location',
    heading_tagline: 'Tagline',
    about_me: 'About Me',
    name: 'Name',
    website_link: 'Website Link'
  };

  protected readonly Array = Array;

  // In your Angular component (.ts file)
  openExternalLink(url: any) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  onFIndSchedule(schedule_id: any) {
    return this.extra?.availability?.find((schedule: any) => schedule?.schedule_id === schedule_id);
  }

  formatDate2(dateString: any) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  onFilterData(ev: any, key: any, cancelScroll = false, cancelBarHide = false) {
    let val = ev?.target ? ev?.target?.value : ev;
    if (key === 'location') {
      this.initializePlaceAutocomplete(ev);
    }
  }

  groupArrayIntoSubarrays(array: any | any[], groupSize: number) {
    const groupedArray = [];
    let groupNumber = 1;
    for (let i = 0; i < array.length; i += groupSize) {
      const subArray = array.slice(i, i + groupSize);
      groupedArray.push(subArray);
      groupNumber++;
    }
    return groupedArray;
  }

  selectSuggestion(val: any) {
    console.log(val);
    this.playerDetailsForm.get('location').setValue(val);


    this.placeSuggesiton = [];
  }

  initializePlaceAutocomplete(ev: any): void {
    const searchTerm = ev?.target ? ev?.target?.value : ev;
    if (searchTerm?.length < 1) {
      this.extra.showSuggestions = false;
      this.placeSuggesiton = [];
      return;
    }
    const autocompleteService = new google.maps.places.AutocompleteService();
    const suggestions: any[] = []; // Array to store suggestions
    const request = {
      input: searchTerm,
      types: ['geocode']
    };
    autocompleteService.getPlacePredictions(request, (predictions: any[], status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
        predictions.forEach((prediction) => {
          suggestions.push(prediction.description);
        });

        this.placeSuggesiton = suggestions;
        this.extra.showSuggestions = this.placeSuggesiton?.length > 0;
      } else {
        console.error('Autocomplete service failed:', status);
      }
    });
  }

  onBlockReport(data: any) {
    const obj = {
      other_user_id: this.userId, // this.playerDetailsData.id,
      blocked_at: this.formatDate3()
    }
    if (!obj.other_user_id) {
      alert('Other user needs to be selected');
      return;
    }
    let token = localStorage.getItem('token');
    if (!token) {
      alert('Please login again to continue');
      return;
    }
    if (this.extra.loading) {
      console.log('loading...')
      return;
    }
    console.log(this.playerDetailsData)
    this.extra.loading = true;

    const confirmed = window.confirm("Are you sure you want to block this user?");
    if (confirmed) {
      this.mainService.onGetUsingToken(`api/v1/user-connection-block`, obj, token).subscribe(
        (data: any) => {
          console.log(data);
          this.extra.loading = false;
          if (data.status === 200) {
            this.getVarousData();
          }
        }, (e: any) => {
          this.extra.loading = false;
          console.log(`--------------------Err while updating-`);
        });
    }
  }

  formatDate3 = () => {
    const date = new Date();
    return date.toISOString().split('T')[0];
  };


  protected window = window;

// TypeScript component code

  calculateOverallRating() {
    const reviews = this.extra.reviews || [];
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    const totalRating = reviews.reduce((sum: any, review: { rating: any; }) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    return Number(averageRating.toFixed(1));
  }

  onEleClick(eleId: any) {
    (document.getElementById(eleId)?.click());
  }

  protected readonly Math = Math;


}
