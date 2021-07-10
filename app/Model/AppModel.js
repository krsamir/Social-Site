// eslint-disable-next-line
import SQL from "../Database/Database.js";

const Task = {};
Task.post = (req, result) => {
  const { id } = req;
  const { text } = req.body;

  let insertPostData = `INSERT INTO social__post (user_id, text) VALUES ('${id}', '${text}')`;
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

export default Task;
