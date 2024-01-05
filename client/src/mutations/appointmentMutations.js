import { gql } from "@apollo/client";

const ADD_APPOINTMENT = gql`
  mutation AddAppointment(
    $appointmentDate: String!
    $time: String!
    $purpose: AppointmentPurpose!
    $notes: String!
    $patient: ID!
  ) {
    addAppointment(
      appointmentDate: $appointmentDate
      time: $time
      purpose: $purpose
      notes: $notes
      patient: $patient
    ) {
      id
      appointmentDate
      time
      purpose
      notes
      patient {
        id
        name
        dateOfBirth
        emergencyContact
      }
    }
  }
`;

const DELETE_APPOINTMENT = gql`
  mutation DeleteAppointment($id: ID!) {
    deleteAppointment(id: $id) {
      id
    }
  }
`;

const UPDATE_APPOINTMENT = gql`
  mutation UpdateAppointment(
    $id: ID!
    $appointmentDate: String!
    $time: String!
    $purpose: AppointmentPurposeUpdate!
    $notes: String!
  ) {
    updateAppointment(
      id: $id
      appointmentDate: $appointmentDate
      time: $time
      purpose: $purpose
      notes: $notes
    ) {
      id
      appointmentDate
      time
      purpose
      notes
    }
  }
`;

export { ADD_APPOINTMENT, DELETE_APPOINTMENT, UPDATE_APPOINTMENT };
