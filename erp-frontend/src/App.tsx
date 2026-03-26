import { LoginPage } from "./Components/LogginApp";
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LoginPage}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;