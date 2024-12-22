import React from 'react'
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigations() {
  return (
    <nav>
    <ul>
        <li>
      <Link to="/" className="list">
        Home
      </Link>
      </li>
      <li>
      <Link to="/orders" className="list">
        Order History
      </Link>
      </li>
    </ul>
  </nav>
  )
}

export default Navigations