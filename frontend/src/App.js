import React from 'react';
import ProductList from './components/ProductList';
import './App.css';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-content">
          <h2 className="navbar-logo">📦 Product Manager</h2>
          <p className="navbar-subtitle">List • Filter • Export</p>
        </div>
      </nav>

      <main className="main-content">
        <ProductList />
      </main>

      <footer className="footer">
        <p>&copy; 2025 Product Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
