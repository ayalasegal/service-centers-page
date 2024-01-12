import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCentersPanelComponent } from './service-centers-panel.component';

describe('ServiceCentersPanelComponent', () => {
  let component: ServiceCentersPanelComponent;
  let fixture: ComponentFixture<ServiceCentersPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceCentersPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceCentersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
