import LoginController from "../Controller/LoginController.js";

const appRoutes = (app) => {
  app.route("/api/register").post(LoginController.register);
  app.route("/api/resend").post(LoginController.resend);
  app.route("/api/validateToken/:token").get(LoginController.validateToken);
  app.route("/api/reverify").post(LoginController.reverify);
  app.route("/api/login").post(LoginController.login);
};

export default appRoutes;
