export default interface UserProfile {
  username?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  tel?: string;
  citizen_id?: string;
  payment_channel?: string;
  driving_license_id?: string;
  is_renter?: boolean;
  is_provider?: boolean;
}
