import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import AddPatientModal from "../../components/addPatientModal/AddPatientModal.jsx";
import "./userPage.css";
import Button from "../../components/button/Button.jsx";
import Logo from "../../assets/logo.jsx";
import AddIcon from "../../assets/AddIcon.jsx";
import { getAllPatients, getRecentPatients } from "../../services/patientService";

export default function UserPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);
  const [activePatient, setActivePatient] = useState(null);
  const { user } = useContext(AuthContext);
  const [showAddModal, setShowAddModal] = useState(false);

  // pagination
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // =========================
  // MAIN PAGINATED LIST
  // =========================
 useEffect(() => {
  if (!user) return;

  const fetchPatients = async () => {
    try {
      const res = await getAllPatients(page, size, searchQuery); // pass query ✅
      const content = res?.content ?? res?.data?.content ?? [];
      setPatients(Array.isArray(content) ? content : []);
      setTotalPages(res?.totalPages ?? 0);
    } catch (err) {
      console.error("Failed to fetch patients:", err);
      setPatients([]);
    }
  };

  fetchPatients();
}, [user, page, size, searchQuery]); // add searchQuery ✅


  // =========================
  // RECENT PATIENTS
  // =========================
  useEffect(() => {
    if (!user) return;

    const fetchRecent = async () => {
      try {
        const data = await getRecentPatients();
        setRecentPatients(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch recent patients:", err);
        setRecentPatients([]);
      }
    };

    fetchRecent();
  }, [user]);

  // =========================
  // CREATE PATIENT HANDLER
  // =========================
  const handlePatientCreated = async () => {
    try {
      // refresh paginated list
      const res = await getAllPatients(page, size);

      const content =
        res?.content ??
        res?.data?.content ??
        [];

      setPatients(Array.isArray(content) ? content : []);
      setTotalPages(res?.totalPages ?? 0);

      // refresh recent list
      const recent = await getRecentPatients();
      setRecentPatients(Array.isArray(recent) ? recent : []);
    } catch (err) {
      console.error("Failed to refresh after create:", err);
    }
  };

  // =========================
  // SEARCH FILTER
  // =========================
  const filteredPatients = Array.isArray(patients)
    ? patients.filter((p) =>
        `${p.firstName} ${p.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : [];

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
              className={`up-patient-item ${
                activePatient === p.id ? "active" : ""
              }`}
              onClick={() => setActivePatient(p.id)}
            >
              {p.firstName} {p.lastName}
            </li>
          ))}
        </ul>

        <button className="up-add-btn" onClick={() => setShowAddModal(true)}>
          <span className="up-add-icon">
            <AddIcon />
          </span>
          Add new patient
        </button>
      </aside>

      <main className="up-main">
        <div className="up-user-header">
          <h1 className="up-user-name">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="up-user-title">{user?.title}</p>
        </div>

        <div className="up-search-bar">
          <input
            className="up-search-input"
            type="text"
            placeholder="SEARCH PATIENTS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Button className="up-search-btn">SEARCH</Button>
        </div>

        <div className="up-results">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((p) => (
              <div
                key={p.id}
                className="up-result-item"
                onClick={() => setActivePatient(p.id)}
              >
                {p.firstName} {p.lastName}
              </div>
            ))
          ) : (
            <p className="up-no-results">No patients found.</p>
          )}
        </div>

        {/* pagination */}
        <div className="up-pagination">
          <button
            disabled={page === 0}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </button>

          <span>
            Page {page + 1} of {totalPages || 1}
          </span>

          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>

        {showAddModal && (
          <AddPatientModal
            onClose={() => setShowAddModal(false)}
            onPatientCreated={handlePatientCreated}
          />
        )}
      </main>
    </div>
  );
}