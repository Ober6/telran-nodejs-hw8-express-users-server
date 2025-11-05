import express from 'express';
import {apiRouter} from "./routers/apiRouter.js";
import {myLogger} from "./utils/logger.js";

const requestLogger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    myLogger.save(`${req.method} ${req.url}`);
    next();
}

export const launchServer = () => {
    const app = express();

    app.use(express.json());

    app.use(requestLogger);

    app.use('/api', apiRouter);

    app.use((req, res) => {
        myLogger.save(`404 Not Found: ${req.url}`);
        res.status(404).send("Page not found");
    })

    app.listen(3055, () => {
        console.log("Server runs at http://localhost:3055");
        myLogger.toFile("Server started at http://localhost:3055");
    })
}