import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/login/SignUpPage';
import SignInPage from './pages/login/SignInPage';
import RecoverPassword from './pages/login/RecoverPassword';
import Dashboard from './pages/dashboard/Dashboard';
import DialPad from './pages/dashboard/DialPad';
import CallHistory from './pages/dashboard/CallHistory';
import Notes from './pages/dashboard/Notes';
import DailyUsage from './pages/dashboard/DailyUsage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dialpad" element={<DialPad />} />
        <Route path="/call-history" element={<CallHistory />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/daily-usage" element={<DailyUsage />} />
      </Routes>
    </Router>
  );
}

export default App;
