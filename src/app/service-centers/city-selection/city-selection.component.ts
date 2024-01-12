import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service'; // Update with the correct path
import { City } from '../../models/service-center/city.model';
import { ViewChild } from '@angular/core';
import { AutoComplete } from 'primeng/autocomplete';
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'city-selection',
  templateUrl: './city-selection.component.html',
  styleUrls: ['./city-selection.component.css'],
})
export class CitySelectionComponent implements OnInit {
  @ViewChild('autoCompleteField')
  autoCompleteField!: AutoComplete;
  cities: City[] = [];
  selectedItem: any;
  isCitySelected:boolean
  suggestions: any[] = [];
  @Output() citySelected = new EventEmitter<City>();
  cityNotFound = false;
  @Output() cityCleared = new EventEmitter<void>(); // New event for city clearing

  constructor(private dataService: DataService) {
    this.isCitySelected=false
  }

  ngOnInit(): void {
    this.dataService.getCities().subscribe((cities) => {
      this.cities = cities;
    });
  }

  search(event: AutoCompleteCompleteEvent): void {
    this.suggestions = this.cities.filter((c) => c.Name.toLowerCase().startsWith(event.query.toLowerCase()));
    if (this.suggestions.length > 0) {
      this.cityNotFound = false;
    }
    else{
      this.cityNotFound = true
      this.onClearCity();
    }
  }
  onSelectCity(): void {
    if (this.selectedItem) {
      this.isCitySelected=true
      this.citySelected.emit(this.selectedItem);
    }
  }
  onClearCity(): void {
    this.isCitySelected=false
    this.cityCleared.emit();
  }
  openAutocompleteDropdown() {
    // Set suggestions to all options
    this.autoCompleteField.suggestions = this.cities;

    // Open the dropdown
    this.autoCompleteField.completeMethod.emit({
      originalEvent:new Event("activation"),
      query: ''
    });
  }
}
