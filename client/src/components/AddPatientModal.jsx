import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_PATIENT } from "../mutations/patientMutations";
import { GET_PATIENTS } from "../queries/patientQueries";

export default function AddPatientModal() {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const [addPatient] = useMutation(ADD_PATIENT, {
    variables: { name, dateOfBirth, emergencyContact },
    update(cache, { data: { addPatient } }) {
      const { patients } = cache.readQuery({ query: GET_PATIENTS });
      cache.writeQuery({
        query: GET_PATIENTS,
        data: { patients: [...patients, addPatient] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || dateOfBirth === "" || emergencyContact === "") {
      return alert("Please fill in all fields");
    }
    addPatient(name, dateOfBirth, emergencyContact);
    setName("");
    setDateOfBirth("");
    setEmergencyContact("");
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addPatientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Patient</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addPatientModal"
        aria-labelledby="addPatientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addPatientModalLabel">
                New Patient
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
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="text"
                    className="form-control"
                    id="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Emergency Contact</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emergencyContact"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
