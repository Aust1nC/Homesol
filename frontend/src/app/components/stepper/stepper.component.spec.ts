import { ComponentFixture, TestBed } from '@angular/core/testing';
import { stepperComponent } from './stepper.component';

describe('stepperComponent', () => {
  let component: stepperComponent;
  let fixture: ComponentFixture<stepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [stepperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(stepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
