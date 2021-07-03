import LoginController from "../Controller/LoginController.js";

const appRoutes = (app) => {
  app.route("/api/register").post(LoginController.register);
  app.route("/api/resend").post(LoginController.resend);
};

export default appRoutes;
