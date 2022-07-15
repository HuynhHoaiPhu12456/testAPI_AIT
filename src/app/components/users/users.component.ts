import { DataSource } from '@angular/cdk/collections';
import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { USER_DESCRIPTIONS } from 'src/app/graphql/graphql.user';
import { User } from 'src/app/models/users';
import { DialogComponent } from '../dialog/dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';


const Get_getUserByUsername = gql`
query($USERNAME: String!) {
  getUserByUsername(username:$USERNAME){
    _id
    email
    name
    password
    username
  }
}
`
const Get_findOneByKeyUserName = gql`
query($USERNAME: String!){
  findOneByKeyUserName(username:$USERNAME){
    _id
    email
    name
    password
    username
  }
}
`

const Delete_RemoveUser = gql`
mutation ($idUser: String!)
{
     RemoveUser(id: $idUser) {
              _id
              email
              name
              password
              username
     }      
}
`

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
 

  selectedUserName = '';

  allColumns: string[] = ['_id', "email", "name", "password", "username", "Thao tác"];
  
  names: string[] = [];

  constructor(private apollo: Apollo,
    private dialogService: NbDialogService,
    ) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: USER_DESCRIPTIONS,

      })
      .valueChanges.subscribe((res: any) => {

        this.users = res?.data?.user;
        console.log("data User", res);     
      })


  }

  SearchByUserName() {
    this.apollo
      .watchQuery({
        query: Get_getUserByUsername,
        variables:
        {
          USERNAME: this.selectedUserName
        }
      })
      .valueChanges.subscribe((res: any) => {
        this.users = [];
        this.users.push(res.data.getUserByUsername)
        console.log("search Username", this.users);
      })
  }

  SearchByUserNameKeyWord() {
    this.apollo
      .watchQuery({
        query: Get_findOneByKeyUserName,
        variables:
        {
          USERNAME: this.selectedUserName
        }
      })
      .valueChanges.subscribe((res: any) => {

        this.users = res?.data?.findOneByKeyUserName;
      })
  }

  open() {
    this.dialogService.open(DialogComponent)
      .onClose.subscribe(name => name && this.names.push(name));
  }

  RemoveUser(userid: string) {
    this.apollo
      .mutate({
        mutation: Delete_RemoveUser,
        variables:
        {
          idUser: userid
        }
      })
      .subscribe((res: any) => {
        this.users = res.data.Delete_RemoveUser;
      })
    console.log("UserID", userid)
    this.refresh();
  }

  refresh(): void {
    window.location.reload();
  }

  OpenEditDialog() {
    this.dialogService.open(EditDialogComponent)
    
  }
}
