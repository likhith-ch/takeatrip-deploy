import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysearchComponent } from './holidaysearch.component';

describe('HolidaysearchComponent', () => {
  let component: HolidaysearchComponent;
  let fixture: ComponentFixture<HolidaysearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidaysearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaysearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
