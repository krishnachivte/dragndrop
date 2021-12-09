import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Details  from './Details';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/details/:id' element={<Details />}>
          </Route>
          <Route path='/' element={<Home />}>
          </Route>
        </Routes>  
      </div>
    </BrowserRouter>
    
  );
}

export default App;
