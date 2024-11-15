import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./pages/Header/header.js";
import Home from "./pages/Home/home.js";
import Login from "./pages/Login/login.js";
import Register from "./pages/Register/register.js";
import Feedback from "./pages/Feedback/feedback.js";

// Componente Layout com o Header
function LayoutWithHeader({ children }) {
  return (
    <div>
      <Header />  {/* Renderiza o Header em todas as páginas que utilizam esse layout */}
      {children}  {/* Renderiza o conteúdo específico da página */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Páginas com Header */}
        <Route
          path="/"
          element={
            <LayoutWithHeader>
              <Home />  {/* Página inicial com Header */}
            </LayoutWithHeader>
          }
        />
        <Route
          path="/feedback"
          element={
            <LayoutWithHeader>
              <Feedback />  {/* Página de feedback com Header */}
            </LayoutWithHeader>
          }
        />

        {/* Páginas sem Header */}
        <Route path="/login" element={<Login />} />  {/* Página de login sem Header */}
        <Route path="/register" element={<Register />} />  {/* Página de registro sem Header */}
      </Routes>
    </Router>
  );
}

export default App;
