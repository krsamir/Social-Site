// eslint-disable-next-line
import AppController from "../Controller/AppController.js";
import auth from "../Authentication/Auth.js";

const appRoutes = (app) => {
  app.route("/api/post").post(auth, AppController.post);
  app.route("/api/post").get(auth, AppController.getPost);
  app.route("/api/search").get(auth, AppController.search);
  app.route("/api/like/:post_id").get(auth, AppController.likepost);
  app.route("/api/single").post(auth, AppController.particularPost);
  app.route("/api/deleteFeed/:userID").delete(auth, AppController.deleteFeed);
};

export default appRoutes;
