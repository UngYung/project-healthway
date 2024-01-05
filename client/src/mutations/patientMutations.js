import { gql } from "@apollo/client";

const ADD_PATIENT = gql`
  mutation addPatient(
    $name: String!
    $dateOfBirth: String!
    $emergencyContact: String!
  ) {
    addPatient(
      name: $name
      dateOfBirth: $dateOfBirth
      emergencyContact: $emergencyContact
    ) {
      id
      name
      dateOfBirth
      emergencyContact
    }
  }
`;

const DELETE_PATIENT = gql`
  mutation deletePatient($id: ID!) {
    deletePatient(id: $id) {
      id
      name
      dateOfBirth
      emergencyContact
    }
  }
`;

export { ADD_PATIENT, DELETE_PATIENT };
