import {userServiceEmbedded} from "../service/UserServiceEmbedded.js";
import {UserService} from "../service/UserService.js";
import {Request, Response} from "express";
import {User} from "../model/user.js";
import {myLogger} from "../utils/logger.js";

export class UserController {
    constructor(private userService: UserService) {
    }

    async addUser(req: Request, res: Response) {
        try {
            const body = req.body;
            myLogger.save(`Adding user: ${JSON.stringify(body)}`);
            const result = this.userService.addUser(body as User);
            if(result){
                res.status(201).send("User was successfully added");
                myLogger.toFile(`User added successfully: ${JSON.stringify(body)}`);
            } else {
                res.status(409).send("User already exists");
                myLogger.save(`User already exists: ${body.id}`);
            }
        } catch (e) {
            const err = e as Error;
            myLogger.toFile(`Error adding user: ${err.message}`);
            res.status(400).send(err.message);
        }
    }

    getAllUsers(req: Request, res: Response) {
        myLogger.save("Getting all users");
        const result = this.userService.getAllUsers();
        res.status(200).json(result);
        myLogger.toFile(`Returned ${result.length} users`);
    }

    removeUser(req: Request, res: Response) {
        const id = req.query.userId as string;
        if(id){
            myLogger.save(`Removing user with id: ${id}`);
            const removed = this.userService.removeUser(+id);
            if(removed) {
                res.status(200).json(removed);
                myLogger.toFile(`User removed: ${JSON.stringify(removed)}`);
            } else {
                res.status(404).send(`User with id ${id} not found`);
                myLogger.save(`User not found for removal: ${id}`);
            }
        } else {
            res.status(400).send("No request params found");
            myLogger.save("Remove user failed: no userId parameter");
        }
    }

    getUserById(req: Request, res: Response) {
        const id = req.query.userId as string;
        if(id){
            myLogger.save(`Getting user by id: ${id}`);
            const result = this.userService.getUserById(+id);
            if(result) {
                res.status(200).json(result);
                myLogger.toFile(`User found: ${JSON.stringify(result)}`);
            } else {
                res.status(404).send(`User with id ${id} not found`);
                myLogger.save(`User not found: ${id}`);
            }
        } else {
            res.status(400).send("No request params found");
            myLogger.save("Get user failed: no userId parameter");
        }
    }

    updateUser(req: Request, res: Response) {
        const id = req.query.userId as string;
        const newName = req.query.newName as string;
        if(!id || !newName) {
            res.status(400).send("No request params found");
            myLogger.save("Update user failed: missing parameters");
        } else {
            myLogger.save(`Updating user ${id} with new name: ${newName}`);
            const result = this.userService.updateUser(+id, newName);
            if(result) {
                res.status(200).send("User successfully updated");
                myLogger.toFile(`User updated: id=${id}, newName=${newName}`);
            } else {
                res.status(404).send(`User with id ${id} not found`);
                myLogger.save(`User not found for update: ${id}`);
            }
        }
    }
}

export const userControllerEmbedded = new UserController(userServiceEmbedded)