import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($login: LoginUser) {
  login(login: $login) {
    access_token
  }
}
`;

export const REGISTER = gql`
  mutation Mutation($register: RegisterUser) {
  register(register: $register) {
    _id
    name
    username
    email
    password
  }
}
`
