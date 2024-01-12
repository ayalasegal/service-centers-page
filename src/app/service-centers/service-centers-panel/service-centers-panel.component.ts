import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SelectionStatus } from '../../models/selection-status.enum';
import { Selection } from '../../models/selection.interface';
import { ServiceCenter } from '../../models/service-center/servicecenter.model';
import { DataService } from '../../services/data.service';
import { Activity } from '../../models/service-center/activity.model';

@Component({
  selector: 'service-centers-panel',
  templateUrl: './service-centers-panel.component.html',
  styleUrl: './service-centers-panel.component.css'
})
export class ServiceCentersPanelComponent implements OnChanges{

  @Input()
  selection!: Selection
  serviceCenters:ServiceCenter[]=[]
  statusTypes= SelectionStatus
constructor(private dataService:DataService){}
  ngOnChanges(changes: SimpleChanges): void {
    console.log("in panel, selection is: ",this.selection)
    if(this.selection.status==SelectionStatus.Complete){
    this.dataService.getServiceCenters(this.selection.selection!.city,this.selection.selection!.activities).subscribe(
      (serviceCenters:ServiceCenter[])=>{
        this.serviceCenters=serviceCenters
        console.log(this.serviceCenters)}
    )  }}


}
