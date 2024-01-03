import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_PATIENT } from "../mutations/patientMutations";
import { GET_PATIENTS } from "../queries/patientQueries";

export default function PatientRow({ patient }) {
  const [deletePatient] = useMutation(DELETE_PATIENT, {
    variables: { id: patient.id },
    refetchQueries: [{ query: GET_PATIENTS }],
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
