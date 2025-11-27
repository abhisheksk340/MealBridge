
export type UserRole = 'donor' | 'ngo' | null;

export interface UserProfile {
  id: string;
  name: string; // Person name or Foundation name
  email: string;
  contact: string; // 10 digit min
  role: UserRole;
  avatar?: string;
  password?: string; // Added password field for auth
}

export type DonationStatus = 'available' | 'reserved' | 'picked_up';

export interface ClaimerInfo {
  name: string; // Foundation Name
  contact: string;
}

export interface Donation {
  id: string;
  donor_id: string;
  donor_name: string; 
  donor_contact?: string; // Added contact for NGO to call
  food_title: string;
  category?: string;
  quantity: string;
  best_before: string;
  pickup_address: string;
  latitude: number;
  longitude: number;
  image_url: string;
  status: DonationStatus;
  created_at: string;
  distance?: number;
  claimedBy?: ClaimerInfo;
}

export interface Coordinates {
  lat: number;
  lng: number;
}
