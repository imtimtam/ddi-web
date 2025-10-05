import { Routes, Route } from "react-router";
import { InteractionPage } from "./pages/InteractionChecker/InteractionPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<InteractionPage />} />
    </Routes>
  );
}

export default App;
