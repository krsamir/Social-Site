// eslint-disable-next-line
import AppController from "../Controller/AppController.js";
import auth from "../Authentication/Auth.js";

const appRoutes = (app) => {
  app.route("/api/post").post(auth, AppController.post);
  app.route("/api/post").get(AppController.getPost);
  app.route("/api/search").get(AppController.search);
};

export default appRoutes;
