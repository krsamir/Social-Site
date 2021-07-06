import React from "react";
import NavBar from "./NavBar";
import Post from "../Feeds/Post.jsx";
import "./NavBar.css";
function Home() {
  return (
    <div>
      <NavBar />
      <div className="row">
        <div className="col t1"></div>
        <div className="col t2">
          <Post />
        </div>
        <div className="col t3"></div>
      </div>
    </div>
  );
}

export default Home;
