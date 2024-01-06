import { gql } from "@apollo/client";

const GET_PHARMACY_ITEMS = gql`
  query getPharmacyItems {
    pharmacyItems {
      id
      name
      quantity
    }
  }
`;

export { GET_PHARMACY_ITEMS };
