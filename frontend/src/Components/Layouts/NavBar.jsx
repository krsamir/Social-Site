import React from "react";
import "./NavBar.css";
import { Button } from "react-bootstrap";
const NavBarComponent = () => {
  return (
    <div>
      <div className="row navbar">
        <div className="col section1">
          <h3>College</h3>
        </div>
        <div className="col">
          <div>
            <input type="text" className="searchBox" />
          </div>
        </div>
        <div className="col section3">
          <Button
            variant="dark"
            onClick={() => {
              window.localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBarComponent;
