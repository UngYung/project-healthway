import React from "react";

export default function AppointmentCard({ appointment }) {
  return (
    <div className="col-md-4">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{appointment.purpose}</h5>
            <a
              className="btn btn-light"
              href={`/appointments/${appointment.id}`}
            >
              View
            </a>
          </div>
          <p className="small">
            Notes: <strong>{appointment.notes}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
