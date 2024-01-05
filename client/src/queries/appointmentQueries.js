import { gql } from "@apollo/client";

const GET_APPOINTMENTS = gql`
  query getAppointments {
    appointments {
      id
      appointmentDate
      time
      purpose
      notes
    }
  }
`;

const GET_APPOINTMENT = gql`
  query getAppointments($id: ID!) {
    appointment(id: $id) {
      id
      appointmentDate
      time
      purpose
      notes
      patient {
        name
        dateOfBirth
        emergencyContact
      }
    }
  }
`;
export { GET_APPOINTMENTS, GET_APPOINTMENT };
