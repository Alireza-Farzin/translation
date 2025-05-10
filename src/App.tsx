import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TranslationProvider } from "./context/TranslationContext";
import HomePage from "./pages/HomePage";
import ManagementPage from "./pages/ManagementPage";
import PublicPage from "./pages/PublicPage";

const App = () => {
  return (
    <TranslationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/management" element={<ManagementPage />} />
          <Route path="/public" element={<PublicPage />} />
        </Routes>
      </Router>
    </TranslationProvider>
  );
};

export default App;