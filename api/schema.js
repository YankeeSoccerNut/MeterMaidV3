const graphql = require('graphql');
const connectionString =
  'postgres://meterMiser:meterMiser@localhost:5432/meterMiser';
const pgp = require('pg-promise')();
const db = {};
db.conn = pgp(connectionString);
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = graphql;
const ReadingsType = new GraphQLObjectType({
  name: 'ReadingsType',
  fields: () => ({
    id: { type: GraphQLID },
    thermostat_id: { type: GraphQLID },
    equipment_status: { type: GraphQLString },
    weather_condition: { type: GraphQLString }
  })
});
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ReadingsType: {
      type: ReadingsType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM "readings" WHERE id=${args.id}`;
        return db.conn
          .one(query)
          .then(data => {
            return data;
          })
          .catch(err => {
            return 'The error is', err;
          });
      }
    }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery
});
