import { gql } from 'apollo-angular';

const EMPLOYEE_DESCRIPTIONS = gql`
query{
    employee{
        _id
        address
        change_at
        change_by
        create_at
        create_by
        day_of_birth
        del_flag
        dept_id
        gender
        phone
        total_point
        user_id
    }
    
  }
`
export { EMPLOYEE_DESCRIPTIONS };