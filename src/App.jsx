import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Mailbox from "./pages/Mailbox";
import MailDetail from "./pages/MailDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes: only for not-logged-in users */}
        <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />

        {/* Protected Routes: only for logged-in users */}
        <Route path="/mailbox" element={<ProtectedRoute><Mailbox /></ProtectedRoute>} />
        <Route path="/mail/:id" element={<ProtectedRoute><MailDetail /></ProtectedRoute>} />

        {/* Unknown routes redirect to Mailbox (if logged in) */}
        <Route path="*" element={<ProtectedRoute><Mailbox /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
