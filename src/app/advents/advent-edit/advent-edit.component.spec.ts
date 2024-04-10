import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventEditComponent } from './advent-edit.component';

describe('AdventEditComponent', () => {
  let component: AdventEditComponent;
  let fixture: ComponentFixture<AdventEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdventEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdventEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
