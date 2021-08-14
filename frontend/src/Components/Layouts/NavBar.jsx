import React, { useState } from "react";
import "./NavBar.css";
import { Button as Buttons } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllPost, getPostByUser } from "../../Redux/Actions/FeedAction";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
const NavBarComponent = (props) => {
  // const { getAllPost } = props;
  const [searchText, setSearchText] = useState("");
  const [searchArray, setSearchArray] = useState([]);
  // const handleClick = (value) => {
  //   setSearchArray([]);
  //   setSearchText("");
  //   props.getPostByUser(value.id);
  // };

  // const handleHomeClick = () => {
  //   getAllPost();
  // };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    axios
      .get(`/api/search?query=${value}`)
      .then((res) => {
        setSearchArray(res.data);
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: NavBar.jsx ~ line 22 ~ axios.get ~ error",
          error
        );
      });
  };
  return (
    <div className="top">
      <div className="row navbar">
        <div className="col section1">
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            // onClick={handleHomeClick}
          >
            <h3>Family Book</h3>
          </Link>
        </div>
        <div className="col">
          <div className="nav__center">
            <div className="nav__searchBox">
              <input
                type="text"
                className="searchBox"
                value={searchText}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onChange={handleChange}
              />
              {searchText !== "" && searchArray.length !== 0 && (
                <div className="dropdownBox">
                  {searchArray.map((value) => {
                    return (
                      <div
                        key={value.id}
                        className="dropdown"
                        // onClick={() => handleClick(value)}
                      >{`${value.firstname}  ${value.lastname}`}</div>
                    );
                  })}
                </div>
              )}
            </div>
            <Buttons
              className="logout__button"
              variant="dark"
              onClick={() => {
                window.localStorage.clear();
                window.location.reload();
              }}
            >
              Logout
            </Buttons>
          </div>
        </div>
        <div className="col section3">
          <Buttons
            variant="light"
            // onClick={() => {
            //   props.getPostByUser(null);
            // }}
            style={{
              marginRight: "5px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <i>
              <PersonOutlineIcon />
            </i>
            My Account
          </Buttons>
          <Buttons
            variant="dark"
            onClick={() => {
              window.localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { getAllPost, getPostByUser })(NavBarComponent);
