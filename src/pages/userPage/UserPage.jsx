import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import "./userPage.css";
import Button from "../../components/buttons/Button.jsx";
import Logo from "../../assets/logo.jsx";
import AddIcon from "../../assets/AddIcon.jsx";
import { getAllPatients } from "../../services/patientService";

export default function UserPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);
  const [activePatient, setActivePatient] = useState("");
  const { user } = useContext(AuthContext);

useEffect(() => {
  getAllPatients().then((data) => {
    console.log("First patient:", JSON.stringify(data[0]));
    setPatients(data);
    setFilteredPatients(data);
    setRecentPatients(data.slice(0, 4));
  });
}, []);

const handleSearch = () => {
  const query = searchQuery.toLowerCase();
  console.log("Query:", query);
  console.log("Patients array:", patients);
  const results = patients.filter(
    (p) =>
      p.firstName.toLowerCase().includes(query) ||
      p.lastName.toLowerCase().includes(query)
  );
  console.log("Results:", results);
  setFilteredPatients(results);
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="up-layout">
      <aside className="up-sidebar">
        <div className="up-logo">
          <Logo className="up-logo-icon" />
          <span className="up-logo-text">FlowSync</span>
        </div>

        <p className="up-section-label">Recent patients</p>
        <ul className="up-patient-list">
          {recentPatients.map((p) => (
            <li
              key={p.id}
              className={`up-patient-item ${activePatient === p.id ? "active" : ""}`}
              onClick={() => setActivePatient(p.id)}
            >
              {p.firstName} {p.lastName}
            </li>
          ))}
        </ul>

        <button className="up-add-btn">
          <span className="up-add-icon"><AddIcon /></span> Add new patient
        </button>
      </aside>

      <main className="up-main">
        <div className="up-user-header">
          <h1 className="up-user-name">{user?.firstName} {user?.lastName}</h1>
          <p className="up-user-title">{user?.title}</p>
        </div>

        <div className="up-search-bar">
          <input
            className="up-search-input"
            type="text"
            placeholder="SEARCH PATIENTS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
       <Button className="up-search-btn" onClick={() => console.log("button clicked")}>
  SEARCH
</Button>
        </div>

        <div className="up-results">
          {filteredPatients.map((p) => (
            <div key={p.id} className="up-result-item">
              {p.firstName} {p.lastName}
            </div>
          ))}
          {filteredPatients.length === 0 && (
            <p className="up-no-results">No patients found.</p>
          )}
        </div>
      </main>
    </div>
  );
}