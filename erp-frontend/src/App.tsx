import { LoginPage } from "./Pages/LogginApp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./Components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LoginPage}></Route>
        <Route path="/dashboard" Component={Layout} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
