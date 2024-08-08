import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainRoutes from './routes/mainroutes';
function App() {
  return (
    <Router>
      <div>
        <MainRoutes/>
      </div>
    </Router>
  );
}

export default App;
