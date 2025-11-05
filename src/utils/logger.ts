import {EventEmitter} from "node:events";
import * as fs from "node:fs";

class Logger extends EventEmitter{

    private logArray:Array<{date:string, message:string}> =[];

    addLogToArray(message:string){
        this.logArray.push({date: new Date().toISOString(), message})
    }

    getLogArray(){
        return [...this.logArray]
    }

    log(message:string) {
        this.emit('logged', message)
    }
    save(message:string){
        this.emit('saved', message)
    }
    toFile(message:string){
        this.emit('to_file', message)
    }
    serverStop(message:string){
        this.emit('stop', message)
    }
}

export const myLogger = new Logger();

myLogger.on('logged', (message:string) => {
    console.log(new Date().toISOString(), message)
});

myLogger.on ('saved', (message:string) => {
    myLogger.addLogToArray(message);
    myLogger.log(message);
});

myLogger.on('to_file', (message:string) => {
    let fileName = new Date().toDateString() + ".log";
    fs.writeFile(fileName, JSON.stringify({date: new Date().toISOString(), message})+"\n",
        {encoding:'utf-8', flag:'a'}, (err) => {if(err) console.log(err.message)});
    myLogger.addLogToArray(message);
    myLogger.log(message);
})

myLogger.on('stop', (message:string) => {
    let fileName = new Date().toDateString() + ".log";
    fs.writeFileSync(fileName, JSON.stringify({date: new Date().toISOString(), message})+"\n",
        {encoding:'utf-8', flag:'a'})
    myLogger.log(message);
})