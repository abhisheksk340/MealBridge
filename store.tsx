
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Donation, UserRole, ClaimerInfo, UserProfile } from './types';

// --- VERIFIED VEG IMAGE REPOSITORY ---
const VEG_IMAGES = {
  RICE_BOWL: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop', // Plain white rice
  VEG_BIRYANI: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=800&auto=format&fit=crop', // Distinctive Veg Biryani
  FRIED_RICE_VEG: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=800&auto=format&fit=crop', // Veg fried rice
  PANEER: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop', // Paneer Curry
  ROTI_BASKET: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800&auto=format&fit=crop', // Rotis
  DAL: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop', // Dal
  IDLI: 'https://images.unsplash.com/photo-1589301760576-47c4210aa14f?q=80&w=800&auto=format&fit=crop', // Idli
  FRUIT_BASKET: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=800&auto=format&fit=crop', // Fruits
  PIZZA_VEG: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop', // Veg Pizza
  BURGER_VEG: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop', // Veg Burger
  DESSERT: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800&auto=format&fit=crop', // Cake/Sweet
  THALI: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=800&auto=format&fit=crop', // Veg Thali
  DEFAULT_MEAL: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop' // Healthy Bowl
};

// --- SMART IMAGE HELPER ---
const getSmartImageUrl = (title: string, category: string): string => {
  const t = title.toLowerCase().trim();
  
  if (t === 'rice' || t === 'steamed rice' || t === 'plain rice' || t === 'white rice' || t === 'cooked rice' || t === 'rice bowl') {
     return VEG_IMAGES.RICE_BOWL;
  }
  if (t.includes('fried rice')) return VEG_IMAGES.FRIED_RICE_VEG;
  if (t.includes('biryani') || t.includes('pulao')) return VEG_IMAGES.VEG_BIRYANI;
  if (t.includes('jeera')) return VEG_IMAGES.RICE_BOWL;
  if (t.includes('rice') && !t.includes('fried')) return VEG_IMAGES.RICE_BOWL;
  if (t.includes('paneer')) return VEG_IMAGES.PANEER;
  if (t.includes('dal') || t.includes('sambar') || t.includes('curry')) return VEG_IMAGES.DAL;
  if (t.includes('idli') || t.includes('dosa')) return VEG_IMAGES.IDLI;
  if (t.includes('roti') || t.includes('chapati') || t.includes('phulka') || t.includes('naan') || t.includes('bread')) return VEG_IMAGES.ROTI_BASKET;
  if (t.includes('pizza')) return VEG_IMAGES.PIZZA_VEG;
  if (t.includes('burger')) return VEG_IMAGES.BURGER_VEG;
  if (t.includes('fruit') || category === 'Raw Produce') return VEG_IMAGES.FRUIT_BASKET;
  if (t.includes('cake') || t.includes('sweet') || category === 'Baked Goods') return VEG_IMAGES.DESSERT;
  return VEG_IMAGES.DEFAULT_MEAL;
};

// Initial Donations Data
const INITIAL_DONATIONS: Donation[] = [
  {
    id: '1',
    donor_id: 'd1',
    donor_name: 'Spice Garden Bistro',
    donor_contact: '9876543210',
    food_title: 'Vegetable Dum Biryani',
    quantity: '15 Servings',
    best_before: new Date(Date.now() + 86400000).toISOString(),
    pickup_address: '12 Main St, Downtown',
    latitude: 12.9716,
    longitude: 77.5946,
    image_url: VEG_IMAGES.VEG_BIRYANI,
    status: 'available',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    donor_id: 'd4',
    donor_name: 'Annapoorna Canteen',
    donor_contact: '9900112233',
    food_title: 'Steamed White Rice',
    quantity: '20 Bowls',
    best_before: new Date(Date.now() + 18000000).toISOString(),
    pickup_address: '101 Temple St',
    latitude: 12.9650,
    longitude: 77.5850,
    image_url: VEG_IMAGES.RICE_BOWL,
    status: 'available',
    created_at: new Date(Date.now() - 1000000).toISOString()
  }
];

// --- PRE-SEEDED USERS FOR "BACKEND" ---
const DEFAULT_USERS: UserProfile[] = [
    {
        id: 'user_fixed_abhishek',
        name: 'Abhishek SK',
        email: 'abhisheksk340@gmail.com',
        contact: '9876543210',
        role: 'donor',
        password: 'password123' // Default password
    },
    {
        id: 'user_fixed_ngo',
        name: 'Hope Foundation',
        email: 'ngo@hope.com',
        contact: '9988776655',
        role: 'ngo',
        password: 'password123'
    }
];

interface StoreContextType {
  userRole: UserRole;
  userProfile: UserProfile | null;
  registerUser: (data: Partial<UserProfile>) => Promise<{success: boolean, message?: string}>;
  loginUser: (identifier: string, password: string, requiredRole?: UserRole) => Promise<{success: boolean, message?: string}>;
  socialLogin: (email: string, name: string) => Promise<{success: boolean, message?: string}>;
  logout: () => void;
  donations: Donation[];
  addDonation: (donation: Omit<Donation, 'id' | 'created_at' | 'status' | 'donor_id' | 'donor_name' | 'donor_contact'>) => Promise<void>;
  claimDonation: (id: string, claimer: ClaimerInfo) => void;
  confirmPickup: (id: string) => void;
  isLoading: boolean;
  userLocation: { lat: number; lng: number } | null;
  userExists: (email: string) => boolean;
  updateUserProfile: (data: Partial<UserProfile>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Distance Helper
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; 
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Initialize Users from Storage OR Default
  const [users, setUsers] = useState<UserProfile[]>(() => {
      const saved = localStorage.getItem('mealbridge_users_db');
      if (saved) {
          const parsed = JSON.parse(saved);
          // Ensure default users are always present even if local storage exists
          const merged = [...parsed];
          DEFAULT_USERS.forEach(defUser => {
              if (!merged.some(u => u.email === defUser.email)) {
                  merged.push(defUser);
              }
          });
          return merged;
      }
      return DEFAULT_USERS;
  });

  // 2. Initialize Session
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
      const saved = localStorage.getItem('mealbridge_current_user');
      return saved ? JSON.parse(saved) : null;
  });
  
  const [userRole, setUserRole] = useState<UserRole>(() => {
      const saved = localStorage.getItem('mealbridge_current_user');
      return saved ? JSON.parse(saved).role : null;
  });

  const [donations, setDonations] = useState<Donation[]>(() => {
      const saved = localStorage.getItem('mealbridge_donations');
      return saved ? JSON.parse(saved) : INITIAL_DONATIONS;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('mealbridge_donations', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('mealbridge_users_db', JSON.stringify(users));
  }, [users]);

  // Geolocation
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude }),
        () => setUserLocation({ lat: 12.9716, lng: 77.5946 }) 
      );
    }
  }, []);

  // Distance Calc
  useEffect(() => {
    if (userLocation) {
      setDonations(prev => prev.map(d => ({
        ...d,
        distance: getDistanceFromLatLonInKm(userLocation.lat, userLocation.lng, d.latitude, d.longitude)
      })));
    }
  }, [userLocation]);

  const saveSession = (user: UserProfile) => {
      localStorage.setItem('mealbridge_current_user', JSON.stringify(user));
      setUserProfile(user);
      setUserRole(user.role);
  };
  
  const updateUserProfile = (data: Partial<UserProfile>) => {
      if (!userProfile) return;
      const updatedProfile = { ...userProfile, ...data };
      const updatedUsers = users.map(u => u.id === userProfile.id ? updatedProfile : u);
      setUsers(updatedUsers); 
      saveSession(updatedProfile);
  };

  const userExists = (email: string) => {
      return users.some(u => (u.email || '').trim().toLowerCase() === (email || '').trim().toLowerCase());
  };

  const registerUser = async (data: Partial<UserProfile>) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check duplicates
    const emailToCheck = (data.email || '').trim().toLowerCase();
    const phoneToCheck = (data.contact || '').trim();

    if (emailToCheck && users.some(u => (u.email || '').trim().toLowerCase() === emailToCheck)) {
      setIsLoading(false);
      return { success: false, message: 'User already exists.' };
    }

    const newUser: UserProfile = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name || 'User',
      email: data.email || '',
      contact: data.contact || '',
      role: data.role || 'donor',
      password: data.password 
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    
    // DO NOT Auto Login - Require manual login as per request
    setIsLoading(false);
    return { success: true };
  };

  const loginUser = async (identifier: string, password: string, requiredRole?: UserRole) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const idToCheck = identifier.trim().toLowerCase();
    const user = users.find(u => 
        (u.email || '').trim().toLowerCase() === idToCheck || 
        (u.contact || '').trim() === idToCheck
    );

    if (user) {
        // Password Check (Simple)
        if (user.password && user.password !== password) {
            setIsLoading(false);
            return { success: false, message: 'Incorrect password.' };
        }
        
        if (requiredRole && user.role !== requiredRole) {
            setIsLoading(false);
            return { success: false, message: `Incorrect Role. Please use ${user.role} login.` };
        }

        saveSession(user);
        setIsLoading(false);
        return { success: true };
    } else {
        setIsLoading(false);
        return { success: false, message: 'Account not found.' };
    }
  };

  const socialLogin = async (email: string, name: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check DB
    let user = users.find(u => (u.email || '').toLowerCase() === email.toLowerCase());
    
    if (user) {
        saveSession(user);
        setIsLoading(false);
        return { success: true };
    } else {
        setIsLoading(false);
        return { success: false, message: 'New Account' };
    }
  };

  const logout = () => {
    setUserRole(null);
    setUserProfile(null);
    localStorage.removeItem('mealbridge_current_user');
  };

  const addDonation = async (donationData: any) => {
    setIsLoading(true);
    const smartImage = donationData.image_url.includes('unsplash') 
        ? getSmartImageUrl(donationData.food_title, donationData.category || '') 
        : donationData.image_url;

    const newDonation: Donation = {
      id: Math.random().toString(36).substr(2, 9),
      donor_id: userProfile?.id || 'guest',
      donor_name: userProfile?.name || 'Anonymous',
      donor_contact: userProfile?.contact,
      status: 'available',
      created_at: new Date().toISOString(),
      ...donationData,
      image_url: smartImage
    };
    
    setDonations(prev => [newDonation, ...prev]);
    setIsLoading(false);
  };

  const claimDonation = (id: string, claimer: ClaimerInfo) => {
    setDonations(prev => prev.map(d => 
      d.id === id ? { ...d, status: 'reserved', claimedBy: claimer } : d
    ));
  };

  const confirmPickup = (id: string) => {
    setDonations(prev => prev.map(d => d.id === id ? { ...d, status: 'picked_up' } : d));
  };

  return (
    <StoreContext.Provider value={{ 
      userRole, userProfile, registerUser, loginUser, socialLogin, logout, 
      donations, addDonation, claimDonation, confirmPickup, isLoading, userLocation, userExists, updateUserProfile
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
