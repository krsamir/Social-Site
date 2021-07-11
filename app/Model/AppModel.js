// eslint-disable-next-line
import SQL from "../Database/Database.js";
// @ts-check
const Task = {};
Task.post = (req, result) => {
  const { id, firstName, lastName } = req;
  const { text } = req.body;

  let insertPostData = `INSERT INTO social__post (user_id, text, posted_by) VALUES ('${id}', '${text}','${
    firstName + " " + lastName
  }')`;
  SQL.query(insertPostData, async (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      const response = JSON.parse(JSON.stringify(res));
      result(null, { status: "posted", postId: response.insertId });
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
          try {
            const fileNames = JSON.parse(value.filename);
            const mimetype = JSON.parse(value.mimetype);
            // console.log(mimetype);
            // console.log(fileNames, mimetype);
            const zip = (a, b) =>
              a.map((k, i) => {
                console.log(k);
                return { filename: k, mimetype: b[i] };
              });
            const mediaArray = zip(fileNames, mimetype);
            delete value.filename;
            delete value.mimetype;
            return { ...value, media: mediaArray };
          } catch (error) {
            console.log(err);
            result(err, null);
          }
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

export default Task;
