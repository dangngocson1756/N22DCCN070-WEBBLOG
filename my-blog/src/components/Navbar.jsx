import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h2>Web Blog</h2>
          <span>NGHỆ THUẬT & CÔNG NGHỆ</span>
        </Link>
      </div>
      <div className="links">
        {/* Dùng thuộc tính "to" để chỉ định đường dẫn */}
        <Link to="/">TRANG CHỦ</Link>
        <Link to="/about-us">GIỚI THIỆU</Link>
        <Link to="/login">ĐĂNG NHẬP</Link>
        <span className="write">
          <Link to="/write">VIẾT BÀI</Link>
        </span>
      </div>
    </div>
  );
};

export default Navbar;