import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';


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
const Get_getRewardInvenByName = gql`
query($NAME: String!){
  getRewardInvenByName(name:$NAME){
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
const Get_searchRewardInventory = gql`
query(
  $NAME: String!,
  $TYPE: String!,
  $PRICE:Float,
  $TOTAL:Float,
  $SHIPPING:Float,
  $SOLD:Float,
  $ACTIVE_FLAG: Boolean,
  $IS_APPROVE:Boolean
)
{
  searchRewardInventory(
    filter:{
      name:$NAME, 
      type:$TYPE, 
      price:$PRICE, 
      total:$TOTAL,
      shipping:$SHIPPING,
      sold:$SOLD,
      active: $ACTIVE_FLAG,
      approve: $IS_APPROVE
      }){
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

@Component({
  selector: 'app-reward-inventory',
  templateUrl: './reward-inventory.component.html',
  styleUrls: ['./reward-inventory.component.scss']
})
export class RewardInventoryComponent implements OnInit {
  reward_inventor: any[] = [];

  selectbyName = '';
  isCard: boolean = true;
  isBelowCard: boolean = true;
  isOpenOverlay: boolean = false;
  constructor(private apollo: Apollo,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: Get_getAllRewardInventory,

      })
      .valueChanges.subscribe((res: any) => {

        this.reward_inventor = res?.data?.getAllRewardInventory;
        console.log("data Reward Inventory", res);     
      })
  }

  searchForm =  this.fb.group({
    name: [''],
    type: [''],
    price: [null],
    total: [null],
    shipping: [null],
    sold: [null],
    is_approve: [null],
    active_flag: [null],
  })


  SearchRewardInvenByName() {
    this.apollo
      .watchQuery({
        query: Get_getRewardInvenByName,
        variables:
        {
          NAME: this.searchForm.controls["name"].value,
        }
      })
      .valueChanges.subscribe((res: any) => {

        this.reward_inventor = res?.data?.getRewardInvenByName;
        console.log("Search By Name: ", this.reward_inventor)
      })
  }

  searchRewardInventory() {
    this.apollo
      .watchQuery({
        query: Get_searchRewardInventory,
        variables:
        {
          NAME: this.searchForm.controls["name"].value,
          TYPE: this.searchForm.controls["type"].value,
          PRICE: this.searchForm.controls["price"].value,
          TOTAL: this.searchForm.controls["total"].value,
          SHIPPING: this.searchForm.controls["shipping"].value,
          SOLD: this.searchForm.controls["sold"].value,
          ACTIVE_FLAG: this.searchForm.controls["active_flag"].value,
          IS_APPROVE: this.searchForm.controls["is_approve"].value,
        }
      })
      .valueChanges.subscribe((res: any) => {

        this.reward_inventor = res?.data?.searchRewardInventory;
        console.log("Search By Name: ", this.reward_inventor)
      })
  }

  toggleCard(){
    this.isCard = !this.isCard;
  }

  toogleBelowCard() {
    this.isBelowCard = !this.isBelowCard;
  }

  resetSearchForm() {
    
    this.searchForm.reset();
    this.searchForm.get('name')?.reset('');
    this.searchForm.get('type')?.reset('');
  }

  OpenOverlay(id: string) {

        if(id == this.onAddLicense(id)) {
          this.isOpenOverlay = !this.isOpenOverlay;
        }       

  }

  onAddLicense(output: string) {
    console.log(output)
    return output;
  }
}
