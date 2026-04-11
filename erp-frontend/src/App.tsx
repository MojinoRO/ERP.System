import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./Pages/LogginApp";
import DashboardLayout from "./Components/Layout/DashboardLayout";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users"     element={<Users />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;