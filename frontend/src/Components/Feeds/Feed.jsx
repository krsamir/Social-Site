import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import "./Feed.css";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Image from "react-bootstrap/Image";
const Feed = ({ data }) => {
  const [index, setIndex] = useState(0);
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
    const { media } = data;
    // console.log(data);
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
              {media !== null && (
                <div className="feed__image feed__post__imageBox">
                  <div className="bigBox" style={{ width: "100%" }}>
                    <div className="box1">
                      <ChevronLeftIcon
                        className="arrow"
                        onClick={() => {
                          if (index >= 1) {
                            setIndex((prevState) => prevState - 1);
                          }
                          console.log(data.media.length, index);
                        }}
                      />
                    </div>
                    <div className="box2">
                      <Image
                        className="feed__post__images"
                        // src={`../../Uploads/${value.filename}`}
                        src={
                          require(`../../Uploads/${media[index].filename}`)
                            .default
                        }
                        alt="imageHere"
                        // height="100px"
                        // width="auto"
                        fluid
                      />

                      {/* {media !== null &&
                      media.map((value, index) => {
                        return (
                          <Image
                            key={index}
                            className="feed__post__images"
                            // src={`../../Uploads/${value.filename}`}
                            src={
                              require(`../../Uploads/${value.filename}`).default
                            }
                            alt="imageHere"
                            // height="100px"
                            // width="auto"
                            fluid
                          />
                        );
                      })} */}
                    </div>
                    <div className="box3">
                      <ChevronRightIcon
                        className="arrow"
                        onClick={() => {
                          if (index < data.media.length - 1) {
                            setIndex((prevState) => prevState + 1);
                          }
                          console.log(data.media.length, index);
                        }}
                      />
                    </div>
                  </div>
                  <div className="feed__hrline"></div>
                </div>
              )}
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
