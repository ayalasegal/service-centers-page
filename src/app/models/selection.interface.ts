import { SelectionStatus } from "./selection-status.enum";
import { Activity } from "./service-center/activity.model";
import { City } from "./service-center/city.model";

export interface Selection{
    status:SelectionStatus
    selection:{
        city:City,
        activities:Activity[]
    } | undefined
}