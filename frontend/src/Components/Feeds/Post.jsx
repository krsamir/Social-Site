import React from "react";
import { Button } from "react-bootstrap";
import "./Post.css";
function Post() {
  return (
    <div>
      <div className="post">
        <div className="post__top">
          <i className="fas fa-image icons icon1"></i>
          <i className="fas fa-map-marker-alt icons"></i>
        </div>
        <div className="post__middle">
          <textarea
            name=""
            id=""
            rows="5"
            className="box"
            placeholder="Whats up on your mind "
          ></textarea>
        </div>
        <div className="post__bottom">
          <Button variant="primary">Post</Button>
        </div>
      </div>
    </div>
  );
}

export default Post;
