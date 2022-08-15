import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER =gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
        
  
    }
  }
}`


export const ADD_FOOD = gql`

  mutation addFood($name: String!, $description: String!, $expiry: String, $imageUrl: String, $servings: String, $ingredients: String,) {
    addFood(name: $name, description: $description, expiry: $expiry, imageUrl: $imageUrl, servings: $servings, ingredients: $ingredients) {
      _id
      name
      donatedBy
      description
      servings
      ingredients
      imageUrl
      expiry
    }
  }`


export const REMOVE_FOOD = gql`
  mutation removeFood($foodId: ID!) {
    removeFood(foodId: $foodId) {
      _id
      name
      donatedBy
      description
      servings
      imageUrl
      ingredients
      expiry
    }
  }
  `;
