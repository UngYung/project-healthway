import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { GET_APPOINTMENTS } from "../queries/appointmentQueries";
import AppointmentCard from "./AppointmentCard";

export default function Appointments() {
  const { loading, error, data } = useQuery(GET_APPOINTMENTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      {data.appointments.length > 0 ? (
        <div className="row mt-3">
          {data.appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      ) : (
        <p>No Appointments</p>
      )}
    </>
  );
}
