import {User} from "../model/user.js";

export interface UserService {
    addUser(user:User): boolean;
    removeUser(userId: number): User | null;
    getAllUsers():User[];
    getUserById(userId:number):User | undefined;
    updateUser(userId:number, newName:string):boolean
}