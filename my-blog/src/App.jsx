import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Write from './pages/Write';
import Login from './pages/Login';
import SinglePost from './pages/SinglePost';

import './App.css';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  return (
    <div className="app">
      <div className="container">
        <BrowserRouter>
          <Routes>
            {/* Tất cả trang đều có Navbar + Footer */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about-us" element={<About />} />
              <Route path="write" element={<Write />} />
              <Route path="login" element={<Login />} />
              <Route path="post/:id" element={<SinglePost />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;