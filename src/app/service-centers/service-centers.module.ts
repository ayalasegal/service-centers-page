import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitySelectionComponent } from './city-selection/city-selection.component';
import { ActivitySelectionComponent } from './activity-selection/activity-selection.component';
import { SelectionPanelComponent } from './selection-panel/selection-panel.component';
import { ServiceCenterComponent } from './service-center/service-center.component';
import { ServiceCentersComponent } from './service-centers/service-centers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ServiceCentersPanelComponent } from './service-centers-panel/service-centers-panel.component';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [
    CitySelectionComponent,
    ActivitySelectionComponent,
    SelectionPanelComponent,
    ServiceCenterComponent,
    ServiceCentersComponent,
    ServiceCentersPanelComponent,
    ServiceCentersPanelComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    HttpClientModule,
    AutoCompleteModule,
    ButtonModule,
    CardModule,
    DividerModule
  ],
  exports:[
    ServiceCentersComponent,
 ]
})
export class ServiceCentersModule { }
