import React from 'react';
import Logo from '../../images/logo.svg';
import './Header.scss';

const Header = () => (
  <header className="App-header">
    <img src={Logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Welcome to React</h1>
  </header>
);

export default Header;
