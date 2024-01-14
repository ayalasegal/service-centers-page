import { Component, Input } from '@angular/core';
import { ServiceCenter } from '../../models/service-center/servicecenter.model';
import { Activity } from '../../models/service-center/activity.model';
import { ChangeDetectionStrategy } from '@angular/core';
import { ReceptionHours } from '../../models/service-center/reception-hours.model';

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
  
 getDynamicSchedule(receptionHours: ReceptionHours) {
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const daysInHebrew: string[] = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
    const formattedHours =[]
    let currentDays:string[]=[];
    let currentDay = "";
    let currentShifts = "";
      days.forEach((day, index) => {
        const isActive = (receptionHours as any)[`Active${day}`];
        const firstShift = (receptionHours as any)[`${day}FirstShift`];
        const secondShift = (receptionHours as any)[`${day}SecondShift`];
        let IterationShifts = ""
        if (isActive) {
            currentDay = daysInHebrew[index];
            if(firstShift!= "")
            IterationShifts = `${firstShift}`
            if(secondShift!= "")
            IterationShifts+= `-${secondShift}`
            if (currentShifts === "") {
              currentShifts= IterationShifts
          } else if (currentShifts === IterationShifts) {
            currentDays.push(daysInHebrew[index])
          } else {
            if(currentDays.length>1){
              formattedHours.push(`${currentDays[0]}-${currentDays[currentDays.length-1]} ${currentShifts}`)
              currentDays =[]
            }
            currentDay = daysInHebrew[index];
            currentShifts = IterationShifts;
          }
        } else {

          if (currentShifts !== "") {
          if(currentDays.length>1){
            formattedHours.push(`${currentDays[0]}-${currentDays[currentDays.length-1]} ${currentShifts}`)
          }else{
            formattedHours.push(`${currentDay} ${currentShifts}`);
            currentDay = "";
            currentShifts = "";
          }
          currentDays =[]
          }
        }}
        )

  // Push the last formatted shifts (if any)
  if (currentShifts !== "") {
    if(currentDays.length>1)
      formattedHours.push(`${currentDays[0]}-${currentDays[currentDays.length-1]} ${currentShifts}`)
    else
    formattedHours.push(`${currentDay} ${currentShifts}`);
  }
  return formattedHours;
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
