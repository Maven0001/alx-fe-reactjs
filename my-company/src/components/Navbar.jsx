import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#00cc55ff",
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        gap: "24px",
      }}
    >
      <ul>
        <li>
          <link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </link>
          <link to="/about" style={{ color: "white", textDecoration: "none" }}>
            About
          </link>
          <link
            to="/services"
            style={{ color: "white", textDecoration: "none" }}
          >
            Services
          </link>
          <link
            to="/contact"
            style={{ color: "white", textDecoration: "none" }}
          >
            Contact
          </link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
