import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home'; // Import your Home component
import Form from './Form'; // Import your Form component

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;

