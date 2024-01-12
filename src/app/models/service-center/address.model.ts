import { City } from "./city.model";

export interface Address {
    City: City;
    HouseNumber: number;
    Location: string;
    MapURL: string;
    MapX: number;
    MapY: number;
    Note: string;
    PhoneArea: string;
    PhoneNumber: string;
    Street: string;
  }