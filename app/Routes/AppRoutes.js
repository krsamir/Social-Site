// eslint-disable-next-line
import AppController from "../Controller/AppController.js";
import auth from "../Authentication/Auth.js";

const appRoutes = (app) => {
  app.route("/test").get(auth, AppController.test);
};

export default appRoutes;
