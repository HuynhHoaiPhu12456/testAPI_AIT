import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RewardInventoryComponent } from './components/reward-inventory/reward-inventory.component';
import { RewardOrderComponent } from './components/reward-order/reward-order.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {path: "", component: RewardInventoryComponent},
  {path: "rewardOrder", component: RewardOrderComponent},
  {path: "test", component: UsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
