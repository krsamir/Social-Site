import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./Post.css";
import ImageUpload from "./ImageUpload";
import { UploadImages } from "../../Redux/Actions/FeedAction";
import { connect } from "react-redux";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  successToast,
  warningToast,
  ErrorToast,
} from "../../Redux/Actions/ToastAction";
import { ToastContainer } from "react-toastify";
function Post(props) {
  const [data, setdata] = useState("");
  const { images } = props;
  const urls = images.map((value) => URL.createObjectURL(value));
  useEffect(() => {
    return () => {
      images.map((value) => URL.revokeObjectURL(value));
    };
  }, [images]);
  const handleImageRemove = (e, index) => {
    const value = [...images];
    value.splice(index, 1);
    props.UploadImages(value);
  };
  const handlePost = async () => {
    const formData = new FormData();
    const file = [];
    for (let i = 0; i < images.length; i++) {
      file[i] = new File([images[i]], `${Date.now()}+${images[i].name}`);
    }
    for (let i = 0; i < file.length; i++) {
      formData.append("myFile[]", file[i]);
      formData.append("Filename", file[i].name);
    }
    if (file.length === 0) {
      // only Text Data
    } else {
      // Text with media
    }
    await axios
      .post("/api/uploadMedia", formData)
      .then((res) => {
        if (res.data.status === "failed") {
          props.ErrorToast("Upload Failed");
        } else if (res.data.status === "uploaded") {
          props.successToast("uploaded Successfully");
        }
      })
      .catch((e) => {
        console.log("🚀 ~ file: Post.jsx ~ line 33 ~ handlePost ~ e", e);
      });
  };
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
            value={data}
            onChange={(e) => {
              setdata(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="post__imageBox">
          {urls &&
            urls.map((value, index) => {
              return (
                <div key={index}>
                  <img src={value} className="post__images image1" alt="" />
                  <CancelIcon
                    className="image2"
                    onClick={(e) => {
                      handleImageRemove(e, index);
                    }}
                  />
                </div>
              );
            })}
        </div>
        <div className="post__bottom">
          <Button variant="primary" onClick={handlePost}>
            Post
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
const mapStateToProps = (state) => ({
  images: state.feed.images,
});

export default connect(mapStateToProps, {
  UploadImages,
  successToast,
  warningToast,
  ErrorToast,
})(Post);

// export default Post;
