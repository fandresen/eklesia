import { Route, Routes } from "react-router-dom";
import "./App.css";
import SondageContainer from "./features/Sondage/pages/SondageContainer";
import LandingPage from "./landingPage";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/sondage" element={<SondageContainer/>}/>
    </Routes>
    </>
  );
}

export default App;
