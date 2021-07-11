import React from "react";
import "./NavBar.css";
import { Button } from "react-bootstrap";
const NavBarComponent = () => {
  return (
    <div className="top">
      <div className="row navbar">
        <div className="col section1">
          <h3>Family Book</h3>
        </div>
        <div className="col">
          <div className="nav__center">
            <input type="text" className="searchBox" />
            <Button
              className="logout__button"
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
