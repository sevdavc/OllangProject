import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FDashboardComponent } from './f-dashboard.component';

describe('FDashboardComponent', () => {
  let component: FDashboardComponent;
  let fixture: ComponentFixture<FDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
