import { Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
