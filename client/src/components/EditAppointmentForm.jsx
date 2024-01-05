import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_APPOINTMENT } from "../queries/appointmentQueries";
import { UPDATE_APPOINTMENT } from "../mutations/appointmentMutations";

export default function EditAppointmentForm({ appointment }) {
  const [appointmentDate, setAppointmentDate] = useState(
    appointment.appointmentDate
  );
  const [time, setTime] = useState(appointment.time);
  const [purpose, setPurpose] = useState("");
  const [notes, setNotes] = useState(appointment.notes);

  const [updateAppointment] = useMutation(UPDATE_APPOINTMENT, {
    variables: { id: appointment.id, appointmentDate, time, purpose, notes },
    refetchQueries: [
      { query: GET_APPOINTMENT, variables: { id: appointment.id } },
    ],
  });

  const onSubmit = (e) => {
    e.preventDefault();
    updateAppointment(appointmentDate, time, purpose, notes);
  };

  return (
    <div className="mt-5">
      <h3>Update appointment details</h3>
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
