import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import "./userPage.css";
import Button from "../../components/button/Button.jsx";
import Logo from "../../assets/logo.jsx";
import AddIcon from "../../assets/AddIcon.jsx";

const recentPatients = ["Bodil Sten", "Marie Joel", "Martha Malm", "Amanda Torkelsson"];

      {/* temporary mock patients */}

const allPatients = [
  "Gabriela Solez",
  "Michael Joel",
  "Ali Safari",
  "Sebastian Strands",
  "Michaela Green",
  "Marie Smith",
  "Grigory Ivanov",
  "Marius Polacu",
  "Lia Greenman",
  "Angela Bors",
];


export default function UserPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(allPatients);
  const [activePatient, setActivePatient] = useState("");

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    setFilteredPatients(
      allPatients.filter((p) => p.toLowerCase().includes(query))
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const { user } = useContext(AuthContext);

  return (
    <div className="up-layout">
      {/* sidebar */}
      <aside className="up-sidebar">
        <div className="up-logo">
          <Logo className="up-logo-icon" />
          <span className="up-logo-text">FlowSync</span>
        </div>

        <p className="up-section-label">Recent patients</p>
        <ul className="up-patient-list">
          {recentPatients.map((name) => (
            <li
              key={name}
              className={`up-patient-item ${activePatient === name ? "active" : ""}`}
              onClick={() => setActivePatient(name)}
            >
              {name}
            </li>
          ))}
        </ul>

        <button className="up-add-btn">
          <span className="up-add-icon"><AddIcon /></span> Add new patient
        </button>
      </aside>

      {/* main content */}
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
          <Button className="up-search-btn" onClick={handleSearch}>
            SEARCH
          </Button>
        </div>

        <div className="up-results">
          {filteredPatients.map((name) => (
            <div key={name} className="up-result-item">
              {name}
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