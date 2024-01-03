import { gql } from "@apollo/client";

const DELETE_PATIENT = gql`
  mutation deletePatient($id) {
    deletePatient(id: $id) {
      id
      name
      dateOfBirth
      emergencyContact
    }
  }
`;

export { DELETE_PATIENT };
