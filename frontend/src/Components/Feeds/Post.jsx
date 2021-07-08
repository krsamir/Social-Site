import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import "./Post.css";
import ImageUpload from "./ImageUpload";
import { UploadImages } from "../../Redux/Actions/FeedAction";
import { connect } from "react-redux";
import CancelIcon from "@material-ui/icons/Cancel";
function Post(props) {
  const { images } = props;
  const urls = Array.from(images).map((value) => URL.createObjectURL(value));
  useEffect(() => {
    return () => {
      Array.from(images).map((value) => URL.revokeObjectURL(value));
    };
  }, [images]);
  return (
    <div>
      <div className="post">
        <div className="post__top">
          <ImageUpload {...props} />
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
        <div className="post__imageBox">
          {urls &&
            urls.map((value, index) => {
              return (
                <div>
                  <img
                    src={value}
                    key={index}
                    className="post__images image1"
                    alt=""
                  />
                  <CancelIcon
                    className="image2"
                    onClick={(e) => {
                      console.log(
                        "🚀 ~ file: Post.jsx ~ line 42 ~ urls.map ~ i",
                        index
                      );
                    }}
                  />
                </div>
              );
            })}
        </div>
        <div className="post__bottom">
          <Button variant="primary">Post</Button>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  images: state.feed.images,
});

export default connect(mapStateToProps, {
  UploadImages,
})(Post);

// export default Post;
