import React from "react";
import NavBar from "./NavBar";
import Post from "../Feeds/Post.jsx";
import Feeds from "../Feeds/Feeds";
import "./NavBar.css";
function Home(props) {
  return (
    <div>
      <NavBar {...props} />
      <div className="row" style={{ marginTop: "60px" }}>
        <div className="col t1"></div>
        <div className="col t2">
          <Post {...props} />
          <div className="spacer" style={{ marginTop: "20px" }}></div>
          <Feeds {...props} />
        </div>
        <div className="col t3"></div>
      </div>
    </div>
  );
}

export default Home;
