import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_APPOINTMENT } from "../mutations/appointmentMutations";
import { GET_APPOINTMENTS } from "../queries/appointmentQueries";
import { GET_PATIENTS } from "../queries/patientQueries";

export default function AddAppointmentModal() {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [time, setTime] = useState("");
  const [purpose, setPurpose] = useState("routine");
  const [notes, setNotes] = useState("");
  const [patient, setPatient] = useState("");

  const [addAppointment] = useMutation(ADD_APPOINTMENT, {
    variables: { appointmentDate, time, purpose, notes, patient },
    update(cache, { data: { addAppointment } }) {
      const { appointments } = cache.readQuery({ query: GET_APPOINTMENTS });
      cache.writeQuery({
        query: GET_APPOINTMENTS,
        data: { appointments: [...appointments, addAppointment] },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_PATIENTS);

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      appointmentDate === "" ||
      time === "" ||
      purpose === "" ||
      notes === "" ||
      patient === ""
    ) {
      return alert("Please fill in all fields");
    }

    addAppointment(appointmentDate, time, purpose, notes, patient);

    setAppointmentDate("");
    setTime("");
    setPurpose("routine");
    setNotes("");
    setPatient("");
  };

  if (loading) return null;
  if (error) return "Something went wrong";

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addAppointmentModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>Add appointment</div>
            </div>
          </button>

          <div
            className="modal fade"
            id="addAppointmentModal"
            aria-labelledby="addAppointmentModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5"
                    id="addAppointmentModalLabel"
                  >
                    New Appointment
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Appointment Date</label>
                      <input
                        type="text"
                        className="form-control"
                        id="appointmentDate"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Appointment Time</label>
                      <input
                        type="text"
                        className="form-control"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Purpose</label>
                      <select
                        className="form-select"
                        id="purpose"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                      >
                        <option value="routine">Routine exam</option>
                        <option value="emergency">Emergency</option>
                        <option value="follow">Follow up</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Notes</label>
                      <input
                        type="text"
                        className="form-control"
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Patient</label>
                      <select
                        className="form-select"
                        id="patient"
                        value={patient}
                        onChange={(e) => setPatient(e.target.value)}
                      >
                        <option value="">Select patient</option>
                        {data.patients.map((patient) => (
                          <option key={patient.id} value={patient.id}>
                            {patient.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      data-bs-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
