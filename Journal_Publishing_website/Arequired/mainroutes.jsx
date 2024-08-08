import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../home'; 



export default function MainRoutes() {
  return (
    <div>
   
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}