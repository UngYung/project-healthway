import { gql } from "@apollo/client";

const GET_PATIENTS = gql`
  query getPatients {
    patients {
      id
      name
      dateOfBirth
      emergencyContact
    }
  }
`;

export { GET_PATIENTS };
