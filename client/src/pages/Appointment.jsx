import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import PatientInfo from "../components/PatientInfo";
import DeleteAppointmentButton from "../components/DeleteAppointmentButton";
import EditAppointmentForm from "../components/EditAppointmentForm";
import { useQuery } from "@apollo/client";
import { GET_APPOINTMENT } from "../queries/appointmentQueries";

export default function Appointment() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_APPOINTMENT, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className="'mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>
          <h1 className="mt-3">{data.appointment.purpose}</h1>
          <p className="lead">{data.appointment.notes}</p>
          <p>{data.appointment.appointmentDate}</p>
          <p>{data.appointment.time}</p>

          <PatientInfo patient={data.appointment.patient} />

          <DeleteAppointmentButton appointmentId={data.appointment.id} />

          <EditAppointmentForm appointment={data.appointment} />
        </div>
      )}
    </>
  );
}
