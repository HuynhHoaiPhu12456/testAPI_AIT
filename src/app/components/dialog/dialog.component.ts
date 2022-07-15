import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Apollo, gql } from 'apollo-angular';
import { USER_DESCRIPTIONS } from 'src/app/graphql/graphql.user';
import { User } from 'src/app/models/users';


const Posts_register = gql`
mutation ($USERNAME: String!, 
  $PASSWORD: String!,
  $NAME: String!,
  $EMAIL: String!
) 
{
register(username:$USERNAME,
    password: $PASSWORD,
    name: $NAME,
    email: $EMAIL) {
      _id
      email
      name
      password
      username
    }
}
`

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  users: User[] = [];
  names: string[] = [];
  inputname = '';

 

  registerForm = new FormGroup({
    UserName: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
    Name: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
  });

  constructor(
    protected dialogRef: NbDialogRef<DialogComponent>,
    private apollo: Apollo,
 ){}
  ngOnInit(): void {
    
  }
  close() {
    this.dialogRef.close();
  }



  RegisterUser() {
    this.apollo
        .mutate({
          mutation: Posts_register,
          variables: 
          {
            USERNAME: this.registerForm.controls["UserName"].value,
            PASSWORD: this.registerForm.controls["Password"].value,
            NAME: this.registerForm.controls["Name"].value,
            EMAIL: this.registerForm.controls["Email"].value,
          }
        })
        .subscribe((res: any) =>{
          let user = Object.assign([], this.users)
          user.unshift(res["Register"]);
          this.users = user;
          console.log("Register User", this.users)
          this.refresh();
        })
        
        this.dialogRef.close();
        
  }


  refresh(): void {
    window.location.reload();
}
 
}
