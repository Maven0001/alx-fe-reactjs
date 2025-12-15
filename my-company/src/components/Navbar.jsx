import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#00cc55ff",
        padding: "16px",
        width: "100vw",
      }}
    >
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          listStyle: "none",
        }}
      >
        <li>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
            About
          </Link>
        </li>
        <li>
          <Link
            to="/services"
            style={{ color: "white", textDecoration: "none" }}
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            style={{ color: "white", textDecoration: "none" }}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
