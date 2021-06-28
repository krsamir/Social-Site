// eslint-disable-next-line
import AppController from "../Controller/AppController.js";

const appRoutes = (app) => {
  app.route("/test").get(AppController.test);
};

export default appRoutes;
