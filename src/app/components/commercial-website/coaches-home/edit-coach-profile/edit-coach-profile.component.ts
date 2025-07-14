import {AfterViewInit, Component, ElementRef, NgZone, OnInit, Renderer2} from '@angular/core';
import {SharedModule} from '../../../../shared.module';
import {CoachesService} from '../coaches.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PlayersService} from "../../players-home/players.service";
import {AngularToastifyModule, ToastService} from "angular-toastify";
import {MainPageService} from "../../main-page/main-page.service";
import {LogoutService} from "../../../shared/header/header.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ManualToastService} from "../../../../shared/ManualToastService";
import {Header2Component} from "../../../shared/header2/header2.component";
import {FeaturedComponent} from "../../../../shared/player/featured/featured.component";
import { firstValueFrom } from 'rxjs'; // Import the helper function

declare let google: any;

@Component({
  selector: 'app-edit-coach-profile',
  standalone: true,
  imports: [SharedModule, AngularToastifyModule, Header2Component, FeaturedComponent],
  templateUrl: './edit-coach-profile.component.html',
  styleUrl: './edit-coach-profile.component.css'
})
export class EditCoachProfileComponent implements OnInit, AfterViewInit {

  formSubmitted = false
  isCompleteProfile: boolean = false;
  userId: any
  extra: any = {
    fieldsToRender: [],
    mode: null,
  };
  placeSuggesiton: any = [];
  coachDetailsData: any;
  coachDetailsForm: any;
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
  gradientColor = 'linear-gradient(180deg, #f45683 0.00%, #f55f7b 17.82%, #fda543 78.32%, #ffb636 100.00%)';

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
    private ngZone: NgZone,
  ) {
    ngZone.run(() => {
      this.getIdFromURL();
      const userT = localStorage.getItem('currentUser');
      const user = localStorage.getItem('token');
      console.log(userT);
      if (user) {
        this.isUser = user;
      }
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
  }

  createForm() {
    console.log("Players Details", this.coachDetailsData)
    const userUpdateName = (this.coachDetailsData?.user?.first_name || '') + " " +
      (this.coachDetailsData?.user?.last_name || '');
    this.coachDetailsForm = this.fb.group({
      user_id: [this.userId || '', Validators.required],
      gender_id: [this.coachDetailsData.gender_id || '', Validators.required],
      id: [this.coachDetailsData.id || '', Validators.required],
      profile_image: [this.coachDetailsData.profile_image || '', Validators.required],
      banner_image: [this.coachDetailsData.banner_image || '', Validators.required],
      dob: [this.coachDetailsData.age || '', Validators.required],
      ethnicity_id: [this.coachDetailsData.ethnicity_id || '', Validators.required],
      school_id: [this.coachDetailsData.school_id || '', Validators.required],
      university_id: [this.coachDetailsData.university_id || '', Validators.required],
      company_id: [this.coachDetailsData.company_id || '', Validators.required],
      location: [this.coachDetailsData.location || '', Validators.required],
      heading_tagline: [this.coachDetailsData.heading_tagline || '', Validators.required],
      about_me: [this.coachDetailsData.about_me || '', Validators.required],
      name: [userUpdateName || '', Validators.required],
      website_link: [this.coachDetailsData.website_link || '', Validators.required],
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
      this.onGetPlayerRoles(`api/v1/coaching-session-list`, token, 'data', 'coachingSessionList');
      this.onGetPlayerRoles(`api/v1/user-sports-club-list`, token, 'data', 'sportsClubList');
      this.onGetPlayerRoles(`api/v1/credential-list`, token, 'data', 'credentialList');
      this.onGetPlayerRoles(`api/v1/coaching-session-package-type-list`, token, 'data', 'sessionPackageTypeList');
      this.onGetPlayerRoles(`api/v1/faq-list`, token, 'data', 'faqList');
      this.onGetPlayerRoles(`api/v1/speciality-list`, token, 'data', 'specialityList');
      this.onGetPlayerRoles(`api/v1/coach-service-coaching-type-list`, token, 'data', 'coachingTypeList');
      this.onGetPlayerRoles(`api/v1/gender-list`, token, 'data', 'coachingGenderList');
      this.onGetPlayerRoles(`api/v1/coach-service-age-list`, token, 'data', 'coachingAgeList');
      this.onGetPlayerRoles(`api/v1/coach-service-special-aid-list`, token, 'data', 'coachingSpecialAid');
      this.onGetPlayerRoles(`api/v1/coach-service-list`, token, 'data', 'serviceList');
      this.onGetPlayerRoles(`api/v1/accreditation-list`, token, 'data', 'accreditationList');
      this.onGetPlayerRoles(`api/v1/get-contacts`, token, 'data', 'contactsData');
      this.onGetPlayerRoles(`api/v1/get-user-review`, token, 'data', 'reviews', true);
      this.onGetPlayerRoles(`api/v1/ability-list`, token, 'data', 'abilityLists', true);
      this.onGetPlayerRoles(`api/v1/brand-list`, token, 'data', 'brandList');
      this.onGetPlayerRoles(`api/v1/clubList-list`, token, 'data', 'clubList');
      this.onGetPlayerRoles(`api/v1/user-gallery-list`, token, 'data', 'gallery', true);
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
        case 'accreditations':
          endPoint = 'api/v1/create-accreditation';
          break;
        case 'coaching_session_package':
          endPoint = 'api/v1/create-coaching-session-package';
          obj.coaching_session_id = this.extra.coaching_session_id;
          if (!obj?.coaching_session_id) {
            throw new Error('Please select coaching session first');
          }
          if (Number(obj?.price) < 1) {
            throw new Error('Please enter a valid price');
          }
          break;
        case 'services':
          endPoint = 'api/v1/create-coach-service';
          for (const key in obj) {
            if (obj[key]) {
              obj[key] = obj[key].toString();
            }
          }
          break;
        case 'coaching_session':
          endPoint = 'api/v1/create-coaching-session';
          obj.club_list_id = obj.clubList_ids;
          delete obj.clubList_ids;
          break;
        case 'brand':
          endPoint = 'api/v1/create-brand';
          break;
        case 'faqs':
          endPoint = 'api/v1/create-faq';
          break;
        case 'credentials':
          endPoint = 'api/v1/create-credential';
          obj.speciality_ids = this.extra.speciality_ids;
          obj.clubList_ids = this.extra.clubList_ids;
          if (!obj?.speciality_ids) {
            throw new Error('Please select speciality first');
          }
          if (!obj?.clubList_ids) {
            throw new Error('Please select club first');
          }
          break;
        case 'highlights':
          endPoint = 'api/v1/create-user-gallery';
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
      endPoint = `api/v1/get-coach-details`;
    } else {
      params.user_id = this.userId;
      endPoint = `api/v1/get-coach-details-by-id`;
      tuk = null;
    }
    this.mainService.onGetUsingToken(endPoint, params, tuk).subscribe((data) => {
      this.coachDetailsData = data['data'];
      console.log(this.coachDetailsData);
      if (endPoint === `api/v1/get-coach-details-by-id`) {
        if (this.coachDetailsData.review) {
          this.extra.reviews = this.coachDetailsData.review;
        }
        if (this.coachDetailsData.contacts) {
          this.extra.contactsData = this.coachDetailsData.contacts;
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
    this.mainService.onGetUsingToken(endPoint, noUserId ? {} : obj, token).subscribe(async (data) => {

      if (extraKey === 'coachingSessionList') {
        console.log(data);
      }
      if (data && data[dataKey]) {
        let newData: any = [];
        if (extraKey === 'coachingSessionList') {
          for (let i = 0; i < data[dataKey]?.length; i++) {
            const packagesData = await firstValueFrom(
              this.mainService.onGetUsingToken(
                `api/v1/coaching-session-package-list`,
                { coaching_session_id: data[dataKey][i]?.id },
                token
              )
            );
            newData.push({
              ...data[dataKey][i],
              packages: packagesData
            });
          }
          console.log(newData);
        }
        this.extra[extraKey] = newData?.length > 0 ? newData : data[dataKey];
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
      console.log(this.coachDetailsForm);
      const valid = true; // this.coachDetailsForm.valid
      if (valid) {
        this.playersService.validateAllFormFields(this.coachDetailsForm)
        let obj = {
          ...this.coachDetailsForm.value
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

        this.mainService.onPostUsingToken('api/v1/update-coach-details', newObj, token).subscribe(
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

  openCenteredModal(content: any, type: any, extraData: any = {}) {
    this.extra.mode = type;
    for (const key in extraData) {
      this.extra[key] = extraData[key];
    }
    switch (type) {
      case 'accreditations':
        this.extra.fieldsToRender = [
          {key: 'name', label: 'Name', type: 'text', required: true},
          {key: 'certification_number', label: 'Certification Number ', type: 'number', required: true},
          {key: 'qualification_date', label: 'Qualification Date', type: 'date', required: true},
          {key: 'expiry_date', label: 'Expiry Date', type: 'date', required: true},
        ];
        break;
      case 'coaching_session_package':
        this.extra.coaching_session_id = extraData;
        this.extra.fieldsToRender = [
          {key: 'price', label: 'Price ', type: 'number', required: true},
          {key: 'coaching_session_package_type_id', label: 'Choose Package Type', type: 'coaching_session_package_types', required: true}
        ];
        break;
      case 'faqs':
        this.extra.fieldsToRender = [
          {key: 'title', label: 'Title', type: 'text', required: true},
          {key: 'description', label: 'Description', type: 'number', required: true, textarea: true}
        ];
        break;
      case 'services':
        this.extra.fieldsToRender = [
          {key: 'coach_service_age_ids', label: 'Choose Ages', type: 'coach_service_age_ids', required: true},
          {key: 'gender_ids', label: 'Choose Genders', type: 'gender_ids', required: true, textarea: true},
          {
            key: 'coach_service_coaching_type_ids',
            label: 'Choose Coaching Types',
            type: 'coach_service_coaching_type_ids',
            required: true,
            textarea: true
          },
          {
            key: 'coach_service_special_aid_ids',
            label: 'Choose Special Aid',
            type: 'coach_service_special_aid_ids',
            required: true,
            textarea: true
          },
        ];
        break;
        case 'coaching_session':
        this.extra.fieldsToRender = [
          {key: 'coach_service_age_id', label: 'Choose Ages', type: 'coach_service_age_ids', required: true},
          {key: 'gender_id', label: 'Choose Genders', type: 'gender_ids', required: true, textarea: true},
          {key: 'clubList_ids', label: 'Choose Club', type: 'club_list_id', required: true, textarea: true},
          {
            key: 'coach_service_coaching_type_id',
            label: 'Choose Coaching Types',
            type: 'coach_service_coaching_type_ids',
            required: true,
            textarea: true
          },
          {
            key: 'ability_id',
            label: 'Choose Ability Types',
            type: 'ability_ids',
            required: true,
            textarea: true
          },
          {key: 'available_places', label: 'Available Place', type: 'location', required: true},
          {key: 'session_time', label: 'Session Time', type: 'datetime-local', required: true},

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
      case 'credentials':
        this.extra.fieldsToRender = [
          {key: 'credentials', label: 'Credentials ', type: 'text', required: true, textarea: true},
          /*{key: 'speciality_ids', label: 'Specialities', type: 'text', required: true},
          {key: 'clubList_ids', label: 'Club Lists', type: 'text', required: true},*/
          {key: 'location', label: 'Location', type: 'location', required: true},
        ];
        break;
      default:
        this.extra.fieldsToRender = [];
        break;
    }
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
    // this.coachDetailsForm.set(key, ev?.target ? ev?.target?.files[0] : []);
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
    return this.coachDetailsData?.banner_image ? `url('${this.coachDetailsData?.banner_image}')` : `url('/assets/WEBSITE\ -\ HOW\ IT\ WORKS\ FOR\ IMAGES/For\ Players/section-01-bg.png')`;
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
    Object.keys(this.coachDetailsForm.controls).forEach((key) => {
      const control = this.coachDetailsForm.get(key);
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
    Object.keys(this.coachDetailsForm.controls).forEach((key) => {
      const control = this.coachDetailsForm.get(key);
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
    this.coachDetailsForm.get('location').setValue(val);


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
        console.log(`----------------------`);
        console.log(suggestions);
        this.placeSuggesiton = suggestions;
        this.extra.showSuggestions = this.placeSuggesiton?.length > 0;
      } else {
        console.error('Autocomplete service failed:', status);
      }
    });
  }


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

  onCheckboxChange(ageId: number, event: any, key: any): void {
    const isChecked = event.target.checked;
    if (!this.extra[key]) {
      this.extra[key] = [];
    }
    if (isChecked) {
      this.extra[key].push(ageId);
    } else {
      const index = this.extra[key].indexOf(ageId);
      if (index > -1) {
        this.extra[key].splice(index, 1);
      }
    }
  }

  onGetService(key: any = null) {
    const serviceList = this.extra?.serviceList;
    if (!Array.isArray(serviceList) || serviceList.length === 0) {
      console.warn("Service list is either empty or not an array");
      return null;
    }
    let l = serviceList.length - 1;
    let service = serviceList[l] ?? {};
    return key ? service[key] : service;
  }


  onSetActiveAccordian(e: any) {
    // Get all faq-content elements and remove 'active' class
    const allFaqContent = document.querySelectorAll('.faq-item');
    const allFaqTitle = document.querySelectorAll('.faq-title');
    allFaqContent.forEach((faq: Element) => {
      faq.classList.remove('active');
    });
    allFaqTitle.forEach((faq: Element) => {
      faq.classList.remove('activecss');
    });

    // Find the closest faq-item element (the parent div)
    const faqItem: any = e.currentTarget;

    // Find the faq-content inside the clicked faq-item
    const faqTitle = faqItem.querySelector('.faq-title');

    // Add the 'active' class to the specific faq-content
    faqTitle.classList.add('activecss');

    console.log(faqTitle);
    if (e.currentTarget) {
      e.currentTarget.classList.add('active');
    }
  }

  onEleClick(eleId: any) {
    (document.getElementById(eleId)?.click());
  }

  protected readonly Math = Math;

}
