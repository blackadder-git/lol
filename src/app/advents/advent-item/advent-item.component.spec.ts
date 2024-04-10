import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventItemComponent } from './advent-item.component';

describe('AdventItemComponent', () => {
  let component: AdventItemComponent;
  let fixture: ComponentFixture<AdventItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdventItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdventItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
