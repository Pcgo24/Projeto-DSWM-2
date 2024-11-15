import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {

  return (
    <header>
      <Link to="/" className="header-logo">
        Dondokas
      </Link>

      <nav className="navbar">
        <Link to="/feedback" className="nav-link">Feedback</Link>
        
        <div className="dropdown">
          <button className="dropdown-button">Conta</button>
          <div className="dropdown-content">
            <Link to="/login">Login</Link>
            <Link to="/register">Cadastro</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
