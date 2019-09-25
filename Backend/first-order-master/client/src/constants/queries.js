import { gql } from "apollo-boost";

export function getRestaurantByBusinessUserID(busienssUserID) {
  const GET_RESTAURANTS = gql`
    {
        getRestaurantsByBU(businessUser_id: "${busienssUserID}") {
          name
          address
          id
        }
      }

    `;

  return GET_RESTAURANTS;
}
