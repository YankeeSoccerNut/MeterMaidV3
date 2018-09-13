import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const graphqlClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const CREATE_USER = gql`
  mutation {
    createUser(
      input: {
        user: {
          email: "email3@email.com"
          phone: "4045935834"
          password: "test"
        }
      }
    ) {
      user {
        id
      }
    }
  }
`;
async function createNewUser(signUpObject) {
  let results = {};
  try {
    results = await graphqlClient.query({
      query: gql`
        mutation {
          createUser(
            input: {
              user: {
                email: "${signUpObject.email}"
                phone: "${signUpObject.smsphone}"
                password: "${signUpObject.password}"
              }
            }
          ) {
            user {
              id
            }
          }
        }
      `
    });
  } catch (error) {
    console.log(error);
    return null;
  }

  return results;
}

export default createNewUser;
