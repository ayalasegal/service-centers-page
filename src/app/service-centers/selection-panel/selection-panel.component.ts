import { Component, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import { City } from '../../models/service-center/city.model';
import { Activity } from '../../models/service-center/activity.model';
import { Selection } from '../../models/selection.interface';
import { SelectionStatus } from '../../models/selection-status.enum';

@Component({
  selector: 'selection-panel',
  templateUrl: './selection-panel.component.html',
  styleUrl: './selection-panel.component.css'
})
export class SelectionPanelComponent {
  selectedcity:City|undefined
  selectedActivities:Activity[]
  @Output() statusChange = new EventEmitter<Selection>();

  constructor(){
    this.selectedActivities=[]
    this.selectedcity=undefined
  }
  onCitySelected(city:City){
    this.selectedcity=city
    this.checkStatus()
  }
  onActivityChange(activities:Activity[]){
    this.selectedActivities=activities
    this.checkStatus()
  }
  onCityCleared() {

    this.selectedcity=undefined
    this.statusChange.emit({status:SelectionStatus.Incomplete,selection:undefined})
    this.checkStatus()
  }
  checkStatus(){
    if(this.selectedcity == undefined || this.selectedActivities.length == 0){
      this.statusChange.emit({status:SelectionStatus.Incomplete,selection:undefined})
    }
    else{
      this.statusChange.emit({status:SelectionStatus.Complete,selection:{city:this.selectedcity,activities:this.selectedActivities}})
    }
  }

}
