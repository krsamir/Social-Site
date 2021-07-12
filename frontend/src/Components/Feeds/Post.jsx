import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./Post.css";
import ImageUpload from "./ImageUpload";
import {
  UploadImages,
  createPost,
  uploadMedia,
} from "../../Redux/Actions/FeedAction";
import { connect } from "react-redux";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  successToast,
  warningToast,
  ErrorToast,
} from "../../Redux/Actions/ToastAction";
import { ToastContainer } from "react-toastify";
function Post(props) {
  const { createPost, images, UploadImages, uploadMedia } = props;
  const [data, setdata] = useState("");

  const urls = images.map((value) => URL.createObjectURL(value));
  useEffect(() => {
    return () => {
      images.map((value) => URL.revokeObjectURL(value));
    };
  }, [images]);
  const handleImageRemove = (e, index) => {
    const value = [...images];
    value.splice(index, 1);
    UploadImages(value);
  };

  const handlePost = async () => {
    const { warningToast } = props;
    if (data === "" && images.length === 0) {
      warningToast("Nothing to upload !!");
    } else if (data !== "" && images.length === 0) {
      createPost(data);
      reinitializeData();
    } else {
      // upload both
      uploadMedia(data, images);
      reinitializeData();
    }
  };

  const reinitializeData = async () => {
    UploadImages([]);
    setdata("");
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
  createPost,
  uploadMedia,
})(Post);

// export default Post;

// const handlePost = async () => {
//   const formData = new FormData();

//   const { warningToast, successToast, ErrorToast } = props;
//   if (data === "" && images.length === 0) {
//     warningToast("Nothing to upload !!");
//   } else if (data !== "" && images.length === 0) {
//     try {
//       const postId = await createPost(data);
//       alert(postId);
//       if (postId) {
//         successToast("Posted Successfully!");
//         reinitializeData();
//       }
//     } catch (error) {
//       ErrorToast("Some Issues while uploading");
//       console.log(error);
//     }
//   } else {
//     // upload both
//     try {
//       const postId = await createPost(data);
//       const file = [];
//       for (let i = 0; i < images.length; i++) {
//         file[i] = new File(
//           [images[i]],
//           `${postId}+${Date.now()}+${images[i].name}`
//         );
//       }
//       for (let i = 0; i < file.length; i++) {
//         formData.append("myFile[]", file[i]);
//         // formData.append("Filename", file[i].name);
//       }
//       formData.append("postID", postId);
//       if (postId) {
//         uploadMedia(formData);
//         reinitializeData();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };
// const createPost = async (value) => {
//   try {
//     const { data } = await axios.post(`/api/post`, { text: value });
//     return data.postId;
//   } catch (error) {
//     console.log("🚀 ~ file: Post.jsx ~ line 55 ~ createPost ~ error", error);
//   }
// };

// const uploadMedia = async (formData) => {
//   await axios
//     .post("/api/uploadMedia", formData)
//     .then((res) => {
//       if (res.data.status === "failed") {
//         props.ErrorToast("Upload Failed");
//       } else if (res.data.status === "uploaded") {
//         props.successToast("Posted Successfully!");
//       }
//     })
//     .catch((e) => {
//       console.log("🚀 ~ file: Post.jsx ~ line 33 ~ handlePost ~ e", e);
//     });
// };
