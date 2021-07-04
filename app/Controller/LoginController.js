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

Task.resend = (req, res) => {
  LoginModel.resend(req.body, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
};

Task.validateToken = (req, res) => {
  LoginModel.validateToken(req.params, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
};

Task.reverify = (req, res) => {
  LoginModel.reverify(req.body, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
};

Task.login = (req, res) => {
  LoginModel.login(req.body, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
};

export default Task;
