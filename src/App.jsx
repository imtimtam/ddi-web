import { Routes, Route } from "react-router";
import { InteractionPage } from "./pages/InteractionChecker/InteractionPage";

import "./styles/base.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<InteractionPage />} />
    </Routes>
  );
}

export default App;
