import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelblogComponent } from './travelblog.component';

describe('TravelblogComponent', () => {
  let component: TravelblogComponent;
  let fixture: ComponentFixture<TravelblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelblogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
