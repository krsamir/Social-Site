// eslint-disable-next-line
import LoginModel from "../Model/LoginModel.js";

const Task = {};

Task.test = (req, res) => {
  LoginModel.test(req.body, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
};

export default Task;
