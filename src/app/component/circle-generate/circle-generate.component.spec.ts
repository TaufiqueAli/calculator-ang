import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleGenerateComponent } from './circle-generate.component';

describe('CircleGenerateComponent', () => {
  let component: CircleGenerateComponent;
  let fixture: ComponentFixture<CircleGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircleGenerateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
