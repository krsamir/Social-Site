import React from "react";
import "./NavBar.css";
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
        <div className="col section3"></div>
      </div>
    </div>
  );
};

export default NavBarComponent;
