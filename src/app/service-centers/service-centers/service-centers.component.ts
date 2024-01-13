import { Component } from '@angular/core';
import {Selection} from '../../models/selection.interface'
import { SelectionStatus } from '../../models/selection-status.enum';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'service-centers',
  templateUrl: './service-centers.component.html',
  styleUrl: './service-centers.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ServiceCentersComponent {
  selection:Selection
  constructor(){
    this.selection={status:SelectionStatus.Incomplete,selection:undefined}
  }
  onStatusChange(selection:Selection){
    if(selection.status == SelectionStatus.Incomplete){
      this.selection.status=SelectionStatus.Incomplete
      this.selection.selection=undefined
    }
    else{
      this.selection= selection
    }
  }

}
