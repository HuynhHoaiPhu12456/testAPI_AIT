import { gql } from 'apollo-angular';

const USER_DESCRIPTIONS = gql`
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
export { USER_DESCRIPTIONS };