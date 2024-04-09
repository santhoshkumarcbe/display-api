import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayApiDataComponent } from './display-api-data.component';

describe('DisplayApiDataComponent', () => {
  let component: DisplayApiDataComponent;
  let fixture: ComponentFixture<DisplayApiDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayApiDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayApiDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
