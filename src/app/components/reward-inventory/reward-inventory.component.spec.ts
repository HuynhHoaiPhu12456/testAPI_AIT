import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardInventoryComponent } from './reward-inventory.component';

describe('RewardInventoryComponent', () => {
  let component: RewardInventoryComponent;
  let fixture: ComponentFixture<RewardInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
