export default interface User {
  id: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  tel: string;
  citizen_id: string;
  payment_channel: string;
  driving_license_id: string;
  is_renter: boolean;
  is_provider: boolean;
  role: string;
  deleted_at: string;
  updated_at: string;
  created_at: string;
}
