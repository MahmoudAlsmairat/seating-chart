import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SeatingChart from "./components/SeatingChart";
import ViewChart from "./view-chart";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SeatingChart />} />
        <Route path="/chart" element={<ViewChart />} />
      </Routes>
    </Router>
  );
};

export default App;
