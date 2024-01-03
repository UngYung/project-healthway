import { useQuery } from "@apollo/client";
import PatientRow from "./PatientRow";
import { GET_PATIENTS } from "../queries/patientQueries";
import Spinner from "./Spinner";

export default function Patients() {
  const { loading, error, data } = useQuery(GET_PATIENTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;
  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Emergency Contact</th>
            </tr>
          </thead>
          <tbody>
            {data.patients.map((patient) => {
              return <PatientRow key={patient.id} patient={patient} />;
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
