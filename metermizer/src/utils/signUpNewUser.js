import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const graphqlClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

async function signUpNewUser(signUpObject, onSuccess, onError) {
  let results = {};
  let SIGNUP_NEW_USER = gql`
    mutation SignUp(
      $firstname: String!
      $lastname: String!
      $email: String!
      $phone: String!
      $password: String!
    ) {
      signupUser(
        input: {
          firstname: $firstname
          lastname: $lastname
          email: $email
          phone: $phone
          password: $password
        }
      ) {
        user {
          id
        }
      }
    }
  `;

  try {
    console.log('onSuccess, onError', onSuccess, onError);
    results = await graphqlClient.mutate({
      mutation: SIGNUP_NEW_USER,
      variables: {
        firstname: signUpObject.firstname,
        lastname: signUpObject.lastname,
        email: signUpObject.email,
        phone: signUpObject.phone,
        password: signUpObject.password
      }
    });
    onSuccess(results);
  } catch (error) {
    console.log('error in signUpUser: ', error);
    onError(error);
  }
}

export default signUpNewUser;
