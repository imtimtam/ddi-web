import { Routes, Route } from "react-router";
import { Header } from "./components/Header.jsx";
import { Nav } from "./components/Nav.jsx";
import { InteractionPage } from "./pages/InteractionChecker/InteractionPage";

function App() {
  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<InteractionPage />} />
      </Routes>
    </>
  );
}

export default App;
