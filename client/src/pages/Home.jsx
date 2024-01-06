import Patients from "../components/Patients";
import Appointments from "../components/Appointments";
import PharmacyChart from "../components/PharmacyChart";
import AddPatientModal from "../components/AddPatientModal";
import AddAppointmentModal from "../components/AddAppointmentModal";
import UpdateInventoryModal from "../components/UpdateInventoryModal";

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddPatientModal />
        <AddAppointmentModal />
        <UpdateInventoryModal />
      </div>
      <Appointments />
      <hr />
      <Patients />
      <hr />

      <PharmacyChart />
    </>
  );
}
