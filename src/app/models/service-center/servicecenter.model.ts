// city.model.ts

import { Activity } from "./activity.model";
import { Address } from "./address.model";
import { Handicap } from "./handicap.model";
import { ReceptionHours } from "./reception-hours.model";

export interface ServiceCenter {
    ActivityList: {
      Activity: Activity[] | Activity;
    };
    Address: Address;
    BranchCode: string;
    Handicap: Handicap;
    ID: number;
    IsDealer: boolean;
    Name: string;
    PTNetwork: string;
    ReceptionHours: ReceptionHours;
  }
  