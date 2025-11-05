import express from "express";
import {userControllerEmbedded as controller} from "../controllers/UserController.js";

export const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    controller.getAllUsers(req, res);
})

userRouter.post('/', async (req, res) => {
    await controller.addUser(req, res);
})

userRouter.get('/one', (req, res) => {
    controller.getUserById(req, res);
})

userRouter.delete('/', (req, res) => {
    controller.removeUser(req, res);
})

userRouter.put('/', (req, res) => {
    controller.updateUser(req, res);
})