import LoginModel from "../Model/LoginModel.js";

const Task = {};

Task.register = (req, res) => {
  LoginModel.register(req.body, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
};

export default Task;
