import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_PATIENT } from "../mutations/patientMutations";
import { GET_PATIENTS } from "../queries/patientQueries";
import { GET_APPOINTMENTS } from "../queries/appointmentQueries";

export default function PatientRow({ patient }) {
  const [deletePatient] = useMutation(DELETE_PATIENT, {
    variables: { id: patient.id },
    refetchQueries: [{ query: GET_PATIENTS }, { query: GET_APPOINTMENTS }],
    // update(cache, { data: { deletePatient } }) {
    //   const { patients } = cache.readQuery({ query: GET_PATIENTS });
    //   cache.writeQuery({
    //     query: GET_PATIENTS,
    //     data: {
    //       patients: patients.filter(
    //         (patient) => patient.id !== deletePatient.id
    //       ),
    //     },
    //   });
    // },
  });

  return (
    <tr>
      <td>{patient.name}</td>
      <td>{patient.dateOfBirth}</td>
      <td>{patient.emergencyContact}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deletePatient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
