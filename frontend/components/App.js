import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home'; 
import Form from './Form'; 

function App() {
  return (
      <div id="app">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/order">Order</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Form />} />
        </Routes>
      </div>
    
  );
}

export default App;

