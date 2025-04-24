import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import SignUpPage from './pages/login/SignUpPage';
import SignInPage from './pages/login/SignInPage';
import RecoverPassword from './pages/login/RecoverPassword';
import Dashboard from './pages/dashboard/Dashboard';
import DialPad from './pages/dashboard/DialPad';
import CallHistory from './pages/dashboard/CallHistory';
import Notes from './pages/dashboard/Notes';
import DailyUsage from './pages/dashboard/DailyUsage';
import ChangePassword from './pages/login/ChangePassword';
import ProtectedRoute from './auth/ProtectedRoute'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dialpad"
          element={
            <ProtectedRoute>
              <DialPad />
            </ProtectedRoute>
          }
        />
        <Route
          path="/call-history"
          element={
            <ProtectedRoute>
              <CallHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/daily-usage"
          element={
            <ProtectedRoute>
              <DailyUsage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
