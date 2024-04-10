import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventDetailComponent } from './advent-detail.component';

describe('AdventDetailComponent', () => {
  let component: AdventDetailComponent;
  let fixture: ComponentFixture<AdventDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdventDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
