// eslint-disable-next-line
import SQL from "../Database/Database.js";
// @ts-check
const Task = {};
Task.post = (req, result) => {
  const { id, firstName, lastName } = req;
  const { text } = req.body;
  const postedBy = firstName + " " + lastName;

  let insertPostData = `INSERT INTO social__post (user_id, text, posted_by) VALUES ('${id}', '${text}','${postedBy}')`;
  SQL.query(insertPostData, async (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      const response = JSON.parse(JSON.stringify(res));
      result(null, { status: "posted", postId: response.insertId, postedBy });
    }
  });
};

Task.getPost = (req, result) => {
  // let getAllPost = `select * from social__post order by post_id desc`;
  let getAllPost = `call getAllPost(${req.id})`;
  SQL.query(getAllPost, async (err, response) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      const tableResponse = JSON.parse(JSON.stringify(response));
      const finalResponse = tableResponse[0];
      const finalData = finalResponse.map((val) => {
        const value = { ...val };
        if (JSON.parse(value.filename)[0] !== null) {
          const fileNames = JSON.parse(value.filename);
          const mimetype = JSON.parse(value.mimetype);
          const zip = (a, b) =>
            a.map((k, i) => {
              return { filename: k, mimetype: b[i] };
            });
          const mediaArray = zip(fileNames, mimetype);
          delete value.filename;
          delete value.mimetype;
          return { ...value, media: mediaArray, parent: value.user_id };
        } else {
          delete value.filename;
          delete value.mimetype;
          return { ...value, media: null, parent: value.user_id === req.id };
        }
      });
      result(null, { response: finalData });
    }
  });
};

Task.search = (req, result) => {
  const params = req.query.query;
  let getAllPost = `SELECT * FROM register where email like ("%${params}%") or firstname like ("%${params}%") or lastname like ("%${params}%")`;
  SQL.query(getAllPost, async (err, response) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, response);
    }
  });
};

Task.likepost = (data, result) => {
  const { params, id } = data;
  const post_id = params.post_id;
  const likeQuery = `call social__like ('${post_id}', '${id}',@value);`;
  SQL.query(likeQuery, (err, res) => {
    if (err) {
      console.log(err);
      result(null, err);
    } else {
      result({ status: res });
    }
  });
};

Task.particularPost = (data, result) => {
  const getPostQUery = `call postByUser('${data}');`;
  SQL.query(getPostQUery, (err, response) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      const tableResponse = JSON.parse(JSON.stringify(response));
      const finalResponse = tableResponse[0];
      const finalData = finalResponse.map((val) => {
        const value = { ...val };
        if (JSON.parse(value.filename)[0] !== null) {
          const fileNames = JSON.parse(value.filename);
          const mimetype = JSON.parse(value.mimetype);
          const zip = (a, b) =>
            a.map((k, i) => {
              return { filename: k, mimetype: b[i] };
            });
          const mediaArray = zip(fileNames, mimetype);
          delete value.filename;
          delete value.mimetype;
          return { ...value, media: mediaArray };
        } else {
          delete value.filename;
          delete value.mimetype;
          return { ...value, media: null };
        }
      });
      result(null, { response: finalData });
    }
  });
};

Task.deleteFeed = (req, result) => {
  const { userID } = req.params;
  const deleteQuery = `DELETE FROM social__post WHERE post_id = ${userID}`;
  SQL.query(deleteQuery, (err, res) => {
    if (err) {
      console.log(err);
      result(null, err);
    } else {
      result({ status: "deleted" });
    }
  });
};

export default Task;
