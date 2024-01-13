import { Component, Input } from '@angular/core';
import { ServiceCenter } from '../../models/service-center/servicecenter.model';
import { Activity } from '../../models/service-center/activity.model';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'service-center',
  templateUrl: './service-center.component.html',
  styleUrl: './service-center.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ServiceCenterComponent {
  @Input()
  center!:ServiceCenter
  @Input()
  activities!:Activity[]
   convertTimeFormat(time: string): string {
    if (!time) {
      return '';
    }
  
    const [start, end] = time.split('-');
  
    const formatTime = (t: string): string => {
      const [hours, minutes] = t.split(':');
      const formattedHours = parseInt(hours, 10);
      const period = formattedHours >= 12 ? 'PM' : 'AM';
      const displayHours = formattedHours % 12 || 12;
  
      return `${displayHours}:${minutes || '00'} ${period}`;
    };
  
    return `${formatTime(start)}-${formatTime(end)}`;
  }
  
 getDynamicSchedule(reception: any): string {
    console.log(reception)
    const activeDays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let scheduleString: string = '';
  
    if (reception.ReceptionHours) { // בדיקה אם יש ReceptionHours
      activeDays.forEach((day, index) => {
        if (reception.ReceptionHours['Active' + day]) {
          const startTime: string = reception.ReceptionHours[day + 'FirstShift'];
          const endTime: string = reception.ReceptionHours[day + 'SecondShift'];
  
          if (index > 0) {
            scheduleString += '-';
          }
  
          scheduleString += `${day.substring(0, 2)}: ${this.convertTimeFormat(startTime)}-${this.convertTimeFormat(endTime)}`;
        }
      });
    }
    return scheduleString;
  }
  normalizeActivities(activities: Activity[] | Activity): Activity[] {
    return Array.isArray(activities) ? activities : [activities];
  }
  isActivity(activity: Activity): boolean {
    return this.activities.some((a) => a.ID === activity.ID);
  }

 convertToHTML(inputString: string): string {
    // Replace "&#xD;" with "<br>*"
    console.log("input: ",inputString)
    let convertedString = inputString.replace(/&#xD;\n&#xD;/g, '*<br/>');
     convertedString = inputString.replace(/&#xD;/g, '*<br/>');
     console.log('output: ',convertedString)
    return '*'+convertedString.substring(0,convertedString.length-1);
  }
  
  
}
