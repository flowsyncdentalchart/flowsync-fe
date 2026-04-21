import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
        <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
          </AuthProvider>
    </BrowserRouter>
  );
}

export default App;