import {UserService} from "./UserService.js";
import {User} from "../model/user.js";
import {UserPersistanceFileService} from "./UserPersistanceFileService.js";
import fs from "fs";
import {myLogger} from "../utils/logger.js";

export class UserServiceEmbedded implements UserService, UserPersistanceFileService{
    private users: User[] = [{id:7, userName:"Bond"}];
  //  private readStream = fs.createReadStream('data.txt', {highWaterMark:32});

    addUser(user: User): boolean {
        if(this.users.find(u => u.id === user.id))
        return false;
        this.users.push(user);
        return  true;
    }

    getAllUsers(): User[] {
        return [...this.users];
    }

    getUserById(userId: number) {
        const user = this.users.find(u => u.id === userId)
            return user;
    }

    removeUser(userId: number) {
        const index = this.users.findIndex(u => u.id === userId);
        return index === -1 ? null : this.users.splice(index, 1)[0];
    }

    updateUser(userId: number, newName: string): boolean {
        const index = this.users.findIndex(u => u.id === userId);

        if(index !== -1) {
            this.users[index].userName = newName;
            return true;
        }
        return false;
    }

    restoreDataFromFile(): Promise<void> {

            return new Promise((resolve, reject) => {
                const readStream = fs.createReadStream('data.txt', {highWaterMark: 32});
                let result = "";
                readStream.on('data', chunk => {
                    if (chunk) {
                        result += chunk.toString();
                    } else result = "[]";
                })
                readStream.on('end', () => {
                    try {
                        if (result) {
                            this.users = JSON.parse(result);
                            myLogger.toFile("Data was restored from file")
                            readStream.close(() => {
                                console.log("readStreamClose")
                            });
                            resolve();
                        }
                    } catch (e) {
                        this.users = [{id: 17, userName: "Bender"}];
                        myLogger.toFile("Error parsing data. Default users array")
                        resolve();
                    }

                })
                readStream.on('error', (err) => {
                    this.users = [{id: 20, userName: "Panikovsky"}];
                    myLogger.toFile("File not found. Default users array")
                    resolve();
                })
            })
    }

    saveDataToFile(): Promise<void> {
        return new Promise((resolve, reject) => {
            const writeStream = fs.createWriteStream('data.txt',
                {encoding:"utf-8", flags:"w"})
            myLogger.log("writeStream created")
            const data = JSON.stringify(this.users)
            writeStream.write(data);
            writeStream.end();

            writeStream.on("finish", () => {
                writeStream.close();
                myLogger.toFile("Data was successfully saved to file")
                resolve();
            })
            writeStream.on('error', (err) => {
                myLogger.toFile("Error! Data not saved!!!")
                reject(err)
            })
        })

    }

}

export const userServiceEmbedded = new UserServiceEmbedded();