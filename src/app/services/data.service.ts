import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { City } from '../models/service-center/city.model';
import { Activity } from '../models/service-center/activity.model';
import { ServiceCenter } from '../models/service-center/servicecenter.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.http.get<City[]>('assets/cities.json');
  }
  getServiceCenters(city: City, services: Activity[]): Observable<any[]> {
    return this.http.get<ServiceCenter[]>('assets/servicecenters.json').pipe(
      map((centers) =>
        centers.filter((center) =>
          center.Address.City.ID === city.ID &&
          services.every((service) => {
            const activities = center.ActivityList?.Activity; 
            if (Array.isArray(activities)) {
              return activities.some((activity) => activity.ID === service.ID);
            } else if (activities) {
              // If it's a single object, compare its ID directly
              return activities.ID === service.ID;
            } 
            return false; // Handle the case where ActivityList or Activity is undefined
          })
        )
      )
    );
  }
  

  getAllActivities(): Observable<Activity[]> {
    return this.http.get<ServiceCenter[]>('assets/servicecenters.json').pipe(
      map((centers) => {
        const activities: Activity[] = [];  
        centers.forEach((center) => {
          const centerActivities = center.ActivityList?.Activity;  
          if (centerActivities !== undefined) {
            if (Array.isArray(centerActivities)) {
              activities.push(...centerActivities);
            } else {
              activities.push(centerActivities);
            }
          }
        });
        return this.getUniqueActivities(activities);
      })
    );
  }
  
  

  private getUniqueActivities(activities: Activity[]): Activity[] {
    const uniqueActivities: Activity[] = [];
    const activityIdsSet = new Set<string>();
    activities.forEach((activity) => {
      if (!activityIdsSet.has(activity.ID)) {
        uniqueActivities.push(activity);
        activityIdsSet.add(activity.ID);
      }
    });
    return uniqueActivities;
  }}
