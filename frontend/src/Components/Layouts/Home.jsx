import React from "react";
import NavBar from "./NavBar";
import Post from "../Feeds/Post.jsx";
function Home() {
  return (
    <div>
      <NavBar />
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <Post />
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}

export default Home;
