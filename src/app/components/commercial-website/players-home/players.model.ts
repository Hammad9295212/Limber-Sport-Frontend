export class PlayerDetails {
    status: number;
    success: boolean;
    errors: string[];
    message: string;
    auth: boolean;
    data: PlayerDetailsObj[]
}

export class PlayerDetailsObj {
    id: number;
    uuid: string;
    user_id: number;
    profile_image: string;
    banner_image: string;
    dob: string;
    ethnicity_id: null;
    school_id: null;
    university_id: null;
    company_id: null;
    location: null;
    heading_tagline: null;
    about_me: null;
    website_link: null;
    is_verified_profile: null;
    status: string;
    verification_status: string;
    created_at: string;
    updated_at: string;
    deleted_at: null
}
