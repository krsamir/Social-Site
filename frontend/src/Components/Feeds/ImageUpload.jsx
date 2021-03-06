import React from "react";
import ImageIcon from "@material-ui/icons/Image";
import { connect } from "react-redux";
import { UploadImages } from "../../Redux/Actions/FeedAction";
const ImageUpload = (props) => {
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      props.UploadImages([]);
      // setSelectedFile(undefined);
      return;
    }
    const value = [...props.images];

    // I've kept this example simple by using the first image instead of multiple
    props.UploadImages(value.concat(Array.from(e.target.files)));
  };
  return (
    <div>
      <label htmlFor="upload">
        <ImageIcon style={{ cursor: "pointer" }} />
      </label>
      <input
        type="file"
        name="myFile[]"
        encType="multipart/form-data"
        id="upload"
        onChange={onSelectFile}
        multiple
        accept=".jpeg,.jpg,.png"
        hidden
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  images: state.feed.images,
});

export default connect(mapStateToProps, {
  UploadImages,
})(ImageUpload);
