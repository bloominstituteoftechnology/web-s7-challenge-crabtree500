import React from 'react'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './Home'
import Form from './Form'
function App() {
  <BrowserRouter>
  return (
    <div id="app">
      <nav>
        <Link to= '/'>Home</Link>
        <Link to= 'Order'>Order</Link>
      </nav>
      <Routes>
        <Route path = "/" element ={<Home />} />
        <Route path = "Order" element ={<Form />} />
      </Routes>
    </div>
  );
</BrowserRouter>
}
export default App
