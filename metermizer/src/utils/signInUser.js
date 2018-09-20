import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const graphqlClient = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

async function signInUser(SignInObject) {
    let results = {}
    let SIGNIN_USER = gql`
      {
        user {
          pageInfo {
            startCursor
            endCursor
          }
          nodes {
            id
            thermostatId
            createdAt
            dispTemp
            displayUnits
            weatherTemp
            weatherTempUnit
            weatherCondition
          }
        }
      }
    `
    });

    try {
        console.log('onSuccess, onError', onSuccess, onError);
        results = await graphqlClient.query({
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
    return results;
}

export default SignInUser;
