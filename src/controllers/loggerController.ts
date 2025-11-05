import {myLogger} from "../utils/logger.js";
import {Request, Response} from "express";

class LoggerController{
    getAllLogs(req: Request, res: Response){
        myLogger.log("Getting all logs");
        const allLogs = myLogger.getLogArray();
        res.status(200).json(allLogs);
        myLogger.log(`Returned ${allLogs.length} log entries`);
    }
}

export const loggerController = new LoggerController();