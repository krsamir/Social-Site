import LoginController from "../Controller/LoginController.js";

const appRoutes = (app) => {
  app.route("/api/register").post(LoginController.register);
};

export default appRoutes;
