import React, { useEffect } from "react";
import Feed from "./Feed.jsx";
import { connect } from "react-redux";
import { getAllPost } from "../../Redux/Actions/FeedAction";
const Feeds = (props) => {
  const { getAllPost, data } = props;
  useEffect(() => {
    getAllPost();
  }, [getAllPost]);
  return (
    <div>
      {data.map((value) => {
        return (
          <div key={value.post_id}>
            <Feed {...props} data={value} />
          </div>
        );
      })}
      <Feed />
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.feed.allPost,
});
export default connect(mapStateToProps, { getAllPost })(Feeds);
