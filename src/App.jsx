// ...existing code...
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import PersonalityTest from "./pages/PersonalityTest";
import InterestTest from "./pages/InterestTest";
import GraphResult from "./pages/GraphResult";
import SuitableCareers from "./pages/SuitableCareers";
import NotRecommended from "./pages/NotRecommended";
// Report pages removed

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Entry and Home */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />

        {/* Assessment routes (used by buttons/navigations) */}
        <Route path="/assessment/personality-test" element={<PersonalityTest />} />
        <Route path="/assessment/interest-test" element={<InterestTest />} />
        <Route path="/assessment/graph-result" element={<GraphResult />} />
        <Route path="/assessment/suitable-careers" element={<SuitableCareers />} />
    <Route path="/assessment/not-recommended" element={<NotRecommended />} />
        {/* Backward-compatible /results routes (optional) */}
        <Route path="/results" element={<GraphResult />} />
        <Route path="/results/suitable" element={<SuitableCareers />} />
        <Route path="/results/not-recommended" element={<NotRecommended />} />

        {/* Fallback route */}
        <Route
          path="*"
          element={
            <div className="text-center mt-20 text-red-600">
              <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
// ...existing code...