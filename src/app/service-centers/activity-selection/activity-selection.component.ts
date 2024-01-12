import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service'; // Update with the correct path
import { Activity } from '../../models/service-center/activity.model';

@Component({
  selector: 'activity-selection',
  templateUrl: './activity-selection.component.html',
  styleUrls: ['./activity-selection.component.css'],
})
export class ActivitySelectionComponent implements OnInit {
  @Output() selectedActivitiesChanged = new EventEmitter<Activity[]>();

  activities: Activity[] = [];
  selectedActivities: Activity[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAllActivities().subscribe((activities) => {
      this.activities = activities;
    });
  }

  toggleActivity(activity: Activity): void {
    const index = this.selectedActivities.findIndex((a) => a.ID === activity.ID);

    if (index !== -1) {
      // Remove the activity if it's already selected
      this.selectedActivities.splice(index, 1);
    } else {
      // Add the activity if it's not selected
      this.selectedActivities.push(activity);
      
    }
    // Emit the updated list of selected activities
    this.selectedActivitiesChanged.emit(this.selectedActivities);
    console.log('eitted')
  }

  isActivitySelected(activity: Activity): boolean {
    return this.selectedActivities.some((a) => a.ID === activity.ID);
  }
}
