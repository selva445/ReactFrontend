import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/Admin/Dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/Admin/Product" className="nav-link">
          Product
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/Admin/Products" className="nav-link">
          Products
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/Admin/Category" className="nav-link">
          Category
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/Admin/Sub" className="nav-link">
          Sub Category
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/Admin/Coupon" className="nav-link">
          Coupon
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/User/Password" className="nav-link">
          Password
        </Link>
      </li>
    </ul>
  </nav>
);

export default AdminNav;
