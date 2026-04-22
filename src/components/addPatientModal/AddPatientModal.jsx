import { useState } from "react";
import "./addPatientModal.css";
import Button from "../button/Button.jsx";
import { createPatient } from "../../services/patientService";

export default function AddPatientModal({ onClose, onPatientCreated }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setError("");
  };

  const handleSubmit = async () => {
    if (loading) return;

    if (!firstName.trim() || !lastName.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const newPatient = await createPatient({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      // 🔥 instant update in parent
      onPatientCreated?.(newPatient);

      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to create patient. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-patient-overlay" onClick={onClose}>
      <div
        className="add-patient-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="add-patient-title">New Patient</h2>

        <input
          className="add-patient-input"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          className="add-patient-input"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        {error && <p className="add-patient-error">{error}</p>}

        <div className="add-patient-footer">
          <button onClick={onClose} disabled={loading}>
            Cancel
          </button>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
}