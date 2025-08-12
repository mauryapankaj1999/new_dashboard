// src/App.tsx
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { AppProvider } from "./context/AppContext";
import "./index.css";

// Lazy imports for code splitting
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ProductCatalog = lazy(() => import("./pages/ProductCatalog"));

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Layout>
          {/* Suspense handles loading state for lazy components */}
          <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<ProductCatalog />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </AppProvider>
  );
};

export default App;
