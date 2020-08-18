import { request, gql } from "graphql-request";

const adoptAPetEndpoint = "https://hasura.adoptapet.com/v1/graphql";

const getPetsRequestQuery = gql`
  query pets(
    $zipCode: String!
    $geoRange: Int!
    $params: json!
    $limit: Int
    $offset: Int
  ) {
    pets: pet_catalog_search_pets_geo(
      where: { pet_state: { _in: "available" } }
      args: {
        country_code: "US"
        geo_range: $geoRange
        location: $zipCode
        query: $params
      }
      limit: $limit
      offset: $offset
      order_by: [{ distance_km: asc }, { pet_id: asc }]
    ) {
      petId: pet_id
      petName: pet_name
      petDescription: description
      image: primary_thumb_path
      distance: distance_km
      pet_state
      age
      sex
      primary_family {
        family_name
        slugified_family_name
        __typename
      }
      secondary_family {
        family_name
        slugified_family_name
        __typename
      }
      bonded_to
      __typename
    }
  }
`;

export const getDogs = async (location = "98122", offset = 0) => {
  const queryVariables = {
    zipCode: location,
    geoRange: 50, // I think this is in miles?
    limit: 42,
    offset,
    params: {
      clan_id: [1], // ???
    },
  };

  const data = await request(
    adoptAPetEndpoint,
    getPetsRequestQuery,
    queryVariables
  );

  return data;
};
