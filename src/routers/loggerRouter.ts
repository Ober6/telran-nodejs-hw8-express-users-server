import express from "express";
import {loggerController} from "../controllers/loggerController.js";

export const loggerRouter = express.Router();

loggerRouter.get('/', (req, res) => {
    loggerController.getAllLogs(req, res);
})