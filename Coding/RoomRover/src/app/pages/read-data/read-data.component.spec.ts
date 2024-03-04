import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadDataComponent } from './read-data.component';

describe('ReadDataComponent', () => {
  let component: ReadDataComponent;
  let fixture: ComponentFixture<ReadDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadDataComponent]
    });
    fixture = TestBed.createComponent(ReadDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
