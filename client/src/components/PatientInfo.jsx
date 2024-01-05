import { FaIdBadge, FaCalendar, FaPhone } from "react-icons/fa";

export default function PatientInfo({ patient }) {
  return (
    <>
      <h5 className="mt-5">Patient Info</h5>
      <ul className="list-group">
        <li className="list-group-item">
          <FaIdBadge className="icon" /> {patient.name}
        </li>
        <li className="list-group-item">
          <FaCalendar className="icon" /> {patient.dateOfBirth}
        </li>
        <li className="list-group-item">
          <FaPhone className="icon" /> {patient.emergencyContact}
        </li>
      </ul>
    </>
  );
}
