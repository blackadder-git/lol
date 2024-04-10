import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventListComponent } from './advent-list.component';

describe('AdventListComponent', () => {
  let component: AdventListComponent;
  let fixture: ComponentFixture<AdventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdventListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
