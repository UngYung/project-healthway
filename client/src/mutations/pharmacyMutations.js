import { gql } from "@apollo/client";

const UPDATE_PHARMACY_ITEM = gql`
  mutation updatePharmacyItem($id: ID!, $name: String!, $quantity: Number!) {
    updatePharmacyItem(id: $id, name: $name, quantity: $quantity) {
      id
      name
      quantity
    }
  }
`;

export { UPDATE_PHARMACY_ITEM };
