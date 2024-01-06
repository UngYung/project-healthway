import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { DELETE_APPOINTMENT } from "../mutations/appointmentMutations";
import { GET_APPOINTMENTS } from "../queries/appointmentQueries";
import { useMutation } from "@apollo/client";

export default function DeleteAppointmentButton({ appointmentId }) {
  const navigate = useNavigate();

  const [deleteAppointment] = useMutation(DELETE_APPOINTMENT, {
    variables: { id: appointmentId },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_APPOINTMENTS }],
  });

  return (
    <div className="d-flex mt-f ms-auto">
      <button className="btn btn-danger m-2" onClick={deleteAppointment}>
        <FaTrash className="icon" />
      </button>
    </div>
  );
}
