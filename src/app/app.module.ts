import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { UsersComponent } from './components/users/users.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbActionsModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule, NbSidebarModule, NbThemeModule, NbTreeGridModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { DialogComponent } from './components/dialog/dialog.component';
import {DialogModule} from '@angular/cdk/dialog';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';


import {CdkTableModule} from '@angular/cdk/table';
import { RewardInventoryComponent } from './components/reward-inventory/reward-inventory.component';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    EmployeeComponent,
    DialogComponent,
    EditDialogComponent,
    RewardInventoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,

    NbThemeModule.forRoot(),
    RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule, // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    NbDialogModule.forRoot(),
    NbCardModule,
    NbDialogModule.forChild(),
    DialogModule,
    NbInputModule,
    NbEvaIconsModule,
    NbSelectModule,
    NbIconModule,
    NbActionsModule,
    CdkTableModule,

    /* Table */
    NbTreeGridModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
