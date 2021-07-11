import React from "react";
import { Avatar } from "@material-ui/core";
import "./Feed.css";
const Feed = ({ data }) => {
  if (data) {
    var fullName = "";
    if (data.posted_by.split(" ").length >= 2) {
      const first = data.posted_by.split(" ")[0].charAt(0).toUpperCase();
      const last = data.posted_by.split(" ")[1].charAt(0).toUpperCase();
      fullName = first + last;
    } else if (data.posted_by.split(" ").length === 1) {
      const first = data.posted_by.split(" ")[0].charAt(0).toUpperCase();
      fullName = first;
    }
    return (
      <div>
        <div className="feed">
          <div className="feed__body">
            <div className="feed__header">
              <Avatar>{fullName}</Avatar>
              {data.posted_by}
            </div>
            <div className="feed__hrline"></div>
            <div className="feed__content">
              <div className="feed__text">{data.text}</div>
              <div className="feed__image">
                <img src="" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Feed;
