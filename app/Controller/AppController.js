import AppModel from "../Model/AppModel.js";

const Task = {};

Task.post = (req, res) => {
  AppModel.post(req, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
};

Task.getPost = (req, res) => {
  AppModel.getPost(req, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
};

export default Task;
