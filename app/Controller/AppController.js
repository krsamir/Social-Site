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

Task.search = (req, res) => {
  AppModel.search(req, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
};

Task.likepost = (req, res) => {
  AppModel.likepost(req, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
};

Task.particularPost = (req, res) => {
  let queryFor = "";
  if (req.body.userId === null) {
    queryFor = req.id;
  } else {
    queryFor = req.body.userId;
  }
  AppModel.particularPost(queryFor, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
};

Task.deleteFeed = (req, res) => {
  AppModel.deleteFeed(req, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
};

Task.reportFeed = (req, res) => {
  AppModel.reportFeed(req, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
};
export default Task;