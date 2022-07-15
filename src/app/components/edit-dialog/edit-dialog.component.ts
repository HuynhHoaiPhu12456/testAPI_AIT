import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Apollo, gql } from 'apollo-angular';
import { USER_DESCRIPTIONS } from 'src/app/graphql/graphql.user';
import { User } from 'src/app/models/users';
import { DialogComponent } from '../dialog/dialog.component';


const PUT_UpdateUser = gql`
mutation( $idUser: String!
  $PASSWORD: String!,
  $NAME: String!,
  $EMAIL: String!) {
UpdateUser( id: $idUser
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
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  users: User[] = [];

  constructor(protected dialogRef: NbDialogRef<DialogComponent>,
    private apollo: Apollo,
   /*  public dialogRefCDK: DialogRef<string>, */
    /* @Inject(DIALOG_DATA) public data: User, */
    ) { }

    editForm = new FormGroup({
      Password: new FormControl('', Validators.required),
      Name: new FormControl('', Validators.required),
      Email: new FormControl('', Validators.required),
    });

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: USER_DESCRIPTIONS,

      })
      .valueChanges.subscribe((res: any) => {

        this.users = res?.data?.user;
        console.log("data User", res)
      })
  }

  close() {
    this.dialogRef.close();
  }

  UpdateUser() {

  }

}
