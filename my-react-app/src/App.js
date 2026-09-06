import {Route,Routes} from "react-router-dom";
import './App.css';
import React from 'react';
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      
      
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" 
          element={ <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>} />
      </Routes>
      
    </div>
  );
}

export default App;
