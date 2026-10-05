import { create } from 'zustand';

interface LocationState {
  currentAddress: string;
  latitude: number;
  longitude: number;
  hasPermission: boolean;
  setLocation: (address: string, lat?: number, lng?: number) => void;
  setPermission: (granted: boolean) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  currentAddress: 'Flat 402, Sunset Heights, 742 Evergreen Terrace, Brooklyn',
  latitude: 40.7128,
  longitude: -73.955,
  hasPermission: true,

  setLocation: (address, lat = 40.7128, lng = -73.955) => {
    set({ currentAddress: address, latitude: lat, longitude: lng });
  },

  setPermission: (granted) => {
    set({ hasPermission: granted });
  },
}));
