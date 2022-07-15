import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { EMPLOYEE_DESCRIPTIONS } from 'src/app/graphql/graphql.employee';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employee: any[] = [];
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: EMPLOYEE_DESCRIPTIONS,
        
      })
      .valueChanges.subscribe((res: any) =>{
        this.employee = res?.data?.employee;
        
      })
  }

}
