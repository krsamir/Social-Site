// eslint-disable-next-line
import SQL from "../Database/Database.js";

const Task = {};
Task.test = (data, result) => {
  SQL.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
    if (error) {
      result(error, null);
    } else {
      result(null, `Database connection has been established.`);
    }
  });
};

export default Task;
