// eslint-disable-next-line
import AppModel from "../Model/AppModel.js";

const Task = {};

Task.test = (req, res) => {
  AppModel.test(req.body, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
};

export default Task;
