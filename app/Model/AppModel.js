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
  let getAllPost = `SELECT 
  t1.post_id,t1.text,t1.status,t1.posted_by,
  JSON_ARRAYAGG(t2.filename) AS filename,
  JSON_ARRAYAGG(t2.mimetype) AS mimetype
FROM
  social__post AS t1
      LEFT JOIN
  social__mediaupload AS t2 ON t1.post_id = t2.postid
GROUP BY post_id order by t1.post_id desc
`;
  SQL.query(getAllPost, async (err, response) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      const tableResponse = JSON.parse(JSON.stringify(response));
      const finalData = tableResponse.map((val) => {
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

export default Task;
