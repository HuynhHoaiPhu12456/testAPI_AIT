import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardOrderComponent } from './reward-order.component';

describe('RewardOrderComponent', () => {
  let component: RewardOrderComponent;
  let fixture: ComponentFixture<RewardOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
