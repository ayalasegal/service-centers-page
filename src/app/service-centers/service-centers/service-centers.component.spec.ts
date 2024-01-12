import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCentersComponent } from './service-centers.component';

describe('ServiceCentersComponent', () => {
  let component: ServiceCentersComponent;
  let fixture: ComponentFixture<ServiceCentersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceCentersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
