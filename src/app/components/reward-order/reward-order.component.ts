import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Apollo, gql } from 'apollo-angular';
import { Order } from 'src/app/models/reward_order';

const Get_getAllRewardOrder = gql `
query{
  getAllRewardOrder{
    _id
    status
    reward_id{
      name
      price
      total
      description
      _id
    }
    create_at
    remark
    create_by
    user_id{
      name
      username
      email
    }
    
  }
  
}
` 

const Get_getAllRewardInventory = gql`
query{
  getAllRewardInventory{
    _id
    name
    description 
    type
    price
    total
    shipping
    sold
    is_approve
    image
    active_flag
  }
  
}
`
const Get_user = gql `
query{
  user{
    _id
    email
    name
    password
    username
  }
  
}
`

const Get_searchRewardOrder = gql `
query(
  $USER: String,
  $REWARD: String,
  $STATUS: String!,
  $FROM: Float
  $TO: Float
)
{
  searchRewardOrder(
    filter:{
      user:$USER, 
      reward:$REWARD,
      status: $STATUS,
      from: $FROM,
      to: $TO
      }){
    _id
    user_id {
      _id
      name
    }
    reward_id {
      _id
      name
    }
    status
    remark
    create_at
  }
}
`
@Component({
  selector: 'app-reward-order',
  templateUrl: './reward-order.component.html',
  styleUrls: ['./reward-order.component.scss']
})
export class RewardOrderComponent implements OnInit {
  reward_order: any[] = [];
  reward_inventory: any[] = [];
 /*  reward_inventoryId: string[] = [];
  reward_inventoryName: string[] = []; */

  users_ID: string[] = [];
  users_Name: string[] = [];

  
  users: any[] = [];

  isCard: boolean = true;
  isBelowCard: boolean = true;

  

  allColumns = ["ACTION", "USER", "REWARD INVENTORY", "STATUS", "TIME REQUEST", "REMARK"]
  constructor(private apollo: Apollo,
    private fb: FormBuilder,
    ) {
     
     }

    searchOrderForm =  this.fb.group({
      user: [''],
      reward: [''],
      status: [''],
      remask:[''],
      from: [new Date(1641009124000)],
      to: [new Date()],

    })

  ngOnInit(): void {
    this.LoadRewardOrder();
    this.LoadRewardInventory();
    this.LoadUser();
  }

  toggleCard (){
    this.isCard = !this.isCard;
  }
  toogleBelowCard() {
    this.isBelowCard = !this.isBelowCard;
  }

  resetSearchForm() {
    
    /* this.searchOrderForm.reset(); */
    this.searchOrderForm.get('user')?.reset('');
    this.searchOrderForm.get('reward')?.reset('');
    this.searchOrderForm.get('status')?.reset('');
    this.searchOrderForm.get('remask')?.reset('');
    this.searchOrderForm.get('from')?.reset(new Date(1641009124000));
    this.searchOrderForm.get('to')?.reset(new Date());
    
  }


   LoadRewardOrder() {
    this.apollo
    .watchQuery({
      query: Get_getAllRewardOrder,

    })
    .valueChanges.subscribe((res: any) => {

      this.reward_order = res?.data?.getAllRewardOrder;
      
      console.log("data Reward Order", this.reward_order);
    })
   }

   LoadRewardInventory() {
    
    this.apollo
      .watchQuery({
        query: Get_getAllRewardInventory,

      })
      .valueChanges.subscribe((res: any) => {
        this.reward_inventory = res?.data?.getAllRewardInventory;

/*         for(let i = 0; i < this.reward_inventory.length; i++){
          this.reward_inventoryId.push(res.data.getAllRewardInventory[i]._id); 
          this.reward_inventoryName.push(res.data.getAllRewardInventory[i].name);
        } */


        /* const data = [...this.reward_inventory]
        const inventoryName : any[] =[] 
        this.reward_inventoryId.forEach(i => {
          
          const a = data.find((u) => u._id == i)
          oder.forEach(o => {
            if (o._id == '62d0cf1016d89cd07f199e3c'){
              console.log(o)
            }
          })
        }) */
          
        
      })
   }

   LoadUser() {
    this.apollo
    .watchQuery({
      query: Get_user,

    })
    .valueChanges.subscribe((res: any) => {

      this.users = res?.data?.user;

      console.log("data User", res);     
    })
   }
   

   searchRewardOrder() {
    this.apollo
      .watchQuery({
        query: Get_searchRewardOrder,
        variables:
        {
          USER: this.searchOrderForm.controls["user"].value,
          REWARD: this.searchOrderForm.controls["reward"].value,
          STATUS: this.searchOrderForm.controls["status"].value,
          FROM:  Math.round(new Date(this.searchOrderForm.controls["from"].value!).getTime()/1000),      /*  this.searchOrderForm.controls["from"].value?.getTime(), */
          TO: Math.round(new Date(this.searchOrderForm.controls["to"].value!).getTime()/1000) /* this.searchOrderForm.controls["to"].value?.getTime(), */
        }
      })
      .valueChanges.subscribe((res: any) => {

        this.reward_order = res?.data?.searchRewardOrder;
        console.log("Search Reward Order: ", this.reward_order)
      })
   }

   Logdata(row: any[]) {
    console.log(row);
   }

}
