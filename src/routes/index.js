import facebookRouter from "./facebook.route.js";

function routes(app) {
    app.use("/webhook", facebookRouter);
}
export default routes;
