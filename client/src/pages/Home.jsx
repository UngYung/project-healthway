import Patients from "../components/Patients";
import Appointments from "../components/Appointments";
import AddPatientModal from "../components/AddPatientModal";
import AddAppointmentModal from "../components/AddAppointmentModal";

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddPatientModal />
        <AddAppointmentModal />
      </div>
      <Appointments />
      <hr />
      <Patients />
    </>
  );
}
