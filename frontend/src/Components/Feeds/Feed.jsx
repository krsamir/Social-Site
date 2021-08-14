import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import "./Feed.css";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Image from "react-bootstrap/Image";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { Menu, MenuItem } from "@material-ui/core";
import axios from "axios";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { deletePost } from "../../Redux/Actions/FeedAction";
const Feed = (props) => {
  const { data } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [noOfLikes, setNoOfLikes] = useState(0);
  const [likeState, setLikeState] = useState(data);
  useEffect(() => {
    if (data !== undefined) {
      setNoOfLikes(data.totalLikes);
    }
  }, [data]);
  const [index, setIndex] = useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
    const handleLike = (data) => {
      const { post_id } = data;
      axios
        .get(`/api/like/${post_id}`)
        .then((res) => {
          const value = { ...data };
          value.likedByCurrentUser = res.data.status[0][0].returnValue;
          if (res.data.status[0][0].returnValue === 0) {
            setNoOfLikes((prevState) => prevState - 1);
          } else if (res.data.status[0][0].returnValue === 1) {
            setNoOfLikes((prevState) => prevState + 1);
          }
          setLikeState(value);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    const handleDelete = (userID) => {
      props.deletePost(userID);
      handleClose();
    };
    const { media } = data;
    return (
      <div>
        <div className="feed">
          <div className="feed__body">
            <div className="feed__header">
              <Avatar className="feed__header__avatar">
                <span className="feed__header__avatar__text">{fullName}</span>
              </Avatar>
              <span className="feed__header__text">{data.posted_by}</span>
              <MoreVertIcon
                style={{ cursor: "pointer" }}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              />
            </div>
            {/* <div className="feed__hrline"></div> */}
            <div className="feed__content">
              <hr />
              <div className="feed__text">{data.text}</div>
              {media !== null && (
                <div className="feed__image feed__post__imageBox">
                  <div className="bigBox" style={{ width: "100%" }}>
                    <div className="box1">
                      {data.media.length > 1 && (
                        <ChevronLeftIcon
                          className="arrow"
                          onClick={() => {
                            if (index >= 1) {
                              setIndex((prevState) => prevState - 1);
                            }
                          }}
                        />
                      )}
                    </div>
                    <div className="box2">
                      <Image
                        className="feed__post__images"
                        // src={`../../Uploads/${value.filename}`}
                        src={
                          // require(`../../../build/static/media/${media[index].filename}`)
                          require(`../../../../Uploads/${media[index].filename}`)
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
                      {data.media.length > 1 && (
                        <ChevronRightIcon
                          className="arrow"
                          onClick={() => {
                            if (index < data.media.length - 1) {
                              setIndex((prevState) => prevState + 1);
                            }
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="feed__footer">
              <hr />
              <div className="row">
                <div className="col">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row",
                      cursor: "pointer",
                      alignItems: "center",
                    }}
                    onClick={() => handleLike(data)}
                  >
                    <div>
                      {likeState.likedByCurrentUser === 0 ? (
                        <ThumbUpAltOutlinedIcon />
                      ) : (
                        <ThumbUpAltIcon />
                      )}

                      <span>({noOfLikes === null ? "0" : noOfLikes})</span>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row",
                      borderLeft: "0.5px inset #ebebeb",
                      cursor: "pointer",
                      alignContent: "center",
                    }}
                  >
                    <div>
                      <ModeCommentOutlinedIcon />
                      <span>(0)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {data.parent && (
              <MenuItem onClick={() => handleDelete(data.post_id)}>
                Delete
              </MenuItem>
            )}
            {!data.parent && <MenuItem onClick={handleClose}>Report</MenuItem>}
          </Menu>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default connect(null, {
  deletePost,
})(Feed);
