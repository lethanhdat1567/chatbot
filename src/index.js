import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index.js";

const app = express();
app.use(bodyParser.json());
routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
