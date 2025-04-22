import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextUtilityComponent } from './text-utility.component';

describe('TextUtilityComponent', () => {
  let component: TextUtilityComponent;
  let fixture: ComponentFixture<TextUtilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextUtilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
