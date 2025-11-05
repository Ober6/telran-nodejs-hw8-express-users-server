import {IncomingMessage, ServerResponse} from "node:http";
import {myLogger} from "./logger.js";

export async function parsBody(req: InstanceType<typeof IncomingMessage>) {

    return new Promise((resolve, reject) => {
        let body = "";
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body))
            } catch (e) {
                reject(new Error('Invalid json'))
            }
        })
    })
}

export  const responseText = (res:ServerResponse, code:number, message:string) => {
    res.writeHead(code, {'Content-Type':'text/plain'});
    res.end(message);
    myLogger.log('Response sent with code: '+code + " and message: " + message)
}

export  const responseJson = (res:ServerResponse, code:number, object:Object) => {
    res.writeHead(code, {'Content-Type':'application/json'});
    res.end(JSON.stringify(object));
    myLogger.toFile('Response sent with code: '+code + " and body: " + JSON.stringify(object))
}