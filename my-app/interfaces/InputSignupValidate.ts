export interface InputSignupValidate {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  tel: string;
  citizen_id: string;
  is_provider: boolean;
  is_renter: boolean;
  payment_channel: string;
  driving_license_id: string;
}
