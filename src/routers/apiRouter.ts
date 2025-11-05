import express from "express";
import {userRouter} from "./userRouter.js";
import {loggerRouter} from "./loggerRouter.js";

export const apiRouter = express.Router();

apiRouter.use('/users', userRouter); // localhost:3055/api/users
apiRouter.use("/logger", loggerRouter);// localhost:3055/api/logger